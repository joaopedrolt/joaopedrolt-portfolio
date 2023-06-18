import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convertDiv from "./Utils/divsToSpans";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.time = this.experience.time;
    this.alert = this.experience.alert;
    this.alertShown = false;
    this.camera = this.experience.camera;
    this.compatibility = this.experience.compatibility;
    this.world = this.experience.world;
    this.device = this.compatibility.isMobileDevice;
    this.lockDeviceChange = true;
    this.deviceChangedWhilePlaying = false;
    this.killTimelines = false;

    this.compatibility.on("switchdevice", (newDevice) => {
      if (this.playingIntro) {
        this.deviceChangedWhilePlaying = true;
        this.device = newDevice;
      }

      if (!this.lockDeviceChange) {
        if (this.device != newDevice) {
          if (!newDevice) {
            this.room.position.set(-1, 0, 0);
            this.device = newDevice;
          } else {
            this.room.position.set(-0.05, 0, -1);
            this.device = newDevice;
          }
        }
      }
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });

    this.time.on("lowperformance", () => {
      this.lowPerformance = true;

      if (!this.alertShown) {
        this.alert.showAlert();
        this.alertShown = true;
      }

      this.removeEventListeners();
    });

    this.alert.on("safeButton", () => {
      this.handleSafeButton();
    });
  }

  setAssets() {
    convertDiv(document.getElementById("intro"));

    convertDiv(document.getElementById("top-title-top"));
    convertDiv(document.getElementById("top-title-bottom"));

    convertDiv(document.getElementById("bottom-title-top"));
    convertDiv(document.getElementById("bottom-title-middle"));
    convertDiv(document.getElementById("bottom-title-bottom"));

    document.querySelector(".page-wrapper").style = "";

    this.room = this.world.room.actualRoom;
    this.roomMeshes = this.world.room.roomMeshes;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();

      this.playingIntro = true;
      this.timeline.set(".animatedivs", { y: 0, yPercent: 200 });

      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });

      if (!this.killTimelines) {
        if (!this.device) {
          this.timeline
            .to(this.roomMeshes.loadcube.scale, {
              x: 0.1877988576889038,
              y: 0.1877988576889038,
              z: 0.1877988576889038,
              ease: "back.out(2.5)",
              duration: 0.7,
            })
            .to(this.room.position, {
              x: -1.07,
              ease: "power1.out",
              duration: 0.7,
            });
        } else {
          this.timeline
            .to(this.room.position, {
              x: -0.05,
              duration: 0.1,
            })
            .to(this.roomMeshes.loadcube.scale, {
              x: 0.2,
              y: 0.2,
              z: 0.2,
              ease: "back.out(2.5)",
              duration: 0.7,
            })
            .to(this.room.position, {
              z: -1.07,
              ease: "power1.out",
              duration: 0.7,
            });
        }

        this.timeline
          .to(".intro .animatedivs", {
            yPercent: 0,
            stagger: 0.05,
            ease: "back.out(1.7)",
          })
          .to(".scroll-down-wrapper", {
            opacity: 1,
            onComplete: resolve,
          });
      } else {
        resolve();
      }
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();

      if (!this.killTimelines) {
        if (!this.device) {
          this.secondTimeline
            .to(".intro .animatedivs", {
              yPercent: 200,
              stagger: 0.05,
              ease: "back.in(1.7)",
            })
            .to(".scroll-down-wrapper", {
              opacity: 0,
            })
            .to(
              this.camera.orthographicCamera.position,
              {
                y: 3.2,
                z: 5,
              },
              "same"
            )
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
        } else {
          this.secondTimeline
            .to(".intro .animatedivs", {
              yPercent: 100,
              stagger: 0.05,
              ease: "back.in(1.7)",
            })
            .to(".scroll-down-wrapper", {
              opacity: 0,
            })
            .to(
              this.camera.orthographicCamera.position,
              {
                y: 3.05,
                x: 0.07,
              },
              "same"
            )
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
        }
      } else {
        resolve();
      }
    });
  }

  thirdIntro() {
    return new Promise((resolve) => {
      this.thirdTimeline = new GSAP.timeline();

      const circleDesktopParams = {
        x: 0.4,
        y: 0.4,
        z: 0.4,
        ease: "power2.out",
        duration: 0.5,
      };

      if (!this.killTimelines) {
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
            },
            "chair"
          )
          .to(
            this.roomMeshes.floorCircle.scale,
            !this.compatibility.isMobileDevice
              ? circleDesktopParams
              : { x: 0, y: 0, z: 0 },
            "chair"
          )
          .to(
            "#bottom-title-top .animatedivs",
            {
              yPercent: 0,
              stagger: 0.05,
              ease: "back.out(1.7)",
            },
            "title"
          )
          .to(
            "#bottom-title-middle .animatedivs",
            {
              yPercent: 0,
              stagger: 0.05,
              ease: "back.out(1.7)",
            },
            "title"
          )
          .to(
            "#bottom-title-bottom .animatedivs",
            {
              yPercent: 0,
              stagger: 0.05,
              ease: "back.out(1.7)",
            },
            "title"
          )
          .to(
            "#top-title-top .animatedivs",
            {
              yPercent: 0,
              stagger: 0.05,
              ease: "back.out(1.7)",
            },
            "title"
          )
          .to(
            "#top-title-bottom .animatedivs",
            {
              yPercent: 0,
              stagger: 0.05,
              ease: "back.out(1.7)",
            },
            "title"
          )
          .to(
            "#top-title-bottom .animatedivs",
            {
              yPercent: 0,
              stagger: 0.05,
              ease: "back.out(1.7)",
            },
            "title"
          )
          .to(".scroll-down-wrapper", {
            opacity: 1,
            duration: 0.5,
            onComplete: resolve,
          });
      } else {
        resolve();
      }
    });
  }

  staticIntro() {
    return new Promise((resolve) => {
      this.staticTimeline = new GSAP.timeline();

      this.staticTimeline
        .to(
          "#bottom-title-top .animatedivs",
          {
            yPercent: 0,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "title"
        )
        .to(
          "#bottom-title-middle .animatedivs",
          {
            yPercent: 0,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "title"
        )
        .to(
          "#bottom-title-bottom .animatedivs",
          {
            yPercent: 0,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "title"
        )
        .to(
          "#top-title-top .animatedivs",
          {
            yPercent: 0,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "title"
        )
        .to(
          "#top-title-bottom .animatedivs",
          {
            yPercent: 0,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "title"
        )
        .to(
          "#top-title-bottom .animatedivs",
          {
            yPercent: 0,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "title"
        )
        .to(".scroll-down-wrapper", {
          opacity: 1,
          duration: 0.5,
          onComplete: resolve,
        });
    });
  }

  safeMeshesMode() {
    return new Promise((resolve) => {
      var currentIndex = 0;
      const lastIndex = Object.keys(this.roomMeshes).length - 1;

      for (var mesh in this.roomMeshes) {
        if (this.roomMeshes.hasOwnProperty(mesh)) {
          if (this.roomMeshes[mesh].name != "loadcube") {
            this.roomMeshes[mesh].scale.set(1, 1, 1);

            if (this.roomMeshes[mesh].name == "") {
              if (!this.device) {
                this.roomMeshes[mesh].scale.set(0.4, 0.4, 0.4);
              } else {
                this.roomMeshes[mesh].scale.set(0, 0, 0);
              }
            }
          } else if (this.roomMeshes[mesh].name == "loadcube") {
            this.roomMeshes[mesh].scale.set(0, 0, 0);
          }

          if (currentIndex == lastIndex) {
            setTimeout(() => {
              resolve();
            }, 1000);
          } else {
            currentIndex++;
          }
        }
      }
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
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.intialY = null;
  }

  onClick(e) {
    if (e.target) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
    window.removeEventListener("click", this.click);
  }

  async playIntro() {
    await this.firstIntro();
    this.playingIntro = false;

    if (this.deviceChangedWhilePlaying) {
      if (!this.device) {
        this.room.position.x = -1;
        this.room.position.z = 0;
      } else {
        this.room.position.x = 0;
        this.room.position.z = -1;
      }
    }

    this.lockDeviceChange = false;

    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    this.click = this.onClick.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
    window.addEventListener("click", this.click);
  }

  async playSecondIntro() {
    this.lockDeviceChange = true;
    await this.secondIntro();
    this.playThirdIntro();
  }

  async playThirdIntro() {
    await this.thirdIntro();
    this.emit("enablecontrols");
  }

  async handleSafeButton() {
    this.killTimelines = true;

    document.querySelector(".intro").remove();

    if (this.timeline) {
      this.timeline.kill();
    }

    if (this.secondTimeline) {
      this.timeline.kill();
    }

    if (this.thirdTimeline) {
      this.timeline.kill();
    }

    this.time.update();

    if (!this.device) {
      this.camera.orthographicCamera.position.set(0.04, 3.2, 5);
      this.room.position.set(0, 0, 0);
    } else {
      console.log(`device`);
      this.camera.orthographicCamera.position.set(0.07, 3.05, 5);
      this.room.position.set(0, 0, 0);
    }

    await this.safeMeshesMode();

    this.time.stopUpdating();

    await this.staticIntro();

    this.emit("enablecontrols");
  }

  resize() {}
}
