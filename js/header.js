window.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuario) {
    const headerIcons = document.querySelector(".header_icons");

    const saludo = document.createElement("span");
    saludo.classList.add("user-welcome");
    saludo.textContent = `Hola, ${usuario.nombres}`;
    headerIcons.appendChild(saludo);
  }
});
