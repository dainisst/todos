export default class Counter {
    constructor(container) {
        this.container = container;
        this.countOutput = container.querySelector(".counter-count");
        this.incrementButton = container.querySelector(".increment");
        this.decrementButton = container.querySelector(".decrement");
        this.resetButton = container.querySelector(".reset");
        
        this.count = 0;
        
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
    }

    decrement() {
        if (this.count > 0) {
            this.count--;
            this.render();
        }
    }

    reset() {
        this.count = 0;
        this.render();
    }

    render() {
        this.countOutput.textContent = `${this.count}`;
    }
}