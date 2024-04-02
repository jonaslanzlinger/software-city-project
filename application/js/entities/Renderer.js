import * as THREE from "three";

class Renderer {
   constructor() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      // this.renderer.setClearColor(0x2a2a2a);
      this.renderer.setClearColor(0xDDDDDD);
      // This is for VR Button
      this.renderer.xr.enabled = true;
   }

   getRenderer() {
      return this.renderer;
   }
}

export { Renderer }