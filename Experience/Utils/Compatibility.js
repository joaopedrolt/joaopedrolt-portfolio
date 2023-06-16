import { EventEmitter } from "events";

export default class Compatibility extends EventEmitter {
  constructor() {
    super();
    this.userAgent = navigator.userAgent;
    this.regexp = /android|iphone|kindle|ipad/i;

    if (window.innerWidth > 1100) {
      this.probablyDesktop = true;
    } else {
      this.probablyDesktop = false;
    }

    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };

    this.checkDevice();
  }

  checkDevice() {
    if (window.innerWidth <= 968) {
      this.isMobileDevice = true;
    } else {
      this.isMobileDevice = false;
    }
  }

  resize() {
    if (window.innerWidth <= 968 && !this.isMobileDevice) {
      this.isMobileDevice = true;
      this.emit("switchdevice", this.isMobileDevice);
    } else if (!(window.innerWidth <= 968) && this.isMobileDevice) {
      this.isMobileDevice = false;
      this.emit("switchdevice", this.isMobileDevice);
    }
  }
}