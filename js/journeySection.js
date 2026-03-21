import { projectData } from "./projectData.js";
import { eventData } from "./eventData.js";
import { TAGS } from "./tags.js";

let lastProjectTag = null;
let lastProjectResult = null;
let lastEventTag = null;
let lastEventResult = null;

function filterByTag(dataObject, targetTag) {
    // NONE → 全除外
    if (targetTag === TAGS.NONE) {
        return [];
    }
    const values = Object.values(dataObject);
    // ALL → 全件
    if (targetTag === TAGS.ALL) {
        return values;
    }
    // 通常 → 指定タグを含むものだけ
    return values.filter(item => item.tag.includes(targetTag));
}

function sortByDateAsc(list) {
    return list.slice().sort((a, b) => {
        const dateA = a.compYear * 100 + a.compMonth;
        const dateB = b.compYear * 100 + b.compMonth;
        return dateA - dateB;
    });
}

function extractNodes(list) {
    const nodes = [];

    let lastYear = null;
    let lastMonth = null;
    let monthCount = 0;

    for (let i = 0; i < list.length; i++) {
        const { compYear: year, compMonth: month } = list[i];

        const yearChanged = year !== lastYear;
        const monthChanged = year !== lastYear || month !== lastMonth;

        // 年ヘッダ
        if (yearChanged) {
            nodes.push([year, 0, 1]);
        }

        // 月カウント
        if (monthChanged) {
            monthCount = 1;
        } else {
            monthCount++;
        }

        // 月の最後の要素で確定
        const next = list[i + 1];
        const isLastOfMonth =
            !next ||
            next.compYear !== year ||
            next.compMonth !== month;

        if (isLastOfMonth) {
            nodes.push([year, month, monthCount]);
        }

        lastYear = year;
        lastMonth = month;
    }

    return nodes;
}

function joinNodes(projectNodes, eventNodes) {
    const joined = [];

    let i = 0;
    let j = 0;

    while (i < projectNodes.length && j < eventNodes.length) {

        const [py, pm, pc] = projectNodes[i];
        const [ey, em, ec] = eventNodes[j];

        // 年月を数値化して比較
        const pKey = py * 100 + pm;
        const eKey = ey * 100 + em;

        if (pKey < eKey) {
            joined.push(projectNodes[i]);
            i++;
        }
        else if (pKey > eKey) {
            joined.push(eventNodes[j]);
            j++;
        }
        else {
            // 同じ年月 → countが多い方を採用
            if (pc >= ec) {
                joined.push(projectNodes[i]);
            } else {
                joined.push(eventNodes[j]);
            }
            i++;
            j++;
        }
    }

    // 残りを追加
    while (i < projectNodes.length) {
        joined.push(projectNodes[i++]);
    }

    while (j < eventNodes.length) {
        joined.push(eventNodes[j++]);
    }

    return joined;
}

function mapData(nodes, projectData, eventData) {
    const dispP = [];
    const dispE = [];
    const dispNode = [];

    let pIndex = 0;
    let eIndex = 0;

    for (const node of nodes) {
        const [ compYear, compMonth, count ] = node;

        for (let i = 0; i < count; i++) {

            // ノード展開
            dispNode.push({ compYear, compMonth });

            // 年ノードは必ず空
            if (compMonth === 0) {
                dispP.push(null);
                dispE.push(null);
                continue;
            }

            // project
            const p = projectData[pIndex];
            if (p && p.compYear === compYear && p.compMonth === compMonth) {
                dispP.push(p);
                pIndex++;
            } else {
                dispP.push(null);
            }

            // event
            const e = eventData[eIndex];
            if (e && e.compYear === compYear && e.compMonth === compMonth) {
                dispE.push(e);
                eIndex++;
            } else {
                dispE.push(null);
            }
        }
    }

    return { dispNode, dispP, dispE };
}

