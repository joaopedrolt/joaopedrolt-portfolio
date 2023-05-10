import Experience from "../Experience";

import Room from "./Room";
import Floor from "./Floor";
import Controls from "./Controls";
import Environment from "./Environment";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.compatibility = this.experience.compatibility;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.room = new Room();
      this.controls = new Controls();
    });
  }

  resize() {}

  update() {
    if (this.room) {
      if (!this.compatibility.isMobileDevice) {
        this.room.update();
      }
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
