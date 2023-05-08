import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.circleFirst = this.experience.world.floor.circleFirst;

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
        this.firstSection = new GSAP.timeline({
            scrollTrigger: {
                trigger: ".first",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        }).to(this.circleFirst.scale, {
            x: 0,
            y: 0,
            z: 0
        }).to('.hud-wrapper', {
            opacity: 0,
        });
    }

    resize() {
    }

    update() {
    }
}