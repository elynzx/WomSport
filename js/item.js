// Declaramos las variables necesarias
const addToCart = document.getElementById("add-to-cart");
const buttons = document.querySelectorAll(".size-btn");
const urlParams = new URLSearchParams(window.location.search);
const targetId = urlParams.get("id");
var clotheSize = "";

const globa_carrito = new Carrito();

var favs_list = [];

function set_favs_list(items) {
  favs_list = Array.isArray(items) ? items : [items];
  window.localStorage.setItem("ws_favoritos", JSON.stringify(favs_list));
}

function check_fav_for(id) {
  return favs_list.includes(id);
}

function add_fav(id) {
  if (!check_fav_for(id)) {
    if (!Array.isArray(favs_list)) {
      set_favs_list([favs_list]); // wrap it as array
    }
    favs_list.push(id);
    set_favs_list(favs_list);
  }
}

function remove_fav(id) {
  if (check_fav_for(id)) {
    favs_list = favs_list.filter((fav) => fav !== id);
    set_favs_list(favs_list);
  }
}

// Reinicia a los valores iniciales
// Cuando carga la pagina web (DOM)
window.addEventListener("DOMContentLoaded", () => {
  // Removemos todos los estados activos que hayamos colocado
  // para la talla
  buttons.forEach((btn) => btn.classList.remove("active"));
  addToCart.disabled = true;

  const favoritos = JSON.parse(
    window.localStorage.getItem("ws_favoritos") ?? "[]"
  );
  set_favs_list(favoritos);

  const heart = document.getElementById("heart");
  if (heart && check_fav_for(targetId)) {
    heart.classList.add("active");
  }
});

// añadimos un evento para al presionar una talla
// esta talla se seleccione
function add_listeners() {
  const buttons = document.querySelectorAll(".size-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // quite la clase active de las demás
      buttons.forEach((btn) => btn.classList.remove("active"));

      // Añade al boton que hicieron click
      button.classList.add("active");
      clotheSize = button.innerText;
      addToCart.disabled = false;

      // Cambia el texto del carrito
      addToCart.textContent = "Agregar al carro";
    });
  });
}
// Creamos una función para cambiar la cantidad
function changeQuantity(amount) {
  // Seleccionamos el objeto
  const quantitySpan = document.getElementById("quantity");

  // cambiamos según lo indicado en `amount`
  let current = parseInt(quantitySpan.innerText);
  current += amount;
  // No puede ser menor a 1
  if (current < 1) current = 1;
  // Ni mayor a 50
  if (current > 50) current = 50;
  quantitySpan.innerText = current;
}

// Cambiamos la cantidad de estrellas `n`
function setStars(n) {
  const container = document.getElementById("star-holder");
  // Buscamos todas las estrellas dentro del star-holder
  const stars = container.querySelectorAll("div");

  // Removemos las clases
  // ex. star full: estrella completa
  // ex. star half: media estrella ...
  stars.forEach((star) => {
    star.classList.remove("full", "half", "zero");
  });

  // calculamos la cantidad de estrellas y el indice de la estrella que seleccionamos
  const total = stars.length;
  const startIndex = total - n;

  // segun el indice es donde nos detenemos y entonces las demas estrellas estarían vacias
  stars.forEach((star, index) => {
    if (index == startIndex - 0.5) {
      star.classList.add("half");
    } else if (index >= startIndex) {
      star.classList.add("full");
    } else {
      star.classList.add("zero");
    }
  });
}

function changeHeartState() {
  const heart = document.getElementById("heart");
  if (heart.classList.contains("active")) {
    remove_fav(targetId);
    heart.classList.remove("active");
  } else {
    add_fav(targetId);
    heart.classList.add("active");
  }
}

function renderSizes(item) {
  const container = document.getElementById("sizes");

  container.replaceChildren();

  item.tallas.forEach((size) => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.textContent = size;
    container.appendChild(btn);
  });

  return container.outerHTML;
}

function addToCarrito() {
  const quantitySpan = document.getElementById("quantity");
  let current = parseInt(quantitySpan.innerText);

  addToCart.disabled = true;

  globa_carrito.add_item(targetId, clotheSize, current);
  showToast("El producto fue agregado\nal carrito");
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  // Eliminar después de animación
  setTimeout(() => {
    toast.remove();
    window.location.href = '/carrito.html'
    addToCart.disabled = false;
  }, 1500);
}

fetch("data/productos.json")
  .then((response) => response.json())
  .then((data) => {
    const item = data.find((obj) => obj.id == targetId);

    const container = document.getElementById("image-preview");
    const images = container.querySelectorAll("img");

    images.forEach((image, index) => {
      image.src = item.miniaturas[index];
    });

    document.getElementById("main-image").src = item.imagen;

    console.log(item);

    setStars(Math.floor(item.calificacion * 2) / 2);
    document.getElementById("price").textContent = "S./ " + item.precio_actual;

    const priceBeforeElement = document.getElementById("price-before");
    if (item.precio_anterior) {
      priceBeforeElement.textContent = "Antes: S./ " + item.precio_anterior;
    } else {
      priceBeforeElement.style.display = "none";
    }

    document.getElementById("product_title").textContent = item.nombre;
    document.getElementById("sku_id").textContent = "SKU: " + item.sku;

    renderSizes(item);
    const categories = document.getElementById("categories");
    categories.textContent = item.categoria ?? "faldas";
    if (item.categoria == "Faldas") {
      categories.href = "/faldas.html";
    }

    add_listeners();
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });
