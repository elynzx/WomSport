var favs_list = [];
var favs_objs = [];

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

window.onload = function () {
  // Load favorites from localStorage first
  const favoritos = JSON.parse(
    window.localStorage.getItem("ws_favoritos") ?? "[]"
  );
  set_favs_list(favoritos);

  // Update initial display
  updateFavoritesDisplay();
};

function updateFavoritesDisplay() {
  const amountFav = document.getElementById("cant_fav");
  if (amountFav) {
    amountFav.textContent = `Todos los artículos (${favs_list.length})`;
  }
}

function menuHandler() {
  return {
    open: false,
    currentId: null,
    currentCategoria: null,
    menuX: 0,
    menuY: 0,
    products: [],
    init() {
      fetch("/data/productos.json")
        .then((response) => response.json())
        .then((productos) => {
          this.products = productos
            .filter((producto) => favs_list.includes(producto.id.toString()))
            .map((producto) => ({
              id: producto.id,
              name: producto.nombre,
              image: producto.imagen,
              price: producto.precio_actual,
              categoria: producto.categoria,
              sold: producto.stock, // adjust if needed
              rating: producto.calificacion,
            }));
        })
        .catch((error) => {
          console.error("Error loading products:", error);
        });
      console.log("Getting products for Alpine.js:", favs_objs);
    },
    moveTo(categoria) {
      window.location.href = `/tienda.html?categoria=${categoria}#sort`;
    },
    alterData(id) {
      remove_fav(id.toString())
      this.init()
    },
    openMenu(id, categoria, event) {
      this.currentId = id;
      this.currentCategoria = categoria;
      const rect = event.target.getBoundingClientRect();
      this.menuX = rect.left + window.scrollX;
      this.menuY = rect.bottom + window.scrollY;
      this.open = true;
    },
    closeMenu() {
      this.open = false;
      this.currentId = null;
    },
  };
}


function goto_checkout() {
    window.location.href = '/checkout.html'
}