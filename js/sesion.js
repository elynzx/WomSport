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

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    limpiarErrores();

    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const correo = document.getElementById("correo").value.trim().toLowerCase();
    const password = document.getElementById("register-pass").value;
    const confirmPass = document.getElementById("confirm-password").value;
    const aceptoTerminos = document.getElementById("terminos").checked;

    if (password !== confirmPass) {
        mostrarError("confirm-password", "*Las contraseñas no coinciden.");
        return;
    }

    if (!aceptoTerminos) {
        mostrarError("terminos", "*Debes aceptar los términos y condiciones.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.correo === correo);

    if (existe) {
        mostrarError("correo", "*Ya existe una cuenta con este correo.");
        return;
    }

    const nuevoUsuario = { nombres, apellidos, correo, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarModal("Registro exitoso!");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
    registerForm.reset();
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarErrores();

    const correoIngresado = document.getElementById("login-user").value.trim().toLowerCase();
    const passwordIngresado = document.getElementById("login-pass").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(user => user.correo === correoIngresado && user.password === passwordIngresado);

    if (existe) {
        localStorage.setItem("usuarioActivo", JSON.stringify(existe));
        mostrarModal("Inicio de sesión exitoso!");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else {
        mostrarError("login-user", "*Correo o contraseña incorrectos.");
        mostrarError("login-pass", " ");
    }
});


document.querySelectorAll(".toggle-icon").forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const input = toggle.previousElementSibling;
        const icon = toggle.querySelector("i");

        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        } else {
            input.type = "password";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        }
    });
});

function mostrarModal(texto) {
    const modal = document.getElementById("modal-confirm");
    const modalText = document.getElementById("modal-text");
    modalText.textContent = texto;
    modal.classList.remove("hidden");
    modal.classList.add("active");

    setTimeout(() => {
        modal.classList.remove("active");
        modal.classList.add("hidden");
    }, 1000);
}


function mostrarError(idCampo, mensaje) {
    const errorTag = document.getElementById(`error-${idCampo}`);
    if (errorTag) errorTag.textContent = mensaje;
}

function limpiarErrores() {
    document.querySelectorAll(".error-msg").forEach(p => p.textContent = "");
}

window.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-confirm");
    modal.classList.add("hidden");
});

