import * as THREE from 'three';

export class MouseControls {

    constructor(document, camera, scene) {
        this.addMouseInteractions(document, camera, scene);
    }

    addMouseInteractions(document, camera, scene) {

        // Mouse Click
        document.addEventListener('mousedown', onMouseClick);
        function onMouseClick(event) {
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children);

            for (const element of intersects) {
                if (element.object.geometry.type == "BoxGeometry") {
                    console.log(element.object);
                    break;
                }
            }
        }

        // Mouse Hover
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
                    // let color = obj.object.material.color;
                    // color.r = 1 - color.r;
                    // color.g = 1 - color.g;
                    // color.b = 1 - color.b;
                    // obj.object.material.color.set(color);

                    // now, just make hovered elements brighter
                    let color = obj.object.material.color;
                    color.r *= 1.3;
                    color.g *= 1.3;
                    color.b *= 1.3;
                    obj.object.material.color.set(color)

                    break;
                }
            }
        }
    }
}