// ボタン押下
document.addEventListener("click", (e) => {
    // コピー処理
    const copyBtn = e.target.closest(".copy-button");
    if (copyBtn) {
        const text = copyBtn.dataset.copy;
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = "✓";
            setTimeout(() => copyBtn.textContent = "⧉", 1000);
        });
        return;
    }
});
