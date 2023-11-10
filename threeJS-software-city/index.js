import {
    DUMMY_DATA
} from "./dummy_data";

// calculate city dimensions
let cityRectangleRatio = prompt("Enter dimension ratio of city (e.g. '2' => 2:1 ratio):"); // columns : rows
// let cityRectangleRatio = 2;

// spread of objects
let citySpread = prompt("Enter spread value of city (e.g. 1.5):"); // tiles between objects
// let citySpread = 1.5;

let rows = Math.sqrt(DUMMY_DATA.length / cityRectangleRatio);
let columns = cityRectangleRatio * rows;
rows = Math.round(rows);
columns = Math.round(columns);

// constants
const floorDimensionLength = columns;
const floorDimensionWidth = rows;

const { scene, controls } = createScene();

import { EffectComposer, RenderPass } from "postprocessing";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function createScene() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        0.1,
        400,
    );
    camera.position.set(-35, 30, -25);

    const renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
        depth: true,
        canvas: document.querySelector("#bg"),
    });

    resizeRenderer(renderer);

    renderer.render(scene, camera);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const aL = new THREE.AmbientLight(0xffffff, 1);
    scene.add(aL);

    const directionLight = new THREE.DirectionalLight(0xffaaff, 1);
    directionLight.position.set(-50, 50, -20);
    directionLight.castShadow = true;
    directionLight.shadow.mapSize.x = 768;
    directionLight.shadow.mapSize.y = 768;
    directionLight.shadow.camera.near = 15;
    directionLight.shadow.camera.far = 150.0;
    directionLight.shadow.camera.right = 75;
    directionLight.shadow.camera.left = -75;
    directionLight.shadow.camera.top = 75;
    directionLight.shadow.camera.bottom = -75;
    directionLight.castShadow = true;
    directionLight.castShadow = true;
    scene.add(directionLight);


    generateCity(scene, DUMMY_DATA);
    const controls = createControls(camera, renderer);

    const composer = setupPostProcessing(scene, camera, renderer);
    const clock = new THREE.Clock();

    function animate() {
        const delta = clock.getDelta();

        // this line repeatedly calls the animate() function
        requestAnimationFrame(animate);
        // scene.rotation.y += 0.001;

        // controls.update();
        // updateMixer(delta);
        composer.render();
    }
    animate();

    // Resize renderer when window size changes
    window.onresize = () => {
        resizeRenderer(renderer);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    };
    return { scene, controls };
}


// Set's the renderers size to current window size
function resizeRenderer(renderer) {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Create and configure controls and return it
function createControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enablePan = true;
    controls.panSpeed = 1.5;
    controls.minDistance = 10;
    controls.maxDistance = 150;

    return controls;
}

// Configure postprocessing and return composer
function setupPostProcessing(scene, camera, renderer) {
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    return composer;
}


// Create and setup anything environment-related
function generateCity(scene, data) {
    const sceneBackground = new THREE.Color(0xeeeeee);
    scene.background = sceneBackground;

    // create the ground
    const geometry = new THREE.PlaneGeometry(floorDimensionLength * 8 * citySpread, floorDimensionWidth * 8 * citySpread);
    const material = new THREE.MeshPhongMaterial({ color: 0xbababa, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.rotation.z = Math.PI / 2;
    plane.receiveShadow = true;

    scene.add(plane);

    const group = new THREE.Group();

    data.forEach((obj, index) => {
        // console.log(`buildingId: ${obj.buildingId}`);
        // console.log(`value: ${obj.value}`);
        // console.log('-------------------------');
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({ color: 0x222222 });
        const cube = new THREE.Mesh(geometry, material);

        cube.scale.y = obj.value / 10;
        cube.position.x = citySpread * (index % rows);
        cube.position.z = Math.floor(index / rows) * citySpread;

        cube.position.y = cube.scale.y / 2;

        cube.castShadow = true;
        cube.receiveShadow = true;

        group.add(cube);
    });

    scene.add(group);
}