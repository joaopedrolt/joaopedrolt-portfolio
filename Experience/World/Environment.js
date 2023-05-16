import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
/* import * as dat from "dat.gui"; */

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    /* this.gui = new dat.GUI(); */

    this.setSunLight();
    /* this.setGUI(); */
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 1.3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;

    this.sunLight.position.set(1, 5, 7);

    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.19254901960784313,
        g: 0.25137254901960785,
        b: 0.7062745098039216,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.04254901960784313,
        g: 0.10137254901960785,
        b: 0.5462745098039216,
      });
      GSAP.to(this.sunLight, {
        intensity: 0.9,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.68,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 1.3,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1,
      });
    }
  }

  setGUI() {
    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };

    this.gui.addColor(this.obj, "colorObj").onChange(() => {
      this.sunLight.color.copy(this.obj.colorObj);
      /* this.ambientLight.color.copy(this.obj.colorObj); */
      console.log(this.obj.colorObj);
    });

    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
      this.sunLight.intensity = this.obj.intensity;
      this.sunLight.ambientLight = this.obj.intensity;
    });
  }

  resize() {}

  update() {}
}
