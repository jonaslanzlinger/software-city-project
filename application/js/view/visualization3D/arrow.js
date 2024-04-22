import * as THREE from 'three';

const arrowDirection = new THREE.Vector3(0, -1, 0).normalize();
const arrowLength = 4;
const arrowOrigin = new THREE.Vector3(0, 0, 0);
const arrowHexColor = 0xff0000;
let arrowObject = new THREE.ArrowHelper(arrowDirection, arrowOrigin, arrowLength, arrowHexColor);

const drawArrow = (element) => {
   let x = element.position.x;
   let y = element.position.y + (element.scale.y / 2) + arrowLength + 0.2;
   let z = element.position.z;
   arrowObject.position.set(x, y, z);
   element.parent.add(arrowObject);
}

const removeArrow = () => {
   if (arrowObject.parent !== null) {
      arrowObject.parent.remove(arrowObject);
   }
}

export { drawArrow, removeArrow }
