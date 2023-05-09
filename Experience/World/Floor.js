import Experience from "../Experience";
import * as THREE from 'three';

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircle();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.BackSide,

        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.3;
        this.plane.receiveShadow = true;
    }

    setCircle() {
        const geometry = new THREE.CircleGeometry(5, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0x99A081 });
        this.circle = new THREE.Mesh(geometry, material);
        this.circle.position.y = -0.29;
        this.circle.scale.set(0.4, 0.4, 0.4);
        this.circle.rotation.x = -Math.PI / 2;
        this.circle.receiveShadow = true;
        this.scene.add(this.circle);
    }

    resize() {

    }

    update() {
    }
}