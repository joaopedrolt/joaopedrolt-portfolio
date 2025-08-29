export default class TextSwitcher {
  constructor() {
    this.containerID = document.getElementById("text-container");
    this.textID = document.getElementById("switching-text");
    this.ghostID = document.getElementById("ghost-text");
    this.texts = ["Developer", "Freelancer", "Engineer"];
    this.counter = 1;
    this.switchingDelay = 4000;

    // Only initialize if the required elements exist on the page
    if (this.textID && this.ghostID) {
      this.interval = setInterval(() => {
        this.switchText();
      }, this.switchingDelay);
    }
  }

  switchText() {
    if (!this.textID || !this.ghostID) return;
    this.textID.classList.add("switching");

    if (this.counter == 2) {
      this.ghostID.classList.add("small");
    } else {
      this.ghostID.classList.remove("small");
    }

    this.textID.textContent = this.texts[this.counter];
    this.ghostID.textContent = this.texts[this.counter];

    setTimeout(() => {
      if (this.textID) this.textID.classList.remove("switching");
    }, 1000);

    if (this.counter != 2) {
      this.counter += 1;
    } else {
      this.counter = 0;
    }
  }
}