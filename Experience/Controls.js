import Experience from "./Experience";
import GSAP from "gsap";
import ASScroll from "@ashthornton/asscroll";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.preloader = this.experience.preloader;
    this.world = this.experience.world;
    this.camera = this.experience.camera;
    this.observer = this.experience.observer;
    this.canvasVisible = false;
    this.firstSection = null;
    this.loaded = false;

    GSAP.registerPlugin(ScrollTrigger);

    this.world.on("worldready", () => {
      this.room = this.experience.world.room.actualRoom;
      this.circle = this.experience.world.floor.circle;
      this.setScrollTrigger();
    });

    this.preloader.on("enablecontrols", () => {
      this.loaded = true;
    });

    this.setSmoothScroll();
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
      this.asscroll.disable();
    });

    return asscroll;
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  enableScroll() {
    requestAnimationFrame(() => {
      this.asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      "(min-width: 969px)": () => {
        this.room.scale.set(0.9, 0.9, 0.9);

        if (this.loaded) {
          this.circle.scale.set(0.4, 0.4, 0.4);
        }

        this.firstSection = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".home",
            start: "top top",
            end: "bottom top",
            scrub: true,
            /* markers: true, */
            invalidateOnRefresh: true,
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
        this.room.scale.set(0.6, 0.6, 0.6);

        if (this.circle) {
          this.circle.scale.set(0, 0, 0);
        }
      },

      "(max-width: 600px)": () => {
        this.camera.orthographicCamera.position.y = 3.3;
        this.camera.orthographicCamera.position.x = 0.07;
      },

      all: () => {},
    });
  }

  setCanvasObserver() {
    this.observer.on("canvasVisible", (visible) => {
      this.canvasVisible = visible;
      if (window.innerWidth > 968) {
        if (this.canvasVisible) {
          if (this.firstSection) {
            this.firstSection.scrollTrigger.enable();
          }
        } else {
          if (this.firstSection) {
            this.firstSection.scrollTrigger.disable();
          }
        }
      }
    });
  }

  resize() {}

  update() {}
}
