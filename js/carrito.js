const noItems = document.getElementById("non-items");
const itemsHTML = document.getElementById("items");
const loading = document.getElementById("loading");
const globa_carrito = new Carrito();

window.addEventListener("DOMContentLoaded", () => {
  if (globa_carrito.get_total_items() === 0) {
    loading.remove();
    noItems.style.display = "flex";
    itemsHTML.remove();
  }
  noItems.remove();
  loading.remove();
  itemsHTML.style.display = "flex";
});
