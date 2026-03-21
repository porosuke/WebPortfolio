import { TAGS } from "./tags.js";
import { setupSection } from "./journeySection.js";

const segmentedData = {
    production: [TAGS.ALL, TAGS.CSHARP, TAGS.OTHER, TAGS.NONE],
    event: [TAGS.ALL, TAGS.CERT, TAGS.CONT, TAGS.NONE]
};

// 表示タグ選択ボタンを生成
Object.entries(segmentedData).forEach(([tabName, labels]) => {
    const container = document.querySelector(`.journey-tab.${tabName} .journey-segmented-buttons`);
    if (!container) return;

    labels.forEach((labelText, index) => {
        const radioId = `${tabName}${index + 1}`;

        // ラジオ作成
        const input = document.createElement("input");
        input.type = "radio";
        input.name = tabName;
        input.id = radioId;
        if (index === 0) input.checked = true;

        // ラベル作成
        const label = document.createElement("label");
        label.htmlFor = radioId;

        // inner要素
        const inner = document.createElement("span");
        inner.className = "label-inner";
        inner.textContent = labelText;
        label.appendChild(inner);

        // コンテナに追加
        container.appendChild(input);
        container.appendChild(label);
    });
});

let currentProductionTag = TAGS.ALL;
let currentEventTag = TAGS.ALL;
const DISPLAY = {
    BOTH: 0,
    PRODUCTION_ONLY: 1,
    EVENT_ONLY: 2
};
let displayMode = DISPLAY.BOTH;
const mediaQuery = window.matchMedia("(max-width: 768px)");

// 選択タグがクリックされたとき更新する
Object.keys(segmentedData).forEach(tabName => {
    const container = document.querySelector(`.journey-tab.${tabName} .journey-segmented-buttons`);
    if (!container) return;

    // タグに対してのクリックはここで伝播阻止
    container.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    // タグに変化があったとき
    container.addEventListener('change', (e) => {
        const target = e.target;
        if (target.tagName !== "INPUT") return;

        const label = container.querySelector(`label[for="${target.id}"]`);
        const selectedTag = label.textContent;

        if (tabName === "production") currentProductionTag = selectedTag;
        else if (tabName === "event") currentEventTag = selectedTag;
        printTags("Tag");
    });
});

// タブがクリックされたとき、画面が狭いならタブの最小化を行う
const tabs = document.querySelectorAll('.journey-tab');
const sections = document.querySelectorAll('.journey-section');
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        if (!mediaQuery.matches) return;

        const bShowProduction = tab.classList.contains("production");
        const newMode = bShowProduction
            ? DISPLAY.PRODUCTION_ONLY
            : DISPLAY.EVENT_ONLY;
        // 同Tabクリックなら弾く
        if (displayMode === newMode) return;
        displayMode = newMode;

        // active切替
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // sectionも同期
        sections.forEach(s => s.classList.remove('active'));
        sections[index].classList.add('active');

        printTags("Tab");
    });
});

// 画面幅変更時に、タブの実高さを取得する関数
function getTabHeight(){
    if (tabs.length > 0) {
        const firstTabHeight = tabs[0].offsetHeight;
        document.documentElement.style.setProperty('--tab-height', `${firstTabHeight}px`);
    }
}

// 画面の幅が変わったときに非表示情報を更新する関数
function handleBreakpointChange(e) {
    getTabHeight();
    if (e.matches) {
        // Mobile
        const activeTab = document.querySelector('.journey-tab.active');
        if (!activeTab) return;
        // Productionが表示されているか？
        const bShowProduction = activeTab.classList.contains("production");
        displayMode = bShowProduction ? DISPLAY.PRODUCTION_ONLY : DISPLAY.EVENT_ONLY;
        printTags("Mobile");
    }else {
        // PC
        displayMode = DISPLAY.BOTH;
        printTags("PC");
    }
}

// setupを呼ぶ
function printTags(called){
    const effectiveProductionTag = 
        displayMode == DISPLAY.EVENT_ONLY
            ? TAGS.NONE
            : currentProductionTag;
    const effectiveEventTag = 
        displayMode == DISPLAY.PRODUCTION_ONLY
            ? TAGS.NONE
            : currentEventTag;

    //console.log(`(from>${called})[Data] P:${currentProductionTag}/E:${currentEventTag} [Mode] ${displayMode}]`);
    setupSection(effectiveProductionTag, effectiveEventTag);
}

mediaQuery.addEventListener("change", handleBreakpointChange);
// 初期化
handleBreakpointChange(mediaQuery);