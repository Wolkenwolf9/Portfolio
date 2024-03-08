import GSAP from "gsap";
import * as THREE from "three";
import Experience from "../Exp";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      if (child.name === "Computer") {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      if (child.name === "Mini_Floor") {
        child.position.x = -0.978692;
        child.position.z = 11.0816;
      }

      if (
        child.name === "Mailbox" ||
        child.name === "FloorFirst" ||
        child.name === "FloorSecond" ||
        child.name === "FloorThird"
      ) {
        child.scale.set(0, 0, 0);
      }
    });
    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);

    this.pointLight = new THREE.PointLight(0xffffff, 2, 10);
    this.pointLight.position.set(5, 1, -5);
    this.actualRoom.add(this.pointLight);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.actualRoom.rotation.y = this.lerp.current;
  }
}
