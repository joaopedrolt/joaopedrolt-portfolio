export default class TextSwitcher {
  constructor() {
    this.containerID = document.getElementById("text-container");
    this.textID = document.getElementById("switching-text");
    this.ghostID = document.getElementById("ghost-text");
    this.texts = ["Developer", "Freelancer", "Engineer"];
    this.counter = 1;
    this.switchingDelay = 4000;

    setInterval(() => {
      this.switchText();
    }, 4000);
  }

  switchText() {
    this.textID.classList.add("switching");

    if (this.counter == 2) {
      this.ghostID.classList.add("small");
    } else {
      this.ghostID.classList.remove("small");
    }

    this.textID.textContent = this.texts[this.counter];
    this.ghostID.textContent = this.texts[this.counter];

    setTimeout(() => {
      this.textID.classList.remove("switching");
    }, 1000);

    if (this.counter != 2) {
      this.counter += 1;
    } else {
      this.counter = 0;
    }
  }
}
