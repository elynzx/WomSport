/* document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchIcon = document.getElementById("search-btn");

    searchIcon.addEventListener("click", buscarProductos); 
    searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            buscarProductos();
        }
    });

    function buscarProductos() {
        const terminoBusqueda = searchInput.value.toLowerCase().trim();
        if (terminoBusqueda === "") return; 

        window.location.href = `tienda.html?busqueda=${encodeURIComponent(terminoBusqueda)}`;
    }
}); */