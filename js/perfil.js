document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    location.href = "sesion.html"; 
    return;
  }

  document.getElementById("dato-nombres").textContent = usuario.nombres;
  document.getElementById("dato-apellidos").textContent = usuario.apellidos;
  document.getElementById("dato-correo").textContent = usuario.correo;

  document.getElementById("saludo-usuario").textContent = `¡Hola, ${usuario.nombres}!`;

  document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    location.href = "sesion.html";
  });
});