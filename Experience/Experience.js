import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import Compatibility from "./Utils/Compatibility";
import Observer from "./Utils/Observer";
import assets from "./Utils/assets";
import ScrollLock from "./Utils/ScrollLock";

import Camera from "./Camera";
import Renderer from "./Renderer";
import Preloader from "./Preloader";

import World from "./World/World";
import Controls from "./Controls";
import Alert from "./Utils/Alert";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.compatibility = new Compatibility();
    this.scrollLock = new ScrollLock();
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.observer = new Observer();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.alert = new Alert();
    this.time = new Time();
    this.resources = new Resources(assets);
    this.world = new World();
    this.preloader = new Preloader();
    this.controls = new Controls();
    this.static = false;

    this.alert.on("safeButton", () => {
      this.static = true;
      this.renderer.setStaticView();
      this.world.setStaticView();
      this.time.setStaticView();
    });

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
    this.compatibility.resize();
    this.camera.resize();
    this.renderer.resize();
    this.world.room.resize();
  }
}
