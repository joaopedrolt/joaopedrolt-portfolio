import EventEmitter from "events";
import Experience from "../Experience";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.compatibility = this.experience.compatibility;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.frustrum = 5;

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;

      if (this.compatibility.isMobileDevice) {
        if (this.width > this.height) {
          this.height = window.innerHeight;
        }
        if (window.innerWidth > window.innerHeight) {
          this.height = window.innerHeight;
        }
        if (this.compatibility.probablyDesktop) {
          this.height = window.innerHeight;
        }
      } else {
        this.height = window.innerHeight;
      }

      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.emit("resize");
    });
  }
}