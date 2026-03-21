import { GetProjectById, GetEventById } from "./dataManager.js"
import { openModal } from "./modal.js";

const productionLeaf = document.getElementById("journey-production");

/* クリックイベント */
productionLeaf.addEventListener("click", e => {
    const target = e.target.closest(".journey-leaf");
    if (!target) return;

    const id = target.dataset.id;
    const data = GetProjectById(id);
    if (!data) return;

    openModal(data, true);
});

const eventLeaf = document.getElementById("journey-event");

/* クリックイベント */
eventLeaf.addEventListener("click", e => {
    const target = e.target.closest(".journey-leaf");
    if (!target) return;

    const id = target.dataset.id;
    const data = GetEventById(id);
    if (!data) return;

    openModal(data, false);
});