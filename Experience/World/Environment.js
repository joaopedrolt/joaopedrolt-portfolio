import Experience from "../Experience";
import * as THREE from 'three';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

     /*    const size = 20;
        const divisions = 20;

        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper); */

        this.setSunLight();
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 2.5);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;

        this.sunLight.position.set(1, 5, 7);

        const helper = new THREE.DirectionalLightHelper(this.sunLight, 5);

        this.scene.add(this.sunLight);
        this.scene.add(helper);
        
        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientLight);
    }

    resize() {

    }

    update() {
    }
}