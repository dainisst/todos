export default class Counter {
    constructor(container) {
        this.container = container;
        this.countOutput = container.querySelector(".counter-count");
        this.incrementButton = container.querySelector(".increment");
        this.decrementButton = container.querySelector(".decrement");
        this.resetButton = container.querySelector(".reset");

        this.count = 0;

        this.load();
        this.attachEvents();
        this.render();
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
    }

    decrement() {
        if (this.count > 0) {
            this.count--;
            this.render();
            this.save();
        }
    }

    reset() {
        this.count = 0;
        this.render();
        this.save();
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
}