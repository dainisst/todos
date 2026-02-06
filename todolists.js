import TodoList from "./todoclass.js";
import Stopwatch from "./stopwatch.js";
import Counter from "./counter.js";

const todoContainer = document.querySelector(".todo-container");
const stopwatchContainer = document.querySelector(".stopwatch-container");
const counterContainer = document.querySelector(".counter-container");

const todo = new TodoList({
  input: document.querySelector(".input-text"),
  output: document.querySelector(".output-container"),
  addButton: document.querySelector(".add-button")
});

new Stopwatch(stopwatchContainer);
new Counter(counterContainer);

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const key = item.dataset.list;

    if (key === "stopwatch") {
      todoContainer.classList.add("hidden");
      counterContainer.classList.add("hidden");
      stopwatchContainer.classList.remove("hidden");
    }
    else if(key === "counter") {
      todoContainer.classList.add("hidden");
      stopwatchContainer.classList.add("hidden");
      counterContainer.classList.remove("hidden");
    } else {
      stopwatchContainer.classList.add("hidden");
      counterContainer.classList.add("hidden");
      todoContainer.classList.remove("hidden");
      todo.switchList(key);
    }
  });
});