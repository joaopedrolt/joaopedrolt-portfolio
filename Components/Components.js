import TextSwitcher from "./TextSwitcher";
import Form from "./Form";
import EmailJs from "./Email";
import Dropdown from "./Dropdown";

export default class Components {
  constructor() {
    this.textSwitcher = new TextSwitcher();
    this.emailJs = new EmailJs();
    this.dropdown = new Dropdown();
    this.form = new Form(this.emailJs, this.dropdown);
  }
}