import EventEmitter from "events";

export default class Dropdown extends EventEmitter {
  constructor() {
    super();
  }

  set() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
      this.select = dropdown.querySelector(".select");
      this.caret = dropdown.querySelector(".caret");
      this.menu = dropdown.querySelector(".menu");
      this.selected = dropdown.querySelector(".selected");
      this.menuOpened = false;
      const options = dropdown.querySelectorAll(".menu li");
      this.clickOutListener = this.clickOut.bind(this);

      this.select.addEventListener("click", this.toggleDropdown.bind(this));

      options.forEach((option) => {
        option.addEventListener("click", () => {
          this.selected.innerText = option.innerText;
          this.select.classList.remove("select-clicked");
          this.caret.classList.remove("caret-rotate");
          this.menu.classList.remove("menu-open");
          document.removeEventListener("click", this.clickOutListener);
          this.menuOpened = false;

          const serviceSelected = this.get();

          if (
            !(
              serviceSelected == "Preciso de ajuda com um projeto único" ||
              serviceSelected == "Procurando uma parceria de longo prazo" ||
              serviceSelected == "Contratar tempo integral" ||
              serviceSelected == "Apenas um olá!"
            )
          ) {
            this.emit("servicechange", true);
            this.error();
          } else {
            this.emit("servicechange", false);
            this.clear();
          }

          options.forEach((option) => {
            option.classList.remove("active");
          });
          option.classList.add("active");
        });
      });
    });
  }

  toggleDropdown() {
    this.menuOpened = !this.menuOpened;
    this.select.classList.toggle("select-clicked");
    this.caret.classList.toggle("caret-rotate");
    this.menu.classList.toggle("menu-open");
    if (this.menuOpened) {
      document.addEventListener("click", this.clickOutListener);
    } else {
      document.removeEventListener("click", this.clickOutListener);
    }
  }

  clickOut(event) {
    const targetElement = event.target;

    if (
      !this.menu.contains(targetElement) &&
      !this.select.contains(targetElement)
    ) {
      if (!this.select.contains(targetElement)) {
        this.menuOpened = false;
        this.select.classList.remove("select-clicked");
        this.caret.classList.remove("caret-rotate");
        this.menu.classList.remove("menu-open");
        document.removeEventListener("click", this.clickOutListener);
      }
    }
  }

  get() {
    return this.selected.innerText;
  }

  error() {
    this.select.classList.add("wrong");
  }

  clear() {
    this.select.classList.remove("wrong");
  }
}