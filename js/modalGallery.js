export function initGallery(root, directory, slug, images) {

    if (!images || images.length === 0) return null;

    const imageWrapper = root.querySelector(".gallery-image-wrapper");
    const indicatorsContainer = root.querySelector(".gallery-indicators");
    const prevBtn = root.querySelector(".gallery-button.prev");
    const nextBtn = root.querySelector(".gallery-button.next");

    let currentIndex = 0;
    let isAnimating = false;

    const name = images[currentIndex];
    const base = getImageBase(directory, slug, name);
    let img = document.createElement("img");
    applyResponsiveImage(img, base, {
        onLoad: (img) => {
            imageWrapper.style.height = img.offsetHeight + "px";
        }
    });
    let node = wrapWithLink(img, base);
    imageWrapper.appendChild(node);

    const indicators = [];
    indicatorsContainer.innerHTML = "";

    // インジケーターはまとめて追加
    const fragment = document.createDocumentFragment();
    images.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("indicator");
        dot.classList.add("content-button");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goTo(index));
        fragment.appendChild(dot);
        indicators.push(dot);
    });
    indicatorsContainer.appendChild(fragment);

    function applyResponsiveImage(img, base, { onLoad } = {}) {
        img.src = `${base}-800.webp`;

        img.srcset = `
            ${base}-400.webp 400w,
            ${base}-800.webp 800w,
            ${base}-1600.webp 1600w
        `;

        img.sizes = "(max-width: 768px) 100vw, 50vw";

        img.onerror = () => {
            img.src = "images/noImage.webp";
        };

        if (onLoad) {
            img.onload = () => onLoad(img);
        }
    }

    function getImageBase(directory, slug, name) {
        return `images/${directory}/${slug}/${name}`;
    }

    function wrapWithLink(img, base) {
        const link = document.createElement("a");
        link.href = `${base}-1600.webp`;
        link.target = "_blank";
        link.appendChild(img);
        return link;
    }

    // インジケーターの更新
    function updateIndicators() {
        indicators.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }
    // 任意の画像に飛ぶ
    function goTo(targetIndex) {
        if (targetIndex === currentIndex) return;

        const len = images.length;
        const forward = (targetIndex - currentIndex + len) % len;
        const backward = forward - len;

        const step =
            Math.abs(forward) < Math.abs(backward)
                ? forward
                : backward;
        const nextIndex =
            (currentIndex + step + len) % len;
        moveToIndex(nextIndex);
    }
    // 1ステップの移動
    function move(step) {
        goTo((currentIndex + step + images.length) % images.length);
    }
    function getDirection(current, next, len) {
        let dir = next > current ? 1 : -1;
        if (Math.abs(next - current) > len / 2) {
            dir *= -1;
        }
        return dir;
    }
    // 画像の切り替えベース
    function moveToIndex(nextIndex) {
        if (isAnimating) return;
        isAnimating = true;
        const direction = getDirection(currentIndex, nextIndex, images.length);
        currentIndex = nextIndex;
        updateIndicators();

        const newName = images[currentIndex];
        const newBase = getImageBase(directory, slug, newName);
        const newImg = document.createElement("img");
        applyResponsiveImage(newImg, newBase, {
            onLoad: (newImg) => {
                imageWrapper.style.height = newImg.offsetHeight + "px";
            }
        });
        const newNode = wrapWithLink(newImg, newBase);
        newNode.style.transform = `translateX(${direction * 100}%)`;
        imageWrapper.appendChild(newNode);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                node.style.transform = `translateX(${-direction * 100}%)`;
                newNode.style.transform = "translateX(0)";
            });
        });
        newNode.addEventListener("transitionend", () => {
            // console.log("transition end");
            node.remove();
            node = newNode;
            isAnimating = false;
        }, { once: true });
    }

    // 画像スワイプで移動
    let touchStartX = 0;
    let touchStartY = 0;

    imageWrapper.addEventListener("touchstart", (e) => {
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
    }, { passive: true });

    imageWrapper.addEventListener("touchend", (e) => {
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;
        // 縦スクロール除外
        if (Math.abs(dx) < Math.abs(dy)) return;
        if (Math.abs(dx) > 50) {
            if (dx > 0) move(-1);
            else move(1);
        }
    }, { passive: true });

    prevBtn.addEventListener("click", () => move(-1));
    nextBtn.addEventListener("click", () => move(1));
    updateIndicators();

    return { move };
}