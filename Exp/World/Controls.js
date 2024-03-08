import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

import Experience from "../Exp";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();

    // this.progress = 0;
    // this.dummyVector = new THREE.Vector3(0, 0, 0);

    // this.position = new THREE.Vector3(0, 0, 0);
    // this.lookAtPosition = new THREE.Vector3(0, 0, 0);

    // this.directionalVector = new THREE.Vector3(0, 0, 0);
    // this.staticVector = new THREE.Vector3(0, -1, 0);
    // this.crossVector = new THREE.Vector3(0, 0, 0);

    // this.setPath();
    // this.onWheel();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      //Desktop
      "(min-width: 969px)": () => {
        // console.log("fired Desktop");

        this.room.scale.set(0.11, 0.11, 0.11);
        // First section -----------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0011;
          },
        });

        // Second section -----------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.position,
            {
              x: () => {
                return 1;
              },
              z: () => {
                return this.sizes.height * 0.0032;
              },
            },
            "same"
          )
          .to(
            this.room.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
            },
            "same"
          );

        // Third section -----------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }).to(this.camera.orthographicCamera.position, {
          // x: -4.1,
          // y: 1.5,
          x: () => {
            // Berechnen Sie die x-Position relativ zur Bildschirmbreite
            return -0.002 * this.sizes.width;
          },
          y: () => {
            // Berechnen Sie die y-Position relativ zur Bildschirmhöhe
            return 0.0013 * this.sizes.height;
          },
          z: 10,
        });
      },
      //Mobile
      "(max-width: 969px)": () => {
        // console.log("fired Mobile");

        // Resets
        this.room.scale.set(0.07, 0.07, 0.07);
        this.room.position.set(0, 0, 0);

        // First section -----------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }).to(this.room.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        });
        // Second section -----------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25,
            },
            "same"
          )
          .to(
            this.room.position,
            {
              x: 2.5,
            },
            "same"
          );
        // Third section -----------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }).to(this.camera.orthographicCamera.position, {
          x: 0.9,
          y: -0.5,
        });
      },

      // All
      all: () => {
        //Mini Platform Animations
        this.secondPartTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "center center",
          },
        });

        this.room.children.forEach((child) => {
          if (child.name == "Mini_Floor") {
            this.first = GSAP.to(child.position, {
              x: -7.1964,
              z: 17.2994,
              duration: 0.3,
            });
          }
          if (child.name == "Mailbox") {
            this.second = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(3)",
              duration: 0.3,
            });
          }
          if (child.name == "FloorFirst") {
            this.third = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(3)",
              duration: 0.3,
            });
          }
          if (child.name == "FloorSecond") {
            this.fourth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(3)",
              duration: 0.3,
            });
          }
          if (child.name == "FloorThird") {
            this.fifth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(3)",
              duration: 0.3,
            });
          }
        });
        this.secondPartTimeline.add(this.first);
        this.secondPartTimeline.add(this.second);
        this.secondPartTimeline.add(this.third);
        this.secondPartTimeline.add(this.fourth);
        this.secondPartTimeline.add(this.fifth);
      },
    });
  }

  resize() {}

  update() {}
}
