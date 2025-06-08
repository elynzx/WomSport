document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.querySelector(".offers-products");

    fetch("data/productos.json")
        .then(response => response.json())
        .then(productos => {
            const productosConDescuento = productos.filter(producto => producto.descuento !== null);

            mostrarProductos(productosConDescuento);
        });

    function mostrarProductos(lista) {
        contenedor.innerHTML = "";

        lista.forEach(producto => {
            const { id, nombre, descripcion, imagen, precio_actual, precio_anterior, etiqueta_publicidad, descuento } = producto;

            let etiqueta = etiqueta_publicidad
                ? `<span class="product-card__label">${etiqueta_publicidad}</span>`
                : descuento
                ? `<span class="product-card__dscto">${descuento} OFF</span>`
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
});