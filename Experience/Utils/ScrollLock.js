export default class ScrollLock {
  constructor() {
    this.supportsPassive();
    this.page = document.getElementById("page");
  }

  keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  wheelOpt = this.supportsPassive ? { passive: false } : false;
  wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  supportsPassive() {
    this.supportsPassive = false;
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function () {
            this.supportsPassive = true;
          },
        })
      );
    } catch (e) {}
  }

  preventDefault(e) {
    e.preventDefault();
  }

  preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  disableScroll() {
    this.page.addEventListener("DOMMouseScroll", this.preventDefault, false); // older FF
    this.page.addEventListener(
      this.wheelEvent,
      this.preventDefault,
      this.wheelOpt
    ); 
    this.page.addEventListener("touchmove", this.preventDefault, this.wheelOpt); // mobile
    this.page.addEventListener("keydown", this.preventDefaultForScrollKeys, false);
  }

  enableScroll() {
    this.page.removeEventListener("DOMMouseScroll", this.preventDefault, false);
    this.page.removeEventListener(
      this.wheelEvent,
      this.preventDefault,
      this.wheelOpt
    );
    this.page.removeEventListener("touchmove", this.preventDefault, this.wheelOpt);
    this.page.removeEventListener(
      "keydown",
      this.preventDefaultForScrollKeys,
      false
    );
  }
}
