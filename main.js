import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

loader.load('./model/wraith.glb', (gltf) => {
  scene.add(gltf.scene);
}, undefined, (error) => {
  console.error(error);
});

/* const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube); */

camera.position.z = 100;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  alert('Your graphics card does not seem to support WebGL');
}