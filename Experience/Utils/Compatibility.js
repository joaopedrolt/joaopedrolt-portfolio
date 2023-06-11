import { EventEmitter } from "events";

export default class Compatibility extends EventEmitter {
  constructor() {
    super();
    this.userAgent = navigator.userAgent;
    this.regexp = /android|iphone|kindle|ipad/i;

    this.checkUserAgent();
  }

  checkUserAgent() {
    if (this.regexp.test(this.userAgent) || window.innerWidth <= 968) {
      this.isMobileDevice = true;
    } else {
      this.isMobileDevice = false;
    }
  }

  resize() {
    if (
      (this.regexp.test(this.userAgent) || window.innerWidth <= 968) &&
      this.isMobileDevice == false
    ) {
      this.isMobileDevice = true;
      this.emit("switchdevice", this.isMobileDevice);
    } else if (
      !(this.regexp.test(this.userAgent) || window.innerWidth <= 968) &&
      this.isMobileDevice == true
    ) {
      this.isMobileDevice = false;
      this.emit("switchdevice", this.isMobileDevice);
    }

    if (this.width <= 968 && this.isMobileDevice !== false) {
      this.device = "mobile";
      this.emit("switchdevice", this.device);
    } else if (this.width > 968 && this.isMobileDevice !== true) {
      this.device = "desktop";
      this.emit("switchdevice", this.device);
    }
  }
}
