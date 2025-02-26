import * as THREE from "three";
import Camera from "../Exp/Utils/Camera.js";
import Sizes from "../Exp/Utils/Sizes.js";
import Preloader from "./Preloader.js";
import Theme from "./Theme.js";
import Resources from "./Utils/Resources.js";
import Time from "./Utils/Time.js";
import assets from "./Utils/assets.js";

import Renderer from "./Utils/Renderer.js";
import Controls from "./World/Controls.js";
import World from "./World/World.js";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();

    this.preloader.on("enablecontrols", () => {
      this.controls = new Controls();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("update", () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.preloader.update();
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
}
