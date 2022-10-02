import {searchField, button, filterField, headerSpan, LoadingMessage, Counter} from "./modules/DomEntities.js";
import "./style.css";
import {List} from "./modules/List.js";
import {Service} from "./modules/Service.js";

const list = new List(
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
    clearInterval(list.intervalId);

    await list.showResults(query);
    if (!list.notFoundElement) {
        await list.updateWithInterval(query, 30);
    }
});

filterField.addEventListener("input", (evt) => {
    const filterValue = evt.target.value.trim().toLowerCase();
    [].forEach.call(list.list.children, li => {
        li.classList = "";

        if (filterValue !== "") {
            if (li.textContent.trim().toLowerCase().includes(filterValue)) {
                li.classList.add("filtered");
            }
        }
    });
});