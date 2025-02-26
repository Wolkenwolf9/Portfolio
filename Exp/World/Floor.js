import * as THREE from "three";
import Experience from "../Exp";
export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 64);
    const material = new THREE.MeshStandardMaterial({ color: 0xbb82fd });
    const material2 = new THREE.MeshStandardMaterial({ color: 0xb83b5e });
    const material3 = new THREE.MeshStandardMaterial({ color: 0xf08a5d });
    this.circleFirst = new THREE.Mesh(geometry, material);
    this.circleSecond = new THREE.Mesh(geometry, material2);
    this.circleThird = new THREE.Mesh(geometry, material3);

    this.circleFirst.position.y = -0.29;

    this.circleSecond.position.y = -0.28;
    this.circleSecond.position.x = 1.8;

    this.circleThird.position.y = -0.27;
    this.circleThird.position.x = 1.9;

    this.circleFirst.scale.set(0, 0, 0);
    this.circleSecond.scale.set(0, 0, 0);
    this.circleThird.scale.set(0, 0, 0);
    this.circleFirst.rotation.x = -Math.PI / 2;
    this.circleSecond.rotation.x = -Math.PI / 2;
    this.circleThird.rotation.x = -Math.PI / 2;
    this.circleFirst.receiveShadow = true;
    this.circleSecond.receiveShadow = true;
    this.circleThird.receiveShadow = true;
    this.scene.add(this.circleFirst);
    this.scene.add(this.circleSecond);
    this.scene.add(this.circleThird);
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.3;
    this.plane.receiveShadow = true;
  }

  resize() {}

  update() {}
}
