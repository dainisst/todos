const output = document.querySelector(".output-text");
let countValue = 0;
const buttons = document.querySelectorAll(".button");

loadCount();
showCount();

function loadCount() {
  const saved = localStorage.getItem("counter");
  countValue = saved ? JSON.parse(saved) : 0;
}

function saveCount() {
  localStorage.setItem("counter", JSON.stringify(countValue));
}

function showCount() {
  output.innerHTML = countValue;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.list === "plus") {
      countValue += 1;
    }
    if (button.dataset.list === "minus") {
      countValue -= 1;
    }
    if (button.dataset.list === "reset") {
      countValue = 0;
    }
    saveCount();
    showCount();
  })
})