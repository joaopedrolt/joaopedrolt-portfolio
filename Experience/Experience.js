import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import Compatibility from "./Utils/Compatibility";
import Observer from "./Utils/Observer";
import assets from "./Utils/assets";

import Camera from "./Camera";
import Renderer from "./Renderer";
import Preloader from "./Preloader";
import Theme from "./Theme";

import World from "./World/World";
import Controls from "./Controls";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.compatibility = new Compatibility();
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.observer = new Observer();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();
    this.controls = new Controls;

    this.time.on("update", () => {
      this.update();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
}