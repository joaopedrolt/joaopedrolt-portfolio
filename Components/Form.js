export default class Form {
  constructor() {
    this.textId = document.getElementById("work-together");
    this.formContainerID = document.getElementById("form-container");

    this.showForm();
  }

  showForm() {
    this.textId.addEventListener("click", () => {
      if (!this.textId.classList.contains("fade-out")) {
        this.textId.classList.add("fade-out");

        setTimeout(() => {
          this.formContainerID.innerHTML = `
          <div class="form" id="form">
          <span>Envie uma mensagem</span>
          <div class="row">
            <div class="input-wrapper">
              <label>Nome</label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome ou nome da empresa"
              />
            </div>
            <div class="input-wrapper">
              <label>E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="Seu e-mail ou e-mail da empresa"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-wrapper">
              <label>Serviço</label>
              <select
                id="service"
                name="service"
                required=""
              >
                <option value="" selected="" disabled="">
                  Qual seria seu interesse?
                </option>
                <option value="Preciso de ajuda com um projeto único">
                  Preciso de ajuda com um projeto único
                </option>
                <option value="Procurando uma parceria de longo prazo">
                  Procurando uma parceria de longo prazo
                </option>
                <option value="Contratar tempo integral">
                  Contratar, tempo integral
                </option>
                <option value="Apenas um olá!">
                  Apenas um olá!
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="input-wrapper">
              <label>Mensagem</label>
              <textarea
                id="message"
                placeholder="Seu e-mail ou e-mail da empresa"
              ></textarea>
            </div>
          </div>
          <div class="button-wrapper">
            <button class="btn" id="btn-send"><i class="fa-solid fa-paper-plane"></i>Enviar Mensagem</button>
          </div>
        </div>`;

          setInterval(() => {
            this.form = document.getElementById("form");
            this.form.classList.add("loaded");
          }, 100);

          this.setFormFields();
          this.resizeTextArea();
        }, 800);
      }
    });
  }

  isEmail(input) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  }

  setFieldsListeners() {
    /* this.nameField.addEventListener("blur", () => {
      if (this.nameField.value.length <= 0) {
        this.nameField.classList.add("wrong");
      } else {
        this.nameField.classList.remove("wrong");
      }
    }); */

    this.emailField.addEventListener("blur", () => {
      const isEmail = this.isEmail(this.emailField.value);
      if (!isEmail) {
        this.emailField.classList.add("wrong");
      } else {
        this.emailField.classList.remove("wrong");
      }
    });

   /*  this.messageField.addEventListener("blur", () => {
      if (this.messageField.value.length <= 0) {
        this.messageField.classList.add("wrong");
      } else {
        this.messageField.classList.remove("wrong");
      }
    }); */
  }

  setFormFields() {
    this.nameField = document.getElementById("name");
    this.emailField = document.getElementById("email");
    this.serviceField = document.getElementById("service");
    this.messageField = document.getElementById("message");

    this.btnSend = document.getElementById("btn-send");

    this.setFieldsListeners();
    this.btnSend.addEventListener("click", this.submit.bind(this));
  }

  checkFields() {
    var clear = true;

    if (this.nameField.value.length <= 0) {
      clear = false;
      this.nameField.classList.add("wrong");
      console.log("Nome vazio");
    }

    if (
      !this.isEmail(this.emailField.value) ||
      this.emailField.value.length <= 0
    ) {
      clear = false;
      this.emailField.classList.add("wrong");
      console.log("Nao é email");
    }

    if (this.messageField.value.length <= 0) {
      clear = false;
      this.messageField.classList.add("wrong");
      console.log("Sem mensagem");
    }

    return clear;
  }

  submit() {
    if (this.checkFields()) {
      console.log("passou");
    } else {
      console.log("Ficou");
    }
  }

  resizeTextArea() {
    this.messageField = document.getElementById("message");
    this.messageField.addEventListener("input", (e) => {
      if (this.messageField.value.length == 0) {
        this.messageField.style.height = "45px";
      } else {
        this.messageField.style.height = "auto";
        this.messageField.style.height = this.messageField.scrollHeight + "px";
      }
    });
  }
}
