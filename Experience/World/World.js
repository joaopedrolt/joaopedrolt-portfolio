import Experience from "../Experience";

import Room from "./Room";
import Floor from "./Floor";
import Environment from "./Environment";

import EventEmitter from "events";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.compatibility = this.experience.compatibility;
    this.static = false;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.room = new Room();
      this.room.roomMeshes["floorCircle"] = this.floor.circle;
      this.emit("worldready");
    });
  }

  setStaticView() {
    this.static = true;
  }

  update() {
    if (this.room) {
      if (!this.compatibility.isMobileDevice) {
        if (!this.static) {
          this.room.update();
        }
      }
    }
  }
}