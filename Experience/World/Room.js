import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
/* import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import * as dat from "dat.gui"; */

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.compatibility = this.experience.compatibility;

    /* this.gui = new dat.GUI(); */

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
    });

    const param = {
      color: 0xffffff,
    };

    const width = 1;
    const height = 1;
    const intensity = 5;
    this.rectLight = new THREE.RectAreaLight(
      param.color,
      intensity,
      width,
      height
    );

    /* this.gui.addColor(param, "color").onChange(() => {
      this.rectLight.color.set(param.color);
    });
 */
    /*     console.log(rectLight); */

    /* this.rectLight.position.set(0.1, 2.11, 0.43); */
    /* this.rectLight.rotation.set(-Math.PI / 2, 0.01, 0.75); */

    this.rectLight.position.set(0.81, 2.28, 1.51);
    this.rectLight.rotation.set(-0.28, 0.86, 1.73);

    /*  this.gui.add(this.rectLight.position, "x", -2, 3, 0.01);
    this.gui.add(this.rectLight.position, "y", -2, 3, 0.01);
    this.gui.add(this.rectLight.position, "z", -2, 3, 0.01);

    this.gui.add(this.rectLight.rotation, "x", -2, 3, 0.01);
    this.gui.add(this.rectLight.rotation, "y", -2, 3, 0.01);
    this.gui.add(this.rectLight.rotation, "z", -2, 3, 0.01); */

    /* const rectLightHelper = new RectAreaLightHelper(this.rectLight);
    this.rectLight.add(rectLightHelper);
    console.log(this.rectLight.height); */

    this.actualRoom.add(this.rectLight);
    this.actualRoom.scale.set(0.9, 0.9, 0.9);
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
      this.actualRoom.rotation.y = 0.06;
    }
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2.6) * 2.6) / window.innerWidth;
      this.lerp.target = this.rotation * 0.14;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}