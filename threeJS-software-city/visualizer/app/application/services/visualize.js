import { fetchData } from "../../adapters/out/fetchDataWebController";
import * as THREE from 'three';

import { Building } from '../../domain/building';
import { MouseControls } from '../../domain/mouseControls';
import { GUI } from 'dat.gui';
import { ListOfBuildings } from '../../domain/listOfBuildings';
import { Plane } from "../../domain/plane";
import { LightSettings } from "../../domain/lightSettings";
import { VisualControls } from "../../domain/VisualControls";
import { Renderer } from "../../domain/renderer";

export async function visualize(event, DATA) {

    // Fetch Data first
    // let DATA = await fetchData();

    /**
     * START VISUALIZE
     */

    // Hide Previous Screen
    event.target.hidden = true;

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
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // Build Light Settings
    const lightSettings = new LightSettings(longSide, shortSide, citySpread);
    scene.add(lightSettings.getAmbientLight());
    scene.add(lightSettings.getDirectionalLight());
    scene.add(lightSettings.getDirectionalLightHelper());

    const visualControls = new VisualControls(renderer.getRenderer(), longSide, shortSide, citySpread);

    renderer.getRenderer().render(scene, visualControls.getCamera());

    window.onresize = () => {
        renderer.getRenderer().setPixelRatio(window.devicePixelRatio);
        renderer.getRenderer().setSize(window.innerWidth, window.innerHeight);
        visualControls.getCamera().aspect = window.innerWidth / window.innerHeight;
        visualControls.getCamera().updateProjectionMatrix();
    };

    // Create Plane
    const plane = new Plane(longSide, shortSide, citySpread);
    scene.add(plane.getPlane());

    // Create Buildings
    const group = new THREE.Group();
    const listOfBuildings = new ListOfBuildings();
    DATA.forEach((obj, index) => {
        listOfBuildings.addBuilding(
            new Building(
                obj.buildingId,
                obj,
                citySpread * (index % shortSide),
                obj.value / 10 / 2,
                Math.floor(index / shortSide) * citySpread,
                obj.value / 10
            )
        );
    });
    listOfBuildings.list.forEach(building => {
        group.add(building.box);
    })
    console.log(listOfBuildings);
    scene.add(group);
    let highestBuilding = listOfBuildings.getHighestBuilding();
    console.log('Highest Building: %s', highestBuilding);

    // GUI
    const gui = new GUI(group, highestBuilding);

    // Mouse Interaction
    const mouseControls = new MouseControls(document, visualControls.getCamera(), scene);

    // Animation Function
    function animate(time) {
        renderer.getRenderer().render(scene, visualControls.getCamera());
    }
    renderer.getRenderer().setAnimationLoop(animate);
}
