import { projectData } from "./projectData.js";
import { eventData } from "./eventData.js";

// データの要素名->idの辞書を作成
const projectById = {};
for (const key in projectData) {
    const data = projectData[key];
    projectById[data.slug] = data;
}

const eventById = {};
for (const key in eventData) {
    const data = eventData[key];
    eventById[data.slug] = data;
}

export function GetProjectById(key){
    return projectById[key];
}

export function GetEventById(key){
    return eventById[key];
}