import Experience from "../Exp";
export default class Wolrd {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
  }

  resize() {}

  update() {}
}
