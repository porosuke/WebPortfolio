import { initGallery } from "./modalGallery.js";
import { initDescription } from "./modalDescription.js";

let currentModal = null;
let currentKeyHandler = null;

export function openModal(data, isProduction) {
    if (currentModal) return;

    const template = document.getElementById("modal-template");
    const clone = template.content.cloneNode(true);

    const overlay = clone.querySelector(".modal-overlay");
    const content = clone.querySelector(".modal-content");
    const closeBtn = clone.querySelector(".close-button");
    const title = clone.querySelector(".modal-title");

    // タイトル
    title.textContent = data.title;

    const directory = isProduction ? "projects" : "events";
    // ギャラリー初期化
    const gallery = initGallery(clone, directory, data.slug, data.images);

    // 説明初期化
    initDescription(clone, data);

    currentModal = overlay;
    // DOM追加
    document.getElementById("modal-root").appendChild(clone);

    // 少し遅延させて追加
    requestAnimationFrame(() => content.classList.add("active"));

    overlay.classList.add("active");
    document.body.classList.add("modal-open");

    let closing = false;
    function close() {
        if (!currentModal || closing) return;
        closing = true;

        // 1. 閉じる用に transition-time を半分に変更
        const halfTime = getMoveAnimTimeMs(content) / 2;
        content.style.transitionDuration = `${halfTime}ms`;

        // 2. active クラスを外す → CSS の transform/opacity が transition で変化
        content.classList.remove('active');

        // 3. transition 終了後に DOM 削除
        content.addEventListener('transitionend', () => {
            currentModal.remove();
            currentModal = null;
            document.body.classList.remove("modal-open");
            document.removeEventListener("keydown", currentKeyHandler);
            currentKeyHandler = null;
            content.style.removeProperty('transition-duration');
            closing = false;
        }, { once: true });
    }

    overlay.addEventListener("click", close);
    content.addEventListener("click", e => e.stopPropagation());

    closeBtn.addEventListener("click", e => {
        e.stopPropagation();
        close();
    });

    // キーボード管理は modal が一元管理
    currentKeyHandler = function (e) {

        if (e.key === "Escape") {
            close();
        }

        if (gallery) {
            if (e.key === "ArrowLeft") gallery.move(-1);
            if (e.key === "ArrowRight") gallery.move(1);
        }
    };

    document.addEventListener("keydown", currentKeyHandler);
}

function getMoveAnimTimeMs(el) {
    const style = getComputedStyle(el);
    const timeStr = style.getPropertyValue('--move-anim-time').trim(); // 例: "0.3s" or "300ms"

    if (timeStr.endsWith('ms')) {
        return parseFloat(timeStr);
    } else if (timeStr.endsWith('s')) {
        return parseFloat(timeStr) * 1000;
    }

    // デフォルト fallback
    return 300; // ms
}