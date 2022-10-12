import {searchField, button, filterField, headerSpan, LoadingMessage, Counter} from "./modules/DomEntities.js";
import "./style.css";
import {InfoArea} from "./modules/InfoArea.js";
import {Service} from "./modules/Service.js";

const infoArea = new InfoArea(
    document.getElementById("list"),
    new Service(),
    new LoadingMessage(),
    new Counter(),
    filterField
);

button.addEventListener("click", async () => {
    const query = searchField.value.trim();

    if (query === "") {
        alert("Поле запроса не заполнено");
        return;
    }

    headerSpan.textContent = `"${query}"`;
    clearInterval(infoArea.intervalId);

    await infoArea.showResults(query);
    if (!infoArea.notFoundElement) {
        await infoArea.updateWithInterval(query, 30);
    }
});

filterField.addEventListener("input", (evt) => {
    const filterValue = evt.target.value.trim().toLowerCase();
    [].forEach.call(infoArea.list.children, li => {
        li.classList = "";

        if (filterValue !== "") {
            if (li.textContent.trim().toLowerCase().includes(filterValue)) {
                li.classList.add("filtered");
            }
        }
    });
});