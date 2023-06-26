import emailjs from "@emailjs/browser";

export default class EmailJs {
  constructor() {
    this.templateId = import.meta.env.VITE_TEMPLATE_ID;
    this.serviceId = import.meta.env.VITE_SERVICE_ID;
    this.publicKey = import.meta.env.VITE_PUBLIC_KEY;
  }

  send(name, email, service, message) {
    const params = {
      name,
      email,
      service,
      message,
    };

    return emailjs.send(
      this.serviceId,
      this.templateId,
      params,
      this.publicKey
    );
  }
}