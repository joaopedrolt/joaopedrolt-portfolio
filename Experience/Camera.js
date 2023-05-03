import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience";
import * as dat from 'dat.gui';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.gui = new dat.GUI();

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
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

        this.orthographicCamera.position.y = 3.6;
        this.orthographicCamera.position.x = 0.3;
        this.orthographicCamera.position.z = 5;

        this.gui.add(this.orthographicCamera.rotation, 'x', -2, 3, 0.1);
        this.gui.add(this.orthographicCamera.rotation, 'y', 0, 5, 0.1);
        this.gui.add(this.orthographicCamera.rotation, 'z', 0, 5, 0.1);

        this.gui.add(this.orthographicCamera.position, 'x', -2, 3, 0.1);
        this.gui.add(this.orthographicCamera.position, 'y', 0, 5, 0.1);
        this.gui.add(this.orthographicCamera.position, 'z', 0, 5, 0.1);

        this.orthographicCamera.rotation.x = -Math.PI / 6;

        /* this.helper = new THREE.CameraHelper(this.orthographicCamera); */

        this.scene.add(this.orthographicCamera);
        /* this.scene.add(this.helper); */
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
        console.log(this.orthographicCamera.position);

/*         this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.orthographicCamera.position);
        this.helper.rotation.copy(this.orthographicCamera.rotation); */
    }
}