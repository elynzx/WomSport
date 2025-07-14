const usuarioBD = JSON.parse(localStorage.getItem("usuarios")) || [];

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const loginSection = document.querySelector(".form-container");
const registerSection = document.getElementById("register-section");

document.getElementById("link-to-register").addEventListener("click", () => {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
});

document.getElementById("link-to-login").addEventListener("click", () => {
    registerSection.style.display = "none";
    loginSection.style.display = "block";
});

document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const correo = document.getElementById("correo").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirm-password").value;

    if (password !== confirmPass) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.correo === correo);

    if (existe) {
        alert("Ya existe una cuenta con este correo.");
        return;
    }

    const nuevoUsuario = { nombres, apellidos, correo, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso 🎉");
    // Redirigir, mostrar mensaje o limpiar campos
    document.getElementById("register-form").reset();
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const correoIngresado = document.getElementById("login-user").value.trim().toLowerCase();
    const passwordIngresado = document.getElementById("login-pass").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(user => user.correo === correoIngresado && user.password === passwordIngresado);

    if (existe) {
        localStorage.setItem("usuarioActivo", JSON.stringify(existe));
        alert("Inicio de sesión exitoso 👋");
        window.location.href = "tienda.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});