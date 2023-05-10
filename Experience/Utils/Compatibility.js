export default class Compatibility {
  constructor() {
    this.userAgent = navigator.userAgent;
    this.regexp = /android|iphone|kindle|ipad/i;

    this.checkUserAgent();
  }

  checkUserAgent() {
    this.isMobileDevice = this.regexp.test(this.userAgent);
  }
}
