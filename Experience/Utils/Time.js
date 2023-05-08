import { EventEmitter } from 'events';
import Stats from 'stats.js';
import Experience from "../Experience.js";

export default class Time extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;
        this.animationFrameId = null;
        this.canvas = this.experience.canvas;

        this.fpsTracker();
        
        this.setCanvasObserver();
    }

    setCanvasObserver() {
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.update();
                    console.log(`voltou`)
                    
                } else {
                    this.stopUpdating();
                    console.log(`parou`)
                }
            });
        });

        this.observer.observe(this.canvas);
    }

    fpsTracker() {
        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        /*  document.body.appendChild(this.stats.dom); */
    }

    update() {
        /*    this.stats.update(); */ //fps tracker

        /* console.log(`updating`) */ // viewport redering

        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        this.emit('update');
        this.animationFrameId = window.requestAnimationFrame(() => this.update());
    }

    stopUpdating() {
        window.cancelAnimationFrame(this.animationFrameId);
    }
}