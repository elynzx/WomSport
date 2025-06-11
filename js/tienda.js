document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let productosCompleto = [];
  let productosActuales = [];

  fetch("data/productos.json")
    .then((response) => response.json())
    .then((productos) => {
      productosCompleto = productos;

      const brandSelected = urlParams.get("marca");
      const categorySelected = urlParams.get("categoria");

      productosActuales = brandSelected
        ? productosCompleto.filter(
            (producto) => producto.marca === brandSelected
          )
        : categorySelected
        ? productosCompleto.filter(
            (producto) => producto.categoria === categorySelected
          )
        : productosCompleto;

      mostrarProductos(productosActuales);
    });

  function mostrarProductos(lista) {
    const contenedor = document.querySelector(".store-products");
    contenedor.innerHTML = "";

    lista.forEach((producto) => {
      const {
        id,
        nombre,
        descripcion,
        imagen,
        precio_actual,
        precio_anterior,
        etiqueta_publicidad,
        descuento,
      } = producto;

      let etiqueta = etiqueta_publicidad
        ? `<span class="product-card__label">${etiqueta_publicidad}</span>`
        : descuento
        ? `<span class="product-card__dscto">${descuento}</span>`
        : "";

      let precioAntes = precio_anterior
        ? `<p class="product-card__price--old">S/${precio_anterior}</p>`
        : "";

      contenedor.innerHTML += `
                <div class="product-card">
                    <div class="product-card__image">
                        <a href="item.html?id=${id}">
                            <img src="${imagen}" alt="${nombre}">
                            ${etiqueta}
                        </a>
                    </div>
                    <div class="product-card__description">
                        <strong class="product-card__title"><a href="item.html?id=${id}">${nombre}</a></strong>
                        <p class="product-card__text">${descripcion}</p>
                        <div class="product-card__prices">
                            <p class="product-card__price--current">S/${precio_actual}</p>
                            ${precioAntes}
                        </div>
                    </div>
                </div>
            `;
    });
  }

  /* Limpiar filtros */
  const clearFiltersBtn = document.getElementById("clear-filters");
  clearFiltersBtn.addEventListener("click", function () {
    document.getElementById("category").value = "todas";
    document.getElementById("brand").value = "todas";
    document.getElementById("sort").value = "relevancia";

    productosActuales = [...productosCompleto];
    mostrarProductos(productosActuales);
  });

  /* Categorías */
  const categorias = document.querySelectorAll(".cat_button");
  const contenedorProductos = document.querySelector(".store-products"); 

  categorias.forEach((categoria) => {
    categoria.addEventListener("click", function (event) {
      event.preventDefault();
      const nombreCategoria = this.id;
      productosActuales = productosCompleto.filter(
        (producto) => producto.categoria === nombreCategoria
      );
      mostrarProductos(productosActuales);
      contenedorProductos.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* Filtros */
  const sortSelect = document.getElementById("sort");
  const categorySelect = document.getElementById("category");
  const brandSelect = document.getElementById("brand");

  sortSelect.addEventListener("change", () => aplicarFiltros());
  categorySelect.addEventListener("change", () => aplicarFiltros());
  brandSelect.addEventListener("change", () => aplicarFiltros());

  function aplicarFiltros() {
    let listaFiltrada = [...productosActuales];

    const categoriaSeleccionada = categorySelect.value;
    if (categoriaSeleccionada === "todas") {
      listaFiltrada = [...productosCompleto];
      productosActuales = listaFiltrada;
    } else {
      listaFiltrada = listaFiltrada.filter(
        (p) => p.categoria === categoriaSeleccionada
      );
    }

    const marcaSeleccionada = brandSelect.value;
    if (marcaSeleccionada !== "todas") {
      listaFiltrada = listaFiltrada.filter(
        (p) => p.marca === marcaSeleccionada
      );
    }

    const ordenSeleccionado = sortSelect.value;
    if (ordenSeleccionado === "precio-asc") {
      listaFiltrada.sort((a, b) => a.precio_actual - b.precio_actual);
    } else if (ordenSeleccionado === "precio-desc") {
      listaFiltrada.sort((a, b) => b.precio_actual - a.precio_actual);
    } else if (ordenSeleccionado === "calificacion") {
      listaFiltrada.sort((a, b) => b.calificacion - a.calificacion);
    } else if (ordenSeleccionado === "novedades") {
      listaFiltrada.sort((a, b) => {
        const tieneEtiquetaA = a.etiqueta_publicidad ? -1 : 1;
        const tieneEtiquetaB = b.etiqueta_publicidad ? -1 : 1;
        return tieneEtiquetaA - tieneEtiquetaB;
      });
    }

    mostrarProductos(listaFiltrada);
  }
});
