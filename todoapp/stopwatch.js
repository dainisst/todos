export default class Stopwatch {
  constructor(container) {
    this.container = container;
    this.timeOutput = container.querySelector(".output-text");
    this.startButton = container.querySelector(".start");
    this.stopButton = container.querySelector(".stop");
    this.resetButton = container.querySelector(".reset");

    this.seconds = 0;
    this.interval = null;

    this.attachEvents();
    this.render();
  }
  attachEvents() {
    this.startButton.addEventListener("click", () => this.start());
    this.stopButton.addEventListener("click", () => this.stop());
    this.resetButton.addEventListener("click", () => this.reset());
  }

  start() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      this.seconds++;
      this.render();
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  reset() {
    this.stop();
    this.seconds = 0;
    this.render();
  }

  render() {
    const hrs = String(Math.floor(this.seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((this.seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(this.seconds % 60).padStart(2, "0");
    this.timeOutput.textContent = `${hrs}:${mins}:${secs}`;
  }
}

