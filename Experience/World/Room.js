import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.compatibility = this.experience.compatibility;
    this.roomMeshes = {};

    this.setModel();
    this.checkCompatibility();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }

      if (child.name === "Screen") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      child.scale.set(0, 0, 0);

      this.roomMeshes[child.name.toLowerCase()] = child;
    });

    if (!this.compatibility.isMobileDevice) {
      this.actualRoom.scale.set(0.9, 0.9, 0.9);
    } else {
      this.actualRoom.scale.set(0.6, 0.6, 0.6);
    }

    this.scene.add(this.actualRoom);
  }

  checkCompatibility() {
    if (!this.compatibility.isMobileDevice) {
      this.lerp = {
        current: 0,
        target: 0,
        ease: 0.1,
      };

      this.onMouseMove();
    } else {
      this.lerp = {
        current: 0,
        target: 0,
        ease: 0.1,
      };

      this.actualRoom.rotation.y = 0.06;
    }
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2.16) * 2.16) / window.innerWidth;
      this.lerp.target = this.rotation * 0.15;
    });
  }

  resize() {
    if (!this.compatibility.isMobileDevice) {
      this.onMouseMove();
    }
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}