import Experience from "../Experience";
import GSAP from "gsap";
import ASScroll from "@ashthornton/asscroll";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.observer = this.experience.observer;
    this.room = this.experience.world.room.actualRoom;
    this.roomLight = this.experience.world.room.rectLight;
    this.circle = this.experience.world.floor.circle;
    this.canvasVisible = false;
    this.firstSection = null;

    GSAP.registerPlugin(ScrollTrigger);

    this.setSmoothScroll();
    this.setScrollTrigger();
    this.setCanvasObserver();
  }

  setupASScroll() {
    const asscroll = new ASScroll({
      ease: 0.1,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      "(min-width: 969px)": () => {
        this.room.scale.set(0.9, 0.9, 0.9);
        this.circle.scale.set(0.4, 0.4, 0.4);
        this.roomLight.intensity = 5;

        this.firstSection = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".home",
            start: "top top",
            end: "bottom top",
            scrub: true,
            /* markers: true, */
            invalidateOnRefresh: true,
            onEnterBack: ({ progress, direction, isActive }) =>
              console.log(progress, direction, isActive),
          },
        })
          .to(this.circle.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(".scroll-down-wrapper", {
            opacity: 0,
          });
      },

      "(max-width: 968px)": () => {
        this.room.scale.set(0.65, 0.65, 0.65);
        this.roomLight.intensity = 2;
        if (this.circle) {
          this.circle.scale.set(0, 0, 0);
        }
      },

      "(max-width: 600px)": () => {
        this.room.scale.set(0.6, 0.6, 0.6);
        this.camera.orthographicCamera.position.y = 3.3;
        this.camera.orthographicCamera.position.x = 0.07;
      },

      all: () => {},
    });
  }

  setCanvasObserver() {
    this.observer.on("canvasVisible", (visible) => {
      this.canvasVisible = visible;
      if (this.canvasVisible) {
        if (this.firstSection) {
          this.firstSection.scrollTrigger.enable();
          console.log("aaaaa");
        }
      } else {
        if (this.firstSection) {
          this.firstSection.scrollTrigger.disable();
          console.log("bbbb");
        }
      }
    });
  }

  resize() {}

  update() {}
}
