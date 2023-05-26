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
          <h5>Envie uma mensagem</h5>
          <div class="row">
            <div class="input-wrapper">
              <label>Nome</label>
              <input
                id="nome"
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
                id="mensagem"
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

          this.resizeTextArea();
        }, 800);
      }
    });
  }

  resizeTextArea() {
    this.textArea = document.getElementById("mensagem");
    this.textArea.addEventListener("input", (e) => {
      if (this.textArea.value.length == 0) {
        this.textArea.style.height = "45px";
      } else {
        this.textArea.style.height = "auto";
        this.textArea.style.height = this.textArea.scrollHeight + "px";
      }
    });
  }
}