const output = document.querySelector(".output-text");
const saved = localStorage.getItem("counter");
let outputValue = saved ? JSON.parse(saved) : 0;

output.innerHTML = outputValue;

function saveCount() {
  localStorage.setItem("counter", JSON.stringify(outputValue));
}

document.querySelector(".plus")
  .addEventListener("click", () => {
    outputValue += 1;
    saveCount();
    output.innerHTML = outputValue;
  });

document.querySelector(".minus")
  .addEventListener("click", () => {
    outputValue -= 1;
    saveCount();
    output.innerHTML = outputValue;
  });

document.querySelector(".reset")
  .addEventListener("click", () => {
    outputValue = 0;
    saveCount();
    output.innerHTML = outputValue;
  });