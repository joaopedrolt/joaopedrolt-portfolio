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
              <div class="error" id="error-msg">
                <i class="fa-regular fa-circle-xmark"></i>
                <p>Certifique-se de que todos os campos estão corretos!</p>
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

  stillHaveErrors(){
     var stillHaveErrors = false;

     for (let key in this.errors){
       if(this.errors[key].currentState == true){
         stillHaveErrors = true;
       }
     }

     if(!stillHaveErrors){
      this.errorMessage.classList.remove("triggered");
     } else{
      if(!this.errorMessage.classList.contains("triggered")){
        this.errorMessage.classList.add("triggered");
      }
     }

    return stillHaveErrors;
  }

  setFieldsListeners() {
    this.nameField.addEventListener("blur", () => {
      if (this.errors.name.currentState || this.errors.name.triggered) {
        if(this.nameField.value.length <= 0 ){
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

      if(this.errors.email.currentState || this.errors.email.triggered){
        if(this.emailField.value.length > 0 && isEmail) {
          this.errors.email.currentState = false;
          this.emailField.classList.remove("wrong");
        } else {
            this.emailField.classList.add("wrong");
            this.errors.email.currentState = true;
        }
      } else {
        if(isEmail) {
          this.emailField.classList.remove("wrong");
        } else {
          if(this.emailField.value.length <= 0 ){
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
        if(this.messageField.value.length <= 0 ){
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
    this.nameField = document.getElementById("name");
    this.emailField = document.getElementById("email");
    this.serviceField = document.getElementById("service");
    this.messageField = document.getElementById("message");
    this.errorMessage = document.getElementById("error-msg");

    this.btnSend = document.getElementById("btn-send");

    this.setFieldsListeners();
    this.btnSend.addEventListener("click", this.submit.bind(this));

    this.errors = {
      name: {currentState: false, triggered: false},
      email: {currentState: false, triggered: false},
      message: {currentState: false, triggered: false},
    }
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

    if(!clear){
      this.errorMessage.classList.add("triggered");
    }

    return clear;
  }

  submit() {
    if (this.checkFields()) {
      this.btnSend.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>Enviando`;
    } else {

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
