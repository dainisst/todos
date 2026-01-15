const output = document.querySelector(".output-text");
const buttons = document.querySelectorAll(".button");
const dateDiv = document.querySelector(".date");
let countValue = 0;
let savedDate = localStorage.getItem("lastClickedDate");

loadCount();
showCount();
showClickedDate();

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

function saveDate() {
  const today = getToday();
  localStorage.setItem("lastClickedDate", today);
  savedDate = today;
}

function getToday() {
  return new Date().toISOString().slice(0, 16);
}

function showClickedDate() {  
  dateDiv.innerHTML = `last Clicked on ${savedDate}`;
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
    saveDate();
    showClickedDate();
  })
})