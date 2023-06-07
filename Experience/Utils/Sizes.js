import EventEmitter from "events";
import Experience from "../Experience";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.compability = this.experience.compatibility;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.frustrum = 5;

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      if (!this.compability.isMobileDevice) {
        this.height = window.innerHeight;
      }
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.compability.resize();

      this.emit("resize");
    });
  }
}
