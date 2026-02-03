export default class Stopwatch {
  constructor(container) {
    this.container = container;
    this.timeOutput = container.querySelector(".stopwatch-time");
    this.startButton = container.querySelector(".start");
    this.stopButton = container.querySelector(".stop");
    this.resetButton = container.querySelector(".reset");

    this.seconds = 0;
    this.interval = null;
    this.startedAt = null;

    this.load();
    this.attachEvents();
    this.render();

    if (this.startedAt) {
      this.resume();
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
    this.save();

    this.interval = setInterval(() => {
      this.tick();
    }, 1000);

  }

  tick() {
    const now = Date.now();
    const diff = Math.floor((now - this.startedAt) / 1000);
    this.seconds += diff;
    this.startedAt = now;

    this.save();
    this.render();
  }

  stop() {
    if (!this.interval) return;

    clearInterval(this.interval);
    this.interval = null;
    this.startedAt = null;

    this.save();   
  }

  reset() {
    this.stop();
    this.seconds = 0;
    this.save();
    this.render();
  }

  resume() {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  save() {
    localStorage.setItem("stopwatch", JSON.stringify({
      seconds: this.seconds,
      startedAt: this.startedAt
    }));
  }

  load() {
    const data = JSON.parse(localStorage.getItem("stopwatch"));
    if (!data) return;

    this.seconds = data.seconds || 0;
    this.startedAt = data.startedAt || null;
  }

  render() {
    const hrs = String(Math.floor(this.seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((this.seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(this.seconds % 60).padStart(2, "0");

    this.timeOutput.textContent = `${hrs}:${mins}:${secs}`;
  }
}

