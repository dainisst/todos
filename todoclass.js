export default class TodoList {
    constructor({ input, output, addButton }) {
        this.input = input;
        this.output = output;
        this.addButton = addButton;

        this.activeKey = "today";
        this.list = [];

        this.attachEvents();
        this.loadList();
    }

    loadList() {
        const saved = localStorage.getItem(this.activeKey);
        this.list = saved ? JSON.parse(saved) : [];
        this.render();
    }

    saveList() {
        localStorage.setItem(this.activeKey, JSON.stringify(this.list));
    }

    addItem() {
        const text = this.input.value.trim();
        if (!text) return;

        this.list.push({ text, done: false });
        this.input.value = "";
        this.saveList();
        this.render();
    }

    deleteItem(index) {
        this.list.splice(index, 1);
        this.saveList();
        this.render();
    }

    toggleDone(index) {
        this.list[index].done = !this.list[index].done;
        this.saveList();
        this.render();
    }

    render() {
        this.output.innerHTML = this.list.map((item, index) => {
            return `
            <div class="output-item" data-index="${index}">
            <p class="item-text ${item.done ? "done" : ""}">${item.text}</p>
            <button class="delete-button">del</button>
            </div>
            `;
        }).join("");
    }

    attachEvents() {
        this.addButton.addEventListener('click', () => {
            this.addItem();
        });

        this.input.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                this.addItem();
            }
        });

        this.output.addEventListener('click', (event) => {
            const parent = event.target.closest(".output-item");
            if (!parent) return;
            const index = Number(parent.dataset.index);
            if (event.target.classList.contains("delete-button")) {
                this.deleteItem(index);
            }
            if (event.target.classList.contains("item-text")) {
                this.toggleDone(index);
            }
        });
    }

    switchList(key) {
        this.activeKey = key;
        this.loadList();
    }
}