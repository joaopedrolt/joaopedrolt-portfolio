export default class ScrollLock {
  constructor() {
    this.supportsPassive();
  }

  keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  wheelOpt = this.supportsPassive ? { passive: false } : false;
  wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

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
    window.addEventListener("DOMMouseScroll", this.preventDefault, false); // older FF
    window.addEventListener(
      this.wheelEvent,
      this.preventDefault,
      this.wheelOpt
    );
    window.addEventListener("touchmove", this.preventDefault, this.wheelOpt); // mobile
    window.addEventListener("keydown", this.preventDefaultForScrollKeys, false);
  }

  enableScroll() {
    window.removeEventListener("DOMMouseScroll", this.preventDefault, false);
    window.removeEventListener(
      this.wheelEvent,
      this.preventDefault,
      this.wheelOpt
    );
    window.removeEventListener("touchmove", this.preventDefault, this.wheelOpt);
    window.removeEventListener(
      "keydown",
      this.preventDefaultForScrollKeys,
      false
    );
  }
}