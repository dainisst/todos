export default class Stopwatch {
  constructor(container) {
    this.container = container;
    this.timeOutput = container.querySelector(".stopwatch-time");
    this.startButton = container.querySelector(".start");
    this.stopButton = container.querySelector(".stop");
    this.resetButton = container.querySelector(".reset");

    this.offsetSeconds = 0;
    this.interval = null;
    this.startedAt = null;

    this.load();
    this.attachEvents();
    this.render();

    if (this.startedAt) {
      this.startInterval();
    }
  }

  attachEvents() {
    this.startButton.addEventListener("click", () => this.start());
    this.stopButton.addEventListener("click", () => this.stop());
    this.resetButton.addEventListener("click", () => this.reset());
  }

  start() {
    if (this.interval) return;

    this.startedAt = Date.now();
    this.startInterval();
    this.save();
  }

  startInterval() {
    this.interval = setInterval(() => this.tick(), 250);
  }

  tick() {
    const elapsed = this.offsetSeconds + Math.floor((Date.now() - this.startedAt) / 1000);

    this.render(elapsed);
  }

  stop() {
    if (!this.interval) return;

    this.offsetSeconds += Math.floor((Date.now() - this.startedAt) / 1000);

    clearInterval(this.interval);
    this.interval = null;
    this.startedAt = null;

    this.save();
  }

  reset() {
    clearInterval(this.interval);
    this.interval = null;
    this.offsetSeconds = 0;
    this.startedAt = null;

    this.save();
    this.render(0);
  }

  render(seconds = this.offsetSeconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    this.timeOutput.textContent = `${hrs}:${mins}:${secs}`;
  }

  save() {
    localStorage.setItem("stopwatch", JSON.stringify({
      offsetSeconds: this.offsetSeconds,
      startedAt: this.startedAt
    }));
  }

  load() {
    const data = JSON.parse(localStorage.getItem("stopwatch"));
    if (!data) return;

    this.offsetSeconds = data.offsetSeconds || 0;
    this.startedAt = data.startedAt || null;
  }
}

