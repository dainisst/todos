export default class Counter {
    constructor(container) {
        this.container = container;
        this.countOutput = container.querySelector(".counter-count");
        this.dateOutput = container.querySelector(".date");
        this.incrementButton = container.querySelector(".increment");
        this.decrementButton = container.querySelector(".decrement");
        this.resetButton = container.querySelector(".reset");

        this.count = 0;
        this.savedDate = localStorage.getItem("clickedDate");

        this.load();
        this.attachEvents();
        this.render();
        this.showClickedDate();
    }

    attachEvents() {
        this.incrementButton.addEventListener("click", () => this.increment());
        this.decrementButton.addEventListener("click", () => this.decrement());
        this.resetButton.addEventListener("click", () => this.reset());
    }

    increment() {
        this.count++;
        this.render();
        this.save();
        this.saveDate();
        this.showClickedDate();
    }

    decrement() {
        if (this.count > 0) {
            this.count--;
            this.render();
            this.save();
            this.saveDate();
            this.showClickedDate();
        }
    }

    reset() {
        this.count = 0;
        this.render();
        this.save();
        this.saveDate();
        this.showClickedDate();
    }

    save() {
        localStorage.setItem("counter", JSON.stringify(this.count));
    }

    load() {
        const countSaved = JSON.parse(localStorage.getItem("counter"));
        this.count = countSaved || 0;
    }

    render() {
        this.countOutput.textContent = `${this.count}`;
    }

    getToday() {
        return new Date().toLocaleString("en-GB");
    }

    saveDate() {
        const today = this.getToday();
        localStorage.setItem("clickedDate", today);
        this.savedDate = today;
    }

    showClickedDate() {
        this.dateOutput.innerHTML = `last clicked on ${this.savedDate}`;
    }
}