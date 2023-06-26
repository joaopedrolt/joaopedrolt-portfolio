export default class Form {
  constructor(emailJs, dropdown) {
    this.emailJs = emailJs;
    this.dropdown = dropdown;
    this.textId = document.getElementById("work-together");
    this.formContainerID = document.getElementById("form-container");
    this.sending = false;
    this.apiError = false;

    this.showForm();

    this.dropdown.on("servicechange", (e) => {
      this.errors.service.currentState = e;
      this.errors.service.triggered = e;
      this.stillHaveErrors();
    });
  }

  showForm() {
    this.textId.addEventListener("click", () => {
      if (!this.textId.classList.contains("fade-out")) {
        this.textId.classList.add("fade-out");

        setTimeout(() => {
          this.formContainerID.innerHTML = `
          <div class="form" id="form">
              <span class="form-title">Envie uma mensagem</span>
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
                  <div class="dropdown">
                      <div class="select">
                        <span class="selected">Qual seria seu interesse?</span>
                        <div class="caret"></div>
                      </div>
                      <ul class="menu">
                        <li>Preciso de ajuda com um projeto único</li>
                        <li>Procurando uma parceria de longo prazo</li>
                        <li>Contratar tempo integral</li>
                        <li>Apenas um olá!</li>
                      </ul>
                    </div>
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
              <div class="submit-wrapper">
                <div class="error" id="error-msg">
                  <i class="fa-regular fa-circle-xmark"></i>
                  <p>Certifique-se de que todos os campos estão corretos!</p>
                </div>
                <div class="button-wrapper">
                  <button class="btn" id="btn-send"><i class="fa-solid fa-paper-plane"></i><span>Enviar Mensagem</span></button>
                </div>
              </div>
          </div>`;

          setTimeout(() => {
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

  stillHaveErrors() {
    var stillHaveErrors = false;

    for (let key in this.errors) {
      if (this.errors[key].currentState == true) {
        stillHaveErrors = true;
      }
    }

    if (!stillHaveErrors && !this.apiError) {
      this.errorMessage.classList.remove("triggered");
    } else {
      if (!this.errorMessage.classList.contains("triggered")) {
        this.errorMessage.classList.add("triggered");
      }
    }

    return stillHaveErrors;
  }

  setFieldsListeners() {
    this.nameField.addEventListener("blur", () => {
      if (this.errors.name.currentState || this.errors.name.triggered) {
        if (this.nameField.value.length <= 0) {
          this.nameField.classList.add("wrong");
          this.errors.name.currentState = true;
        } else {
          this.nameField.classList.remove("wrong");
          this.errors.name.currentState = false;
        }
      }

      this.stillHaveErrors();
    });

    this.emailField.addEventListener("blur", () => {
      const isEmail = this.isEmail(this.emailField.value);

      if (this.errors.email.currentState || this.errors.email.triggered) {
        if (this.emailField.value.length > 0 && isEmail) {
          this.errors.email.currentState = false;
          this.emailField.classList.remove("wrong");
        } else {
          this.emailField.classList.add("wrong");
          this.errors.email.currentState = true;
        }
      } else {
        if (isEmail) {
          this.emailField.classList.remove("wrong");
        } else {
          if (this.emailField.value.length <= 0) {
            this.emailField.classList.remove("wrong");
          } else {
            this.emailField.classList.add("wrong");
          }
        }
      }

      this.stillHaveErrors();
    });

    this.messageField.addEventListener("blur", () => {
      if (this.errors.message.currentState || this.errors.message.triggered) {
        if (this.messageField.value.length <= 0) {
          this.messageField.classList.add("wrong");
          this.errors.message.currentState = true;
        } else {
          this.messageField.classList.remove("wrong");
          this.errors.message.currentState = false;
        }
      }

      this.stillHaveErrors();
    });
  }

  setFormFields() {
    this.dropdown.set();
    this.nameField = document.getElementById("name");
    this.emailField = document.getElementById("email");
    this.messageField = document.getElementById("message");
    this.errorMessage = document.getElementById("error-msg");

    this.btnSend = document.getElementById("btn-send");

    this.setFieldsListeners();
    this.btnSend.addEventListener("click", this.submit.bind(this));

    this.errors = {
      name: { currentState: false, triggered: false },
      email: { currentState: false, triggered: false },
      service: { currentState: false, triggered: false },
      message: { currentState: false, triggered: false },
    };
  }

  checkFields() {
    var clear = true;

    if (this.nameField.value.length <= 0) {
      clear = false;
      this.errors.name.currentState = true;
      this.errors.name.triggered = true;
      this.nameField.classList.add("wrong");
    }

    if (
      !this.isEmail(this.emailField.value) ||
      this.emailField.value.length <= 0
    ) {
      clear = false;
      this.errors.email.currentState = true;
      this.errors.email.triggered = true;
      this.emailField.classList.add("wrong");
    }

    if (this.messageField.value.length <= 0) {
      clear = false;
      this.errors.message.currentState = true;
      this.errors.message.triggered = true;
      this.messageField.classList.add("wrong");
    }

    if (!this.dropdown.get().validInput) {
    }

    this.serviceSelected = this.dropdown.get();

    if (
      !(
        this.serviceSelected == "Preciso de ajuda com um projeto único" ||
        this.serviceSelected == "Procurando uma parceria de longo prazo" ||
        this.serviceSelected == "Contratar tempo integral" ||
        this.serviceSelected == "Apenas um olá!"
      )
    ) {
      clear = false;
      this.errors.service.currentState = true;
      this.errors.service.triggered = true;
      this.dropdown.error();
    }

    if (!clear) {
      this.errorMessage.classList.add("triggered");
    }

    return clear;
  }

  handleEmailResolve() {
    this.btnSend.innerHTML = `<i class="fa-solid fa-check"></i><span>Enviado!</span>`;
    this.form.classList.add("fade-out");

    setTimeout(() => {
      this.formContainerID.innerHTML = ` 
        <div class="text-container" id="tick">
          <div class="trigger"></div>
          <svg version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 37 37" witdh="150px" height="150px" xml:space="preserve">
          <path class="circ path style-path" d="
            M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
            />
          <polyline class="tick path style-polyline" points="
            11.6,20 15.9,24.2 26.4,13.8 "/>
          </svg>
        </div>`;

      setTimeout(() => {
        const tickController = document.querySelector(".trigger");

        tickController.classList.add("drawn");

        setTimeout(() => {
          tickController.classList.remove("drawn");

          setTimeout(() => {
            this.formContainerID.innerHTML = ` 
              <div class="text-container fade-out" id="sent">
                <h4>Mensagem enviada</h4>
                <h1 class="title">Retornarei em breve</h1>
              </div>`;

            const sent = document.getElementById("sent");

            setTimeout(() => {
              sent.classList.remove("fade-out");
              this.sending = false;
            }, 200);
          }, 2000);
        }, 2000);
      }, 200);
    }, 1000);
  }

  handleEmailReject() {
    this.btnSend.innerHTML = `<i class="fa-solid fa-rotate-right"></i><span>Recarregar Página</span>`;
    this.errorMessage.innerHTML = ` 
      <i class="fa-regular fa-circle-xmark"></i>
      <p>Ocorreu um erro, por favor tente novamente mais tarde ou outra forma de contato, obrigado!</p>`;

    setTimeout(() => {
      this.errorMessage.classList.add("triggered");
      this.sending = false;
    }, 200);
  }

  handleReload() {
    location.reload();
  }

  async submit() {
    if (this.checkFields()) {
      if (!this.sending && !this.apiError) {
        this.btnSend.innerHTML = `<div id="loading-icon"></div><span>Enviando...</span>`;
        this.sending = true;

        await this.emailJs
          .send(
            this.nameField.value,
            this.emailField.value,
            this.serviceSelected,
            this.messageField.value
          )
          .then(
            () => {
              this.handleEmailResolve();
            },
            () => {
              this.apiError = true;
              this.handleEmailReject();
            }
          );
      }

      if (this.apiError && !this.sending) {
        this.handleReload();
      }
    }
  }

  resizeTextArea() {
    this.messageField = document.getElementById("message");
    this.messageField.addEventListener("input", () => {
      if (this.messageField.value.length == 0) {
        this.messageField.style.height = "45px";
      } else {
        this.messageField.style.height = "auto";
        this.messageField.style.height = this.messageField.scrollHeight + "px";
      }
    });
  }
}