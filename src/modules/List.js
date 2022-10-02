export class List {
    constructor(list, service, loadingMessage, counter, filterField) {
        this.service = service;
        this.loadingMessage = loadingMessage;
        this.list = list
        this.data = [];
        this.intervalId = null;
        this.notFoundElement = null;
        this.filterField = filterField;
        this.counter = counter;
    }

    async getData(query) {
        this.data = await this.service.getData(query);
    }

    async showResults(query) {
        this.removeNotFoundText();
        this.loadingMessage.toggle();
        this.clear();
        this.counter.hide();

        await this.getData(query).then(() => {
            if (this.data.size === 0) {
                clearInterval(this.intervalId);
                this.loadingMessage.toggle();
                this.addNotFoundText();
                return;
            }

            const filterValue = this.filterField.value.trim().toLowerCase();
            this.notFoundElement = null;
            this.data.forEach(item => {
                let li = document.createElement("li");
                if (item.toLowerCase() === filterValue) {
                    li.classList.add("filtered");
                }
                li.textContent = `  ${item}`;
                this.list.append(li);
            });
            this.loadingMessage.toggle();
        });
    }

    removeNotFoundText() {
        if (this.notFoundElement) {
            this.list.parentNode.removeChild(this.notFoundElement);
        }
    }

    addNotFoundText() {
        this.notFoundElement = document.createElement("span");
        this.notFoundElement.textContent = "По запросу ничего не найдено.";
        this.notFoundElement.classList.add("msg")
        this.list.parentNode.appendChild(this.notFoundElement);
    }

    clear() {
        this.list.innerHTML = "";
    }

    updateWithInterval(query, interval = 30) {
        let i = interval;

        this.intervalId = setInterval(() => {
            this.counter.setText(i);
            this.counter.show();

            if (i === 0) {
                this.counter.hide();
                clearInterval(this.intervalId);
                this.showResults(query).then(() => this.updateWithInterval(query, interval));
                i = 10;
            } else {
                i--;
            }
        }, 1000);
    }
}