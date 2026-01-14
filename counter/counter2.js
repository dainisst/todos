const output = document.querySelector(".output-text");
const buttons = document.querySelectorAll(".button");
const dateDiv = document.querySelector(".date");
let countValue = 0;
const today = new Date().toISOString().slice(0, 10)

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

function todayDate() {  
  dateDiv.innerHTML = `last Clicked on ${today}`; // YYYY-MM-DD
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.list === "plus") {
      countValue++;
    }
    if (button.dataset.list === "minus") {
      countValue--;
    }
    if (button.dataset.list === "reset") {
      countValue = 0;
    }
    saveCount();
    showCount();
    todayDate();
  })
})