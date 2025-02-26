import GSAP from "gsap";
import * as THREE from "three";
import Experience from "../Exp";

export default class Enviroment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // this.gui = new GUI({ container: document.querySelector(".hero-main") });
    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };

    this.setSunlight();
    // this.setGUI();
  }

  setGUI() {
    this.gui.addColor(this.obj, "colorObj").onChange(() => {
      this.sunlight.color.copy(this.obj.colorObj);
      this.ambientLight.color.copy(this.obj.colorObj);
      console.log(this.obj.colorObj);
    });
    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
      this.sunlight.intensity = this.obj.intensity;
      this.ambientLight.intensity = this.obj.intensity;
    });
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 20;
    this.sunlight.shadow.mapSize.set(2048, 2048);
    this.sunlight.shadow.normalBias = 0.05;
    // const helper = new THREE.CameraHelper(this.sunlight.shadow.camera);
    // this.scene.add(helper);
    this.sunlight.position.set(1.5, 6, 3);
    this.scene.add(this.sunlight);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunlight.color, {
        r: 0.2784313725490196,
        g: 0.19215686274509805,
        b: 0.6274509803921569,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.2784313725490196,
        g: 0.19215686274509805,
        b: 0.6274509803921569,
      });
      GSAP.to(this.sunlight, {
        intensity: 1.5,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1.5,
      });
    } else {
      GSAP.to(this.sunlight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunlight, {
        intensity: 3,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.5,
      });
    }
  }

  resize() {}

  update() {}
}
