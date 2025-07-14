document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-btn");
  const clearFiltersBtn = document.getElementById("clear-filters");
  const seleccionOrden = document.getElementById("sort");
  const seleccionCategoria = document.getElementById("category");
  const seleccionMarca = document.getElementById("brand");
  const categorias = document.querySelectorAll(".cat_button");
  const contenedorProductos = document.querySelector(".store-products");

  let productosCompleto = [];
  let productosActuales = [];

  // Cargar productos
  fetch("data/productos.json")
    .then((response) => response.json())
    .then((productos) => {
      productosCompleto = productos;

      const marcaSeleccionada = urlParams.get("marca");
      const categoriaSeleccionada = urlParams.get("categoria");

      productosActuales = marcaSeleccionada
        ? productosCompleto.filter(
          (producto) => producto.marca === marcaSeleccionada
        )
        : categoriaSeleccionada
          ? productosCompleto.filter(
            (producto) => producto.categoria === categoriaSeleccionada
          )
          : productosCompleto;

      mostrarProductos(productosActuales);
    });

  // Mostrar productos
  function mostrarProductos(lista) {
    contenedorProductos.innerHTML = "";

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

      const etiqueta = etiqueta_publicidad
        ? `<span class="product-card__label">${etiqueta_publicidad}</span>`
        : descuento
          ? `<span class="product-card__dscto">${descuento}</span>`
          : "";

      const precioAntes = precio_anterior
        ? `<p class="product-card__price--old">S/${precio_anterior}</p>`
        : "";

      contenedorProductos.innerHTML += `
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

    const secciontienda = window.location.secciontienda;
    if (secciontienda === "#tienda-productos") {
      const destino = document.querySelector(secciontienda);
      if (destino) {
        setTimeout(() => {
          destino.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  }

  // Buscador
  function buscarProductos() {
    const termino = searchInput.value.toLowerCase().trim();
    if (!termino) {
      mostrarProductos(productosCompleto);
      return;
    }

    const filtrados = productosCompleto.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(termino) ||
        producto.descripcion.toLowerCase().includes(termino)
    );

    mostrarProductos(filtrados);
  }

  searchInput.addEventListener("input", buscarProductos);
  searchButton.addEventListener("click", buscarProductos);
  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") buscarProductos();
  });

  // Limpiar filtros
  clearFiltersBtn.addEventListener("click", function () {
    seleccionCategoria.value = "todas";
    seleccionMarca.value = "todas";
    seleccionOrden.value = "relevancia";

    productosActuales = [...productosCompleto];
    mostrarProductos(productosActuales);
  });

  // Categorías con desplazamiento
  categorias.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      event.preventDefault();
      const nombreCategoria = this.id;

      productosActuales = productosCompleto.filter(
        (producto) => producto.categoria === nombreCategoria
      );
      mostrarProductos(productosActuales);

      contenedorProductos.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Aplicar filtros
  function aplicarFiltros() {
    let listaFiltrada = [...productosActuales];

    const categoriaSeleccionada = seleccionCategoria.value;
    const marcaSeleccionada = seleccionMarca.value;
    const ordenSeleccionado = seleccionOrden.value;

    if (categoriaSeleccionada !== "todas") {
      listaFiltrada = listaFiltrada.filter(
        (p) => p.categoria === categoriaSeleccionada
      );
    }

    if (marcaSeleccionada !== "todas") {
      listaFiltrada = listaFiltrada.filter(
        (p) => p.marca === marcaSeleccionada
      );
    }

    if (ordenSeleccionado === "precio-asc") {
      listaFiltrada.sort((a, b) => a.precio_actual - b.precio_actual);
    } else if (ordenSeleccionado === "precio-desc") {
      listaFiltrada.sort((a, b) => b.precio_actual - a.precio_actual);
    } else if (ordenSeleccionado === "calificacion") {
      listaFiltrada.sort((a, b) => b.calificacion - a.calificacion);
    } else if (ordenSeleccionado === "novedades") {
      listaFiltrada.sort((a, b) => {
        const aEtiqueta = a.etiqueta_publicidad ? -1 : 1;
        const bEtiqueta = b.etiqueta_publicidad ? -1 : 1;
        return aEtiqueta - bEtiqueta;
      });
    }

    mostrarProductos(listaFiltrada);
  }

  seleccionOrden.addEventListener("change", aplicarFiltros);
  seleccionCategoria.addEventListener("change", aplicarFiltros);
  seleccionMarca.addEventListener("change", aplicarFiltros);
});

