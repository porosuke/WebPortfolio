import { skillData } from "./skillData.js";

// スキルバッジをデータから生成する
const root = document.getElementById("skill-containers");
skillData.forEach((category, categoryIndex) => {

    const container = document.createElement("div");
    container.className = "badge-container";

    const reverse = categoryIndex % 2 === 1;

    category.skills.forEach(skill => {

        const badge = document.createElement("div");
        badge.className = "skill-badge";

        if (reverse) {
            // 下から　名前、Lv、画像
            badge.innerHTML = `
                <div class="skill-honeycomb-wrapper">
                    <div class="skill-honeycomb">
                        <div class="skill-image">
                            <div class="icon ${skill.icon}"></div>
                        </div>
                    </div>
                </div>
                <div class="skill-level Lv${skill.level}">Lv.${skill.level}</div>
                <div class="skill-name">${skill.name}</div>
                `;
        } else {
            // 上から　名前、Lv、画像
            badge.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level Lv${skill.level}">Lv.${skill.level}</div>
                <div class="skill-honeycomb-wrapper">
                    <div class="skill-honeycomb">
                        <div class="skill-image">
                            <div class="icon ${skill.icon}"></div>
                        </div>
                    </div>
                </div>
            `;
        }

        container.appendChild(badge);
    });

    // 末尾テキスト
    const label = document.createElement("div");
    label.className = "skill-text";
    label.textContent = category.name;
    container.appendChild(label);

    root.appendChild(container);

    // 区切り処理（最後以外）
    if (categoryIndex !== skillData.length - 1) {

        if (categoryIndex % 2 === 0) {
            // 偶数カテゴリの後はボーダー
            const hr = document.createElement("hr");
            hr.className = "skill-border";
            root.appendChild(hr);
        } else {
            // 奇数カテゴリの後は改行
            const br = document.createElement("br");
            root.appendChild(br);
        }

    }

});

function updateShiftLayout() {
    const containers = document.querySelectorAll(".badge-container");

    containers.forEach((container, index) => {
        const badges = Array.from(container.querySelectorAll(".skill-badge"));
        if (!badges.length) return;

        // 前回のクラスをすべて削除
        badges.forEach(b => b.classList.remove("shift-all", "shift-after-line"));

        const firstTop = badges[0].offsetTop;
        const wrapped = badges.some(badge => badge.offsetTop !== firstTop);

        const prevContainer = index > 0 ? containers[index-1] : null;
        const prevBadges = prevContainer ? Array.from(prevContainer.querySelectorAll(".skill-badge")) : [];
        const prevFirstTop = prevBadges[0]?.offsetTop ?? 0;
        const prevWrapped = prevBadges.some(b => b.offsetTop !== prevFirstTop);

        if (index % 2 === 0) {
            // 偶数コンテナ
            if (wrapped) {
                badges.forEach(b => {
                    if (b.offsetTop !== firstTop) b.classList.add("shift-after-line");
                });
            }
        } else {
            // 奇数コンテナ
            if (!prevWrapped && !wrapped) {
                // 前も1行、自身も1行 → 全バッジずらす
                badges.forEach(b => b.classList.add("shift-all"));
            } else if (!prevWrapped && wrapped) {
                // 前1行、自身折り返し → 1行目だけずらす
                badges.forEach(b => {
                    if (b.offsetTop === firstTop) b.classList.add("shift-all");
                });
            } else if (prevWrapped && wrapped) {
                // 前折り返し、自身折り返し → 2行目以降だけずらす
                badges.forEach(b => {
                    if (b.offsetTop !== firstTop) b.classList.add("shift-after-line");
                });
            }
            // prevWrapped && !wrapped → 1行目なので何もしない
        }
    });
}

window.addEventListener("load", updateShiftLayout);
window.addEventListener("resize", updateShiftLayout);
