import EventEmitter from "events";
import Experience from "./Experience";

import GSAP from "gsap";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.compatibility = this.experience.compatibility;
    this.world = this.experience.world;

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    this.controls = this.experience.controls;
    this.room = this.world.room.actualRoom;
    this.roomMeshes = this.world.room.roomMeshes;
    console.log(this.roomMeshes);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();

      if (!this.compatibility.isMobileDevice) {
        this.timeline
          .to(this.roomMeshes.loadcube.scale, {
            x: 0.1877988576889038,
            y: 0.1877988576889038,
            z: 0.1877988576889038,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
            onComplete: resolve,
          });
      } else {
        this.timeline
          .to(this.roomMeshes.loadcube.scale, {
            x: 0.1877988576889038,
            y: 0.1877988576889038,
            z: 0.1877988576889038,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
            onComplete: resolve,
          });
      }
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();

      this.secondTimeline
        .to(
          this.room.position,
          {
            y: 0,
            x: 0,
            z: 0,
            ease: "power1.out",
          },
          "same"
        )
        .to(
          this.roomMeshes.loadcube.rotation,
          {
            y: 2.015 * Math.PI + Math.PI / 4,
          },
          "same"
        )
        .to(
          this.roomMeshes.loadcube.scale,
          {
            x: 1.07592,
            y: 1.07592,
            z: 1.07592,
          },
          "same"
        )
        .to(this.roomMeshes.loadcube.scale, {
          x: 0,
          y: 0,
          z: 0,
          delay: 0.6,
          onComplete: resolve,
        });
    });
  }

  thirdIntro() {
    return new Promise((resolve) => {
      this.thirdTimeline = new GSAP.timeline();

      this.thirdTimeline
        .to(
          this.roomMeshes.room.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "back.out(1.0)",
          },
          "same"
        )
        .to(this.roomMeshes.bed.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.4,
          ease: "back.out(1.0)",
        })
        .to(this.roomMeshes.desk.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.4,
          ease: "back.out(1.0)",
        })
        .to(this.roomMeshes.wardrobe.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.4,
          ease: "back.out(1.0)",
        })
        .to(this.roomMeshes.shelf.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.4,
          ease: "back.out(1.0)",
        })
        .to(
          this.roomMeshes.coffee.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.26,
            ease: "back.out(2.2)",
          },
          "coffee"
        )
        .to(
          this.roomMeshes.bottle.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.26,
            ease: "back.out(2.2)",
          },
          "coffee"
        )
        .to(
          this.roomMeshes.body.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.26,
            ease: "back.out(2.2)",
          },
          "mouse"
        )
        .to(
          this.roomMeshes.mouse.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.26,
            ease: "back.out(2.2)",
          },
          "mouse"
        )
        .to(this.roomMeshes.desktop.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.26,
          ease: "back.out(2.2)",
        })
        .to(this.roomMeshes.screen.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.26,
          ease: "back.out(2.2)",
        })
        .to(
          this.roomMeshes.fio.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.26,
            ease: "back.out(2.2)",
          },
          "phone"
        )
        .to(
          this.roomMeshes.phone.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.26,
            ease: "back.out(2.2)",
          },
          "phone"
        )
        .to(
          this.roomMeshes.book.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.26,
            ease: "back.out(2.2)",
          },
          "access2"
        )
        .to(
          this.roomMeshes.torus.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.26,
            ease: "back.out(2.2)",
          },
          "access1"
        )
        .to(
          this.roomMeshes.bota1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.26,
            ease: "back.out(2.2)",
          },
          "access2"
        )
        .to(
          this.roomMeshes.cap.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.26,
            ease: "back.out(2.2)",
          },
          "access1"
        )
        .to(this.roomMeshes.chairbase.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.26,
          ease: "back.out(2.2)",
        })
        .to(
          this.roomMeshes.chair.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 1,
            ease: "back.out(1.0)",
          },
          "chair"
        )
        .to(
          this.roomMeshes.chair.rotation,
          {
            z: 6.56 * Math.PI + Math.PI / 5,
            ease: "power2.out",
            onComplete: resolve,
          },
          "chair"
        )
        .to(this.roomMeshes.floorCircle.scale, {
          x: 0.4,
          y: 0.4,
          z: 0.4,
          ease: "power2.out",
          duration: 0.5,
        }, "chair");
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      window.removeEventListener("wheel", this.scrollOnceEvent);
      this.playSecondIntro();
    }
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initalY - currentY;
    if (difference > 0) {
      console.log("swipped up");
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.intialY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    await this.firstIntro();
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }

  async playSecondIntro() {
    await this.secondIntro();
    this.playThirdIntro();
  }

  async playThirdIntro() {
    await this.thirdIntro();
    this.controls.enableScroll();
    this.emit("enablecontrols");
  }

  resize() {}
}