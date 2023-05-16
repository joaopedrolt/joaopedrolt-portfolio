import Experience from "../Experience";
import { EventEmitter } from "events";

export default class Observer extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.canvas = this.experience.canvas;

    this.setCanvasObserver();
  }

  setCanvasObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.emit("canvasVisible", true);
        } else {
          this.emit("canvasVisible", false);
        }
      });
    });

    this.observer.observe(this.canvas);
  }
}
