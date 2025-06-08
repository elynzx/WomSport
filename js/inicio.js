fetch("data/productos.json")
  .then((response) => response.json())
  .then((productos) => {
    let productosNuevos = productos.filter(
      (producto) => producto.etiqueta_publicidad === "NUEVO!"
    );
    mostrarNovedades(productosNuevos.slice(0, 9));
  });

function mostrarNovedades(lista) {
  const contenedor = document.querySelector(".new-products");
  contenedor.innerHTML = "";

  lista.forEach((producto) => {
    contenedor.innerHTML += `
         
            <div class="product-card">
                <div class="product-card__image">
                    <a href="item.html?id=${producto.id}">
                        <img src="${producto.imagen}" alt="${producto.nombre}" />
                        <span class="product-card__label">${producto.etiqueta_publicidad}</span>
                    </a>
                </div>
                <div class="product-card__description">
                    <strong class="product-card__title"><a href="item.html?id=${producto.id}">${producto.nombre}</a></strong>
                    <p class="product-card__text">${producto.descripcion}</p>
                    <div class="product-card__details">
                        <div class="product-card__prices">
                            <p class="product-card__price--current">S/${producto.precio_actual}</p>
                            <p class="product-card__price--old"></p>
                        </div>
                        <span class="product-card__btn--addcart"><i class="fa-solid fa-cart-plus"></i></span>
                    </div>
                </div>
            </div>
        `;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const contenedorCarrusel = document.querySelector(".carousel__products");
  const btnPrev = document.querySelector(".carousel__btn--prev");
  const btnNext = document.querySelector(".carousel__btn--next");

  fetch("data/productos.json")
    .then((response) => response.json())
    .then((productos) => {
      const productosTop = productos
        .sort((a, b) => b.calificacion - a.calificacion)
        .slice(0, 8); 
      mostrarProductosCarrusel(productosTop);
    });

  function mostrarProductosCarrusel(lista) {
    contenedorCarrusel.innerHTML = "";

    lista.forEach((producto) => {
      const { id, nombre, imagen, calificacion } = producto;

      const productCard = document.createElement("div");
      productCard.classList.add("carousel__product");

      productCard.innerHTML = `
                <a href="item.html?id=${id}">
                    <img src="${imagen}" alt="${nombre}">
                    <span class="carousel__label">★ ${calificacion.toFixed(
                      1
                    )}</span>
                    <span class="carousel__product-more"> Ver más </span>
                </a>
            `;

      contenedorCarrusel.appendChild(productCard);
    });
  }

  btnNext.addEventListener("click", () => {
    contenedorCarrusel.scrollLeft += 300;
  });

  btnPrev.addEventListener("click", () => {
    contenedorCarrusel.scrollLeft -= 300; 
  });
});
