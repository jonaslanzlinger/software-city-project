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
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // Build Light Settings
    const lightSettings = new LightSettings(longSide, shortSide, citySpread);
    scene.add(lightSettings.getAmbientLight());
    scene.add(lightSettings.getDirectionalLight());
    scene.add(lightSettings.getDirectionalLightHelper());
    scene.add(lightSettings.getDirectionalLightShadowHelper());

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
    let buildingId = 0;
    DATA.forEach((data, index) => {
        console.log(data.avgEyeFixationDuration);
        listOfBuildings.addBuilding(

            // Constructor for structure:
            //    - className
            //    - commentLinesOfCode
            //    - javadocLinesOfCode
            //    - linesOfCode
            //    - avgEyeFixationDuration
            new Building(
                buildingId,
                data,
                citySpread * (index % shortSide),
                normalizeToScale(data.avgEyeFixationDuration) / 2,
                Math.floor(index / shortSide) * citySpread,
                normalizeToScale(data.avgEyeFixationDuration)
            )
        );
        buildingId++;
    });
    listOfBuildings.list.forEach(building => {
        group.add(building);
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
