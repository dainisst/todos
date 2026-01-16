const output = document.querySelector(".stopwatch-output");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");

let elapsedSeconds = 0;
let interval = null;

function updateTime() {
  elapsedSeconds++;

  const hours = String(Math.floor(elapsedSeconds / 3600)).padStart(2, 0);
  const minutes = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, 0);
  const seconds = String(Math.floor(elapsedSeconds % 60)).padStart(2, 0);

  output.innerHTML = `${hours}:${minutes}:${seconds}`;

}

function startTime() {
  if (interval) return;
  interval = setInterval(updateTime, 1000);
}

function stopTime() {
  clearInterval(interval);
  interval = null;
}

function resetTime() {
  stopTime();
  elapsedSeconds = 0;
  output.innerHTML = "00:00:00";
}

startButton.addEventListener("click", () => { startTime() });
stopButton.addEventListener("click", () => { stopTime() });
resetButton.addEventListener("click", () => { resetTime() });