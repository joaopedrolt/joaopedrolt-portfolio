import * as THREE from "three";
import Experience from "./Experience";
/* import * as dat from "dat.gui"; */

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
/* 
    this.gui = new dat.GUI(); */

    /*   this.createPerspectiveCamera(); */
    this.createOrthographicCamera();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    /*  this.perspectiveCamera.position.z = 5; */
    // temp
    this.perspectiveCamera.position.z = 12;
    this.perspectiveCamera.position.y = 29;
    this.perspectiveCamera.position.x = 14;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );

    this.orthographicCamera.position.y = 3.4;
    this.orthographicCamera.position.x = 0;
    this.orthographicCamera.position.z = 5;
    this.orthographicCamera.rotation.x = -Math.PI / 6;
    this.scene.add(this.orthographicCamera);

 /*    this.gui.add(this.orthographicCamera.rotation, 'x', -2, 3, 0.1);
        this.gui.add(this.orthographicCamera.rotation, 'y', 0, 5, 0.1);
        this.gui.add(this.orthographicCamera.rotation, 'z', 0, 5, 0.1);

    this.gui.add(this.orthographicCamera.position, 'x', -2, 3, 0.01);
        this.gui.add(this.orthographicCamera.position, 'y', 0, 5, 0.1);
        this.gui.add(this.orthographicCamera.position, 'z', 0, 5, 0.1); */

    /* this.helper = new THREE.CameraHelper(this.orthographicCamera); */

    /* this.scene.add(this.helper); */
  }

  resize() {
    /* this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix(); */

    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {}
}