/* document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_0b7ux3a", "template_ddmqx91", this)
        .then(() => {
            console.log("Mensaje enviado");
            mostrarModal("Mensaje enviado correctamente");
            this.reset();
        }, (error) => {
            console.error("Error al enviar", error);
            mostrarModal("Hubo un problema al enviar el mensaje");
        });
}); */

/* document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_0b7ux3a", "template_ddmqx91", this)
      .then(() => {
        alert("¡Mensaje enviado correctamente! 🎉");
        form.reset();
      }, (error) => {
        console.error("Error al enviar:", error);
        alert("Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.");
      });
  });
}); */