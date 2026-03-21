export function initDescription(root, data) {

    const descText = root.querySelector(".desc-text");
    const linksContainer = root.querySelector(".links-container");
    const periodText = root.querySelector(".period-text");
    const tagsContainer = root.querySelector(".tags-container");

    const descSection = root.querySelector(".desc-main");
    const linksSection = root.querySelector(".desc-links");
    const periodSection = root.querySelector(".desc-period");
    const tagsSection = root.querySelector(".desc-tags");

    // ひとこと
    if (data.description) {
        descText.textContent = data.description;
    } else {
        descSection.classList.add("hidden");
    }

    // リンク
    if (data.link && data.link.length > 0) {
        linksContainer.innerHTML = "";
        data.link.forEach(url => {
            const a = document.createElement("a");
            a.href = url;
            a.className = "external-link";
            a.textContent = url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            linksContainer.appendChild(a);
        });
    } else {
        linksSection.classList.add("hidden");
    }

    // 期間
    periodText.textContent = `【 終了年月：${convertDate(data.compYear, data.compMonth)} 】　${data.period}`;

    // タグ
    if (data.tag && data.tag.length > 0) {
        tagsContainer.innerHTML = "";
        data.tag.forEach(tag => {
            const tagEl = document.createElement("span");
            tagEl.classList.add("tag");
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });
    } else {
        tagsSection.classList.add("hidden");
    }
}

function convertDate(compYear, compMonth){
    return `${compYear}年 ${compMonth}月`;
}