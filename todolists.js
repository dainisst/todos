import TodoList from "./todoclass.js";

const todo = new TodoList({
  input: document.querySelector(".input-text"),
  output: document.querySelector(".output-container"),
  addButton: document.querySelector(".add-button")
});

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const listKey = item.dataset.list;
    todo.switchList(listKey);
  });
});