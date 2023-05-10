import Experience from "../Experience";
import GSAP from "gsap";
import ASScroll from "@ashthornton/asscroll";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;

    this.circle = this.experience.world.floor.circle;

    GSAP.registerPlugin(ScrollTrigger);

    this.setSmoothScroll();
    this.setScrollTrigger();
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
        this.firstSection = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".intro",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
          .to(this.circle.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(".hud-wrapper", {
            opacity: 0,
          });
      },

      "(max-width: 968px)": () => {
        this.room.scale.set(0.65, 0.65, 0.65);
      },

      "(max-width: 600px)": () => {
        this.room.scale.set(0.6, 0.6, 0.6);
        this.camera.orthographicCamera.position.y = 3.3;
        this.camera.orthographicCamera.position.x = 0.07;
      },

      all: () => {},
    });
  }

  resize() {}

  update() {}
}
