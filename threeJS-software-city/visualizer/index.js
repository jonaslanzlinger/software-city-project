import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    let DATA;

    const apiUrl = 'http://192.168.0.12:3001/';
    await fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            DATA = data;
        })
        .catch(error => {
            console.error('Error:', error.message);
        });

    console.log(DATA);

    event.target.hidden = true;
    const form = event.target;
    let cityRectangleRatio = form.elements.dimensions.value;
    let citySpread = form.elements.citySpread.value;

    let shortSide = Math.sqrt(DATA.length / cityRectangleRatio);
    let longSide = cityRectangleRatio * shortSide;
    shortSide = Math.round(shortSide);
    longSide = Math.round(longSide);

    /**
     * SETUP BASIC CANVAS
     */
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    scene.add(directionalLight);

    const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
    scene.add(dLightHelper);

    const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(dLightShadowHelper);

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.8,
        1000
    );

    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(
        shortSide * citySpread * 2,
        longSide * Math.max(2, citySpread),
        longSide * citySpread * 2);
    orbit.target = new THREE.Vector3(shortSide * citySpread / 2, 0, longSide * citySpread / 2);
    orbit.update();

    renderer.setClearColor(0xBBBBBB);

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

    let maxValue = 0;
    const group = new THREE.Group();
    DATA.forEach((obj, index) => {
        const boxGeometry = new THREE.BoxGeometry();
        const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00FF00 });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.scale.y = obj.value / 10;
        box.position.x = citySpread * (index % shortSide);
        box.position.z = Math.floor(index / shortSide) * citySpread;
        box.position.y = box.scale.y / 2;
        box.castShadow = true;
        box.receiveShadow = true;

        // attach the data to the object
        box.userData = obj;

        group.add(box);

        // get the maximum value of the data
        if (obj.value > maxValue) {
            maxValue = obj.value;
        }

    });
    scene.add(group);

    /**
     * GENERATE GUI
     */
    const gui = new dat.GUI();
    const options = {
        thresholdValue: 0,
        thresholdColor: '#FF0000'
    }

    gui.add(options, 'thresholdValue', 0, maxValue).onChange(value => {
        options.thresholdValue = value;
        group.children.forEach(e => {
            if (e.scale.y * 10 >= options.thresholdValue) {
                e.material.color.set(options.thresholdColor);
            }
        });
    });

    gui.addColor(options, 'thresholdColor').onChange(color => {
        options.thresholdColor = color;
        group.children.forEach(e => {
            if (e.scale.y * 10 >= options.thresholdValue) {
                e.material.color.set(options.thresholdColor);
            }
        });
    });

    // On-click functionality
    document.addEventListener('mousedown', onMouseClick);
    function onMouseClick(event) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children);

        for (const obj of intersects) {
            if (obj.object.geometry.type == "BoxGeometry") {
                console.log(obj.object.userData);
                break;
            }
        }
    }

    // Hover effect
    document.addEventListener('mousemove', onMouseMove);
    let previousHoverObject;
    let previousColor;
    function onMouseMove(event) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children);

        if (previousHoverObject != null) {
            previousHoverObject.object.material.color.set(previousColor);
            previousHoverObject = null;
        }

        for (const obj of intersects) {
            if (obj.object.geometry.type == "BoxGeometry") {
                previousHoverObject = obj;
                previousColor = new THREE.Color(obj.object.material.color);

                // calculate complementary color
                let color = obj.object.material.color;
                color.r = 1 - color.r;
                color.g = 1 - color.g;
                color.b = 1 - color.b;
                obj.object.material.color.set(color);
                break;
            }
        }
    }

    function animate(time) {
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
});