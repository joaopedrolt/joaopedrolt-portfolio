import { EventEmitter } from "events";
/* import Stats from "../../public/stats.js/src/Stats"; */
import Experience from "../Experience.js";

export default class Time extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer.renderer;
    this.canvas = this.experience.canvas;
    this.observer = this.experience.observer;
    this.alert = this.experience.alert;
    this.start = Date.now();
    this.frames = 0;
    this.fpsValues = [];
    this.fpsThreshold = 9;
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.animationFrameId = null;
    this.alertIssued = false;
    this.static = false;

    this.alert.on("ignoreButton", () => {
      this.update();
    });

    this.observer.on("canvasVisible", (visible) => {
      if(!this.static){
        this.setAnimation(visible);
      }
    });

    /*     this.fpsTracker(); */
  }

  setAnimation(visible) {
    if (visible) {
      this.update();
    } else {
      this.stopUpdating();
    }
  }

  calculateAverageFPS() {
    var sum = 0;
    for (var i = 0; i < this.fpsValues.length; i++) {
      sum += this.fpsValues[i];
    }
    return sum / this.fpsValues.length;
  }
  /* 
   fpsTracker() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
  } */

  update() {
    console.log("ads");

    this.animationFrameId = window.requestAnimationFrame(() => this.update());

    if (this.elapsed <= 20000) {
      this.frames++;

      const currentTime = Date.now();

      if (currentTime > this.current + 1000) {
        var fps = Math.floor(
          (this.frames * 1000) / (currentTime - this.current)
        );
        this.fpsValues.push(fps);

        if (this.fpsValues.length > 60) {
          fpsValues.shift();
        }

        if (this.elapsed > 4000) {
          var averageFPS = this.calculateAverageFPS();

          if (averageFPS < this.fpsThreshold) {
            if (!this.alertIssued) {
              this.emit("lowperformance");
              window.cancelAnimationFrame(this.animationFrameId);
              this.alertIssued = true;
            }
          }
        }

        this.current = currentTime;
        this.frames = 0;
      }

      this.elapsed = this.current - this.start;
    }

    this.emit("update");
  }

  stopUpdating() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  setStaticView() {
    this.static = true;
    console.log(this.static);
  }
}
