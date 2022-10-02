const button = document.getElementById("search_button");
const searchField = document.getElementById("search_field");
const filterField = document.getElementById("filter_field");
const headerSpan = document.getElementById("header");

class LoadingMessage {
    constructor() {
        this.loadingMessage = document.getElementById("loading_msg");
    }

    toggle() {
        this.loadingMessage.classList.toggle("hidden");
    }
}

class Counter {
    constructor() {
        this.counterSpan = document.getElementById("counter");
    }

    hide() {
        this.counterSpan.parentNode.classList.add("hidden");
    }

    show() {
        this.counterSpan.parentNode.classList.remove("hidden");
    }

    setText(text) {
        this.counterSpan.textContent = text;
    }
}

export {button, searchField, filterField, LoadingMessage, Counter, headerSpan};