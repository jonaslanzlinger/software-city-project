import * as THREE from "three";

class Renderer {
   constructor() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(new THREE.Color("hsl(0, 0%, 80%)"));
      // This is for VR Button
      this.renderer.xr.enabled = true;
   }

   getRenderer() {
      return this.renderer;
   }
}

export { Renderer }