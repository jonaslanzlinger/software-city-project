import {
    DUMMY_DATA
} from './dummy_data';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let cityRectangleRatio = prompt("Enter dimension ratio of city (e.g. '2' => 2:1 ratio):");
let citySpread = prompt("Enter spread value of city (e.g. 1.5):");

let shortSide = Math.sqrt(DUMMY_DATA.length / cityRectangleRatio);
let longSide = cityRectangleRatio * shortSide;
shortSide = Math.round(shortSide);
longSide = Math.round(longSide);

/**
 * SETUP BASIC CANVAS
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
directionalLight.position.set(
    shortSide * citySpread * 2,
    longSide * Math.max(2, citySpread),
    longSide * citySpread * 2);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = longSide;
directionalLight.shadow.camera.right = -longSide;
directionalLight.shadow.camera.top = longSide;
directionalLight.shadow.camera.bottom = -longSide;
scene.add(directionalLight);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(
    shortSide * citySpread * 2,
    longSide * Math.max(2, citySpread),
    longSide * citySpread * 2);
orbit.update();

renderer.setClearColor(0xCCCCCC);

renderer.render(scene, camera);

window.onresize = () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

/**
 * GENERATE SOFTWARE CITY
 */
const planeGeometry = new THREE.PlaneGeometry(longSide * citySpread * 8, shortSide * citySpread * 8);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
plane.rotation.z = Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const group = new THREE.Group();
DUMMY_DATA.forEach((obj, index) => {
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00FF00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.scale.y = obj.value / 10;
    box.position.x = citySpread * (index % shortSide);
    box.position.z = Math.floor(index / shortSide) * citySpread;
    box.position.y = box.scale.y / 2;
    box.castShadow = true;
    box.receiveShadow = true;
    group.add(box);
});
scene.add(group);

function animate(time) {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);