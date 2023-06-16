import { EventEmitter } from "events";

export default class Alert extends EventEmitter {
  constructor() {
    super();
  }

  showAlert() {
    this.alertElement = document.createElement("div");
    this.alertElement.classList.add("alert");
    this.alertElement.innerHTML = `
      <div class="alert-box">
        <h1 class="alert-title">Aviso</h1>
        <div class="alert-content">
          <h3 class="alert-text">
            Baixa performance detectada. É recomendado verificar se a aceleração
            de hardware está habilitada em seu navegador (hardware aceleration).
          </h3>
          <h3 class="alert-text">
            Voce pode executar a versão estática, sem renderização 3D (WebGl),
            ou ignorar o aviso e prosseguir no uso regular do app (Pode implicar
            em um alto uso da CPU).
          </h3>
        </div>

        <div class="alert-buttons">
          <button class="alert-button" id="yes-button">
            <h4>Versão<br>estática</h4>
          </button>
          <button class="alert-button" id="cancel-button">
            <h4>Ignorar</h4>
          </button>
        </div>
      </div>`;
    document.body.appendChild(this.alertElement);

    this.setButtons();

    setTimeout(() => {
      this.alertElement.classList.add("show");
    }, 200);
  }

  hideAlert() {
    this.alertElement.classList.remove("show");
    setTimeout(() => {
      this.alertElement.remove();
    }, 500);
  }

  handleSafeButton() {
    this.safeButton.removeEventListener("click", this.onClickSafe);
    this.ignoreButton.removeEventListener("click", this.onClickIgnore);
    this.hideAlert();
    this.emit("safeButton");
  }

  handleIgnoreButton() {
    this.ignoreButton.removeEventListener("click", this.onClickIgnore);
    this.safeButton.removeEventListener("click", this.onClickSafe);
    this.hideAlert();
    this.emit("ignoreButton");
  }

  setButtons() {
    this.ignoreButton = document.getElementById("cancel-button");
    this.safeButton = document.getElementById("yes-button");

    this.onClickSafe = this.handleSafeButton.bind(this);
    this.onClickIgnore = this.handleIgnoreButton.bind(this);

    this.safeButton.addEventListener("click", this.onClickSafe);

    this.ignoreButton.addEventListener("click", this.onClickIgnore);
  }
}