function createLeavesForRow(pData, eData) {
    const createLeaf = (data) => {
        const div = document.createElement("div");
        if (data === null) {
            div.classList.add("journey-leaf", "dummy");
        } else {
            div.classList.add("journey-leaf");
            div.classList.add("content-button");
            div.classList.add("large");
            div.dataset.id = data.slug;

            const titleDiv = document.createElement("div");
            titleDiv.classList.add("journey-leaf-title");
            titleDiv.textContent = data.title;

            const tagContainer = document.createElement("div");
            tagContainer.classList.add("tags-container", "journey");

            data.tag.forEach(tag => {
                const span = document.createElement("span");
                span.classList.add("tag");
                span.textContent = tag;
                tagContainer.appendChild(span);
            });

            div.appendChild(titleDiv);
            div.appendChild(tagContainer);
        }
        return div;
    };

    return {
        pLeaf: createLeaf(pData),
        eLeaf: createLeaf(eData)
    };
}

function makeComponent(result) {
    const prodContainer = document.getElementById("journey-production");
    const dividerContainer = document.getElementById("divider-section");
    const eventContainer = document.getElementById("journey-event");

    const { dispNode, dispP, dispE } = result;
    // すでにある子要素をクリア
    prodContainer.innerHTML = "";
    dividerContainer.innerHTML = "";
    eventContainer.innerHTML = "";

    for (let i = 0; i < dispNode.length; i++) {
        const node = dispNode[i];
        const { pLeaf, eLeaf } = createLeavesForRow(dispP[i], dispE[i]);

        prodContainer.appendChild(pLeaf);
        eventContainer.appendChild(eLeaf);

        // ノードは別生成
        const { compYear: year, compMonth: month } = node;
        const nodeDiv = document.createElement("div");
        nodeDiv.classList.add("date-node");
        if (month === 0) nodeDiv.classList.add("large");

        const textDiv = document.createElement("div");
        textDiv.classList.add("date-node-text");
        textDiv.textContent = month === 0 ? year : month;
        nodeDiv.appendChild(textDiv);
        dividerContainer.appendChild(nodeDiv);
    }
}

export function setupSection(projectTag, eventTag) {
    let projects;
    let events;
    // 1. タグでデータをフィルタリングする（変化がないなら飛ばす）
    // ソートも同時に行う
    if (projectTag === lastProjectTag) projects = lastProjectResult;
    else {
        projects = sortByDateAsc(filterByTag(projectData, projectTag));
        lastProjectTag = projectTag;
        lastProjectResult = projects;
    }
    if (eventTag === lastEventTag) events = lastEventResult;
    else {
        events = sortByDateAsc(filterByTag(eventData, eventTag));
        lastEventTag = eventTag;
        lastEventResult = events;
    }
    // 検証用表示1
    // console.log(`Projects (${projectTag}):`, projects.length);
    // console.log(`Events (${eventTag}):`, events.length);

    // 2. セクションごとに年月を抽出する（抽出物をノードと呼ぶ）
    // ノードのデータ構造は[年, 月, 要素数]
    // 要素数とは、年月が一致するデータの数
    // 年ノードは[Y, 0, 1]で表す　月ノードは[Y, M, N]
    const projectNodes = extractNodes(projects);
    const eventNodes   = extractNodes(events);
    // 検証用表示2
    // console.log("Project Nodes:", projectNodes);
    // console.log("Event Nodes:", eventNodes);

    // 3. 2つのノード群を結合する
    // 年月を比較し、昇順で追加していく
    // このとき、同年月がある場合、要素数が大きい方1つを採用
    const joinedNodes = joinNodes(projectNodes, eventNodes);
    // 検証用表示3
    // console.log("Joined Nodes:", joinedNodes);

    // 4. ノードにデータを割り当てていく
    // 年ノードには何も対応させず、nullを入れる
    // 対応する年月のデータがある場合は、データを追加しポインタを進める
    const result = mapData(joinedNodes, projects, events);
    // 検証用表示4
    // console.log(result);

    // 5. データに基づいて表示要素を生成する
    makeComponent(result);
}