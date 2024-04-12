import * as THREE from "three";
import { addRenderer } from "../data";
import { Color } from "../Color";

class Renderer extends THREE.WebGLRenderer {

   constructor() {
      super({ antialias: true });
      this.setSize(window.innerWidth, window.innerHeight);
      this.shadowMap.enabled = true;
      this.shadowMap.type = THREE.PCFSoftShadowMap;
      this.setClearColor(new Color({ h: 0, s: 0, l: 0.8 }));
      // This is for VR Button
      this.xr.enabled = true;

      // append this renderer to the list of renderers in the dataStore
      addRenderer(this);
   }

}

export { Renderer }