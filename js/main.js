// 初回読み込み時
document.addEventListener("DOMContentLoaded", () => {
    const label = document.querySelector(".theme-toggle .label");
    const theme = document.documentElement.dataset.theme;

    if (label) {
        label.textContent =
            theme === "dark" ? "Light Mode" : "Dark Mode";
    }
});

// ブラウザ or キャッシュからカラーモードを読み取る
(function () {
    const saved = localStorage.getItem("theme");

    let theme;

    if (saved) {
        theme = saved;
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        theme = prefersDark ? "dark" : "light";
    }

    document.documentElement.dataset.theme = theme;
})();

// ボタン押下
document.addEventListener("click", (e) => {

    // テーマ切替
    const themeBtn = e.target.closest(".theme-toggle");
    if (themeBtn) {
        const html = document.documentElement;
        const current = html.dataset.theme;
        const next = current === "dark" ? "light" : "dark";

        html.dataset.theme = next;
        localStorage.setItem("theme", next);

        const label = themeBtn.querySelector(".label");
        if (label) {
            label.textContent = next === "dark" ? "Light Mode" : "Dark Mode";
        }
        return;
    }
});