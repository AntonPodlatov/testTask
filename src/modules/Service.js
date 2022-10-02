export class Service {
    constructor() {
        this.dataArray = [];
    }

    async fetch(query, page) {
        let pageValue = "";
        if (page !== 0) {
            pageValue = `&page=${page}`
        }
        const url = "https://search.wb.ru/exactmatch/ru/common/v4/search?" +
            "&dest=-1221148,-140294,-1751445,-364763&locale=ru" +
            "&resultset=catalog" +
            "&sort=popular";
        return fetch(url + `&query=${query}` + pageValue)
            .then(res => res.json());
    }

    async getData(query) {
        this.dataArray = [];
        let i = 0
        let isData = true;
        while (isData) {
            const data = await this.fetch(query, i);
            if (Object.keys(data).length === 0 || data.data.products.length === 0) {
                isData = false;
                continue;
            }

            data.data.products.forEach(product => {
                this.dataArray.push(product.brand);
            });
            i++;
        }

        return new Set(this.dataArray.filter(item => {
            return item !== "";
        }));
    }
}


