document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const brandSelected = urlParams.get("marca");
    const categorySelected = urlParams.get("categoria");

    fetch("data/productos.json")
        .then(response => response.json())
        .then(productos => {
            let productosFiltrados = brandSelected
                ? productos.filter(producto => producto.marca === brandSelected)
                : categorySelected
                ? productos.filter(producto => producto.categoria === categorySelected)
                : productos;

            mostrarProductos(productosFiltrados);
        });

    function mostrarProductos(lista) {
        const contenedor = document.querySelector(".store-products");
        contenedor.innerHTML = "";  

        lista.forEach(producto => {
            const { id, nombre, descripcion, imagen, precio_actual, precio_anterior, marca, etiqueta_publicidad, descuento } = producto;

            let etiqueta = "";
            if (etiqueta_publicidad) {
                etiqueta = `<span class="product-card__label">${etiqueta_publicidad}</span>`;
            } else if (descuento) {
                etiqueta = `<span class="product-card__label">${descuento}</span>`;
            }

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