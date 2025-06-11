window.onload = function () {
  const amountFav = document.getElementById("cant_fav");
  amountFav.textContent = "Todos los artículos (14)";
};

function menuHandler() {
  return {
    open: false,
    currentId: null,
    menuX: 0,
    menuY: 0,
    openMenu(id, event) {
      this.currentId = id;
      const rect = event.target.getBoundingClientRect();
      this.menuX = rect.left + window.scrollX;
      this.menuY = rect.bottom + window.scrollY;
      this.open = true;
    },
  };
}


function goto_checkout() {
    window.location.href = '/checkout.html'
}