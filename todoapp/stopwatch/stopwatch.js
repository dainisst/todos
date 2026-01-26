const output = document.querySelector(".output-text");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");

let startTime = null;
let elapsedBeforePause = 0;
let interval = null;

function saveState() {
  localStorage.setItem("stopwatch_elapsed", elapsedBeforePause);
  localStorage.setItem("stopwatch_startTime", startTime);
  localStorage.setItem("stopwatch_running", interval !== null);
}

function loadState() {
  elapsedBeforePause = Number(localStorage.getItem("stopwatch_elapsed")) || 0;
  startTime = Number(localStorage.getItem("stopwatch_startTime")) || null;
  const running = localStorage.getItem("stopwatch_running") === "true";

  if (running && startTime) {
    interval = setInterval(updateStopwatch, 1000);
  }

  updateStopwatch();
}

function updateStopwatch() {
  let elapsed = elapsedBeforePause;
  if (interval && startTime) {
    elapsed += Date.now() - startTime;
  }

  const totalSeconds = Math.floor(elapsed / 1000);

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, 0);
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, 0);
  const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, 0);

  output.innerHTML = `${hours}:${minutes}:${seconds}`;

}

function start() {
  if (interval) return;
  startTime = Date.now();
  interval = setInterval(updateStopwatch, 1000);
  saveState();
}

function stop() {
  if (!interval) return;
  elapsedBeforePause += Date.now() - startTime;
  startTime = null;
  clearInterval(interval);
  interval = null;
  saveState();
}

function reset() {
  stop();
  startTime = 0;
  elapsedBeforePause = 0;
  output.innerHTML = "00:00:00";

  localStorage.removeItem("stopwatch_elapsed");
  localStorage.removeItem("stopwatch_startTime");
  localStorage.removeItem("stopwatch_running");
}

startButton.addEventListener("click", () => { start() });
stopButton.addEventListener("click", () => { stop() });
resetButton.addEventListener("click", () => { reset() });

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && interval) {
    updateStopwatch();
  }
});

loadState();