import { fetchData } from "../../adapters/out/fetchDataWebController";
import * as THREE from 'three';

import { Building } from '../../domain/building';
import { MouseControls } from '../../domain/mouseControls';
import { ListOfBuildings } from '../../domain/listOfBuildings';
import { Plane } from "../../domain/plane";
import { LightSettings } from "../../domain/lightSettings";
import { VisualControls } from "../../domain/VisualControls";
import { Renderer } from "../../domain/renderer";
import { GUI } from "../../domain/gui";
import { normalizeToScale } from "../../domain/utils";
import index from "dat.gui";

export async function visualize(event, DATA) {

    // remove old canvas and gui
    let canvasElement = document.getElementsByTagName('canvas');
    if (canvasElement.length > 0) {
        canvasElement[0].remove();
    }
    let guiElement = document.getElementsByClassName('dg ac');
    if (guiElement.length > 0){
        guiElement[0].remove();
    }

    // Fetch Data first
    // let DATA = await fetchData();

    /**
     * START VISUALIZE
     */

    // Get Data from Form
    const form = event.target;
    let cityRectangleRatio = form.elements.dimensions.value;
    let citySpread = form.elements.citySpread.value;
    let shortSide = Math.sqrt(DATA.length / cityRectangleRatio);
    let longSide = cityRectangleRatio * shortSide;
    shortSide = Math.round(shortSide);
    longSide = Math.round(longSide);

    // Build Renderer
    const renderer = new Renderer();
    document.body.appendChild(renderer.getRenderer().domElement);

    // Build Scene
    const scene = new THREE.Scene();

    // Build AxesHelper
    // const axesHelper = new THREE.AxesHelper(100);
    // scene.add(axesHelper);

    // Build Light Settings
    const lightSettings = new LightSettings(longSide, shortSide, citySpread);
    scene.add(lightSettings.getAmbientLight());
    scene.add(lightSettings.getDirectionalLight());
    // scene.add(lightSettings.getDirectionalLightHelper());
    // scene.add(lightSettings.getDirectionalLightShadowHelper());

    const visualControls = new VisualControls(renderer.getRenderer(), longSide, shortSide, citySpread);

    renderer.getRenderer().render(scene, visualControls.getCamera());

    window.onresize = () => {
        renderer.getRenderer().setPixelRatio(window.devicePixelRatio);
        renderer.getRenderer().setSize(window.innerWidth, window.innerHeight);
        visualControls.getCamera().aspect = window.innerWidth / window.innerHeight;
        visualControls.getCamera().updateProjectionMatrix();
    };

    // Create Plane
    // const plane = new Plane(longSide, shortSide, citySpread);
    // scene.add(plane.getPlane());

    const listOfBuildings = new ListOfBuildings();
    let buildingId = 0;
    DATA.forEach((data, index) => {
        console.log(data.avgEyeFixationDuration);
        listOfBuildings.addBuilding(
            new Building(
                buildingId,
                data)
        );
        buildingId++;
    });

    // get all grouping columns
    const groupingTarget = document.getElementById("groupingTarget");
    const children = groupingTarget.children;

    const groupingColumns = [];
    for (let i = 0; i < children.length; i++) {
        console.log(children[i]);
        groupingColumns.add(children[i]);
    }
    console.log(groupingColumns);



    // determine the number of different groups
    const uniqueBuildingGroupIds = new Set();
    const groups = [];
    listOfBuildings.list.forEach(building => {
        uniqueBuildingGroupIds.add(building.buildingGroupId);
    });

    let largestGroupBox = 0;
    uniqueBuildingGroupIds.forEach(groupId => {
        const group = new THREE.Group();
        const groupGeometry = new THREE.BoxGeometry();
        const groupMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 });
        const groupBox = new THREE.Mesh(groupGeometry, groupMaterial);

        // get all buildings that need to be placed on that group
        listOfBuildings.list.forEach(building => {
            if(building.buildingGroupId === groupId){
                group.add(building);
            }
        });

        // determine gridSize to know how large the groupBox should be
        let gridSize = 0;
        while(group.children.length >= gridSize ** 2){
            gridSize += 1;
        }

        const layeredGrid = generateLayeredGrid(gridSize);

        let indexChildren = 0;
        for (const coord of layeredGrid) {

            if (indexChildren === group.children.length) {
                break;
            }

            let child = group.children[indexChildren];
            child.position.x = citySpread * coord.x;
            child.position.z = citySpread * coord.z;
            indexChildren += 1;
        }

        // set largestGroupBox for placing the groups on the canvas later
        if(groupBox.scale.x >= largestGroupBox){
            largestGroupBox = (gridSize + 1) * citySpread;
        }

        groupBox.scale.y = 0.4;
        // group size individual or all the same???
        // groupBox.scale.x = (gridSize + 1) * citySpread;
        // groupBox.scale.z = (gridSize + 1) * citySpread;
        groupBox.scale.x = largestGroupBox;
        groupBox.scale.z = largestGroupBox;

        group.add(groupBox);

        groups.push(group);
    })

    // placing groups on scene
    let gridSize = 0;
    while(groups.length > gridSize ** 2){
        gridSize += 1;
    }

    const layeredGrid = generateLayeredGrid(gridSize);

    let indexGroup = 0;
    for (const coord of layeredGrid) {

        if (indexGroup === groups.length) {
            break;
        }

        let group = groups[indexGroup];
        group.position.y = -0.4;
        group.position.x = largestGroupBox * coord.x + (coord.x * citySpread);
        group.position.z = largestGroupBox * coord.z + (coord.z * citySpread);
        scene.add(group);
        indexGroup += 1;
    }

    let highestBuilding = listOfBuildings.getHighestBuilding();
    console.log('Highest Building: %s', highestBuilding);

    // GUI
    const gui = new GUI(scene, highestBuilding);

    // Mouse Interaction
    const mouseControls = new MouseControls(document, visualControls.getCamera(), scene);

    // Animation Function
    function animate(time) {
        renderer.getRenderer().render(scene, visualControls.getCamera());
    }
    renderer.getRenderer().setAnimationLoop(animate);
}

// this is a helping function for placing items on the screen in a grid system
function generateLayeredGrid(size) {
    const grid = [];

    function addLayer(layer) {
        for (let i = -layer; i <= layer; i++) {
            for (let j = -layer; j <= layer; j++) {
                if (Math.abs(i) === layer || Math.abs(j) === layer) {
                    grid.push({ x: i, z: j });
                }
            }
        }
    }

    for (let layer = 0; layer < size; layer++) {
        addLayer(layer);
    }

    return grid;
}




