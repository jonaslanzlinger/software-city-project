import * as THREE from 'three';

class Color extends THREE.Color {

   constructor(color) {
      super();
      this.setColor(color);
   }

   setColor(color) {
      this.setHSL(color.h, color.s, color.l);
   }

   getHsl() {
      let hsl = { h: 0, s: 0, l: 0 };
      return this.getHSL(hsl);
   }

   getRgb() {
      let rgb = { r: 0, g: 0, b: 0 };
      return this.getRGB(rgb);
   }

   getLuminance() {
      return this.getHsl().l;
   }

}

export { Color }