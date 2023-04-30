import EventEmitter from "events";
import Experience from "../Experience";

export default class Resources extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        
    }
}