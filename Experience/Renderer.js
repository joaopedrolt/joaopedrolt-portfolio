import Experience from "./Experience";
import * as THREE from "three";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.compatibility = this.experience.compatibility;
    this.static = false;

    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    if (!this.compatibility.isMobileDevice) {
      this.renderer.setPixelRatio(this.sizes.pixelRatio);
    } else {
      this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }
  }

  setStaticView() {
    this.time = this.experience.time;
    this.static = true;
  }

  update() {
    this.renderer.render(this.scene, this.camera.orthographicCamera);
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);

    if (this.static) {
      this.time.update();
      setTimeout(() => {
        this.time.stopUpdating();
      }, 2500);
    }
  }
}