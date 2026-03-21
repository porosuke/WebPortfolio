import { GetProjectById } from "./dataManager.js"
import { openModal } from "./modal.js";

const container = document.getElementById("project-container");

/* Top3 Favorite Project */
const topProjects = [
    "ZH",
    "RotD",
    "NE4SC"
];

// 一覧生成
topProjects.forEach(id => {
    const data = GetProjectById(id);
    if (!data) return;

    const item = document.createElement("div");
    item.classList.add("project-item");

    const img = document.createElement("img");
    img.classList.add("item-button");
    img.classList.add("content-button");
    img.classList.add("large");
    img.src = `images/projects/${data.slug}/${data.images[0]}-400.webp`;
    img.onerror = () => {
        img.src = "images/noImage.webp";
    };
    img.dataset.id = data.slug;

    const title = document.createElement("div");
    title.classList.add("item-title");
    title.textContent = data.title;

    item.appendChild(img);
    item.appendChild(title);
    container.appendChild(item);
});

/* クリックイベント */
container.addEventListener("click", e => {
    const target = e.target.closest(".item-button");
    if (!target) return;

    const id = target.dataset.id;
    const data = GetProjectById(id);
    if (!data) return;
    openModal(data, true);
});