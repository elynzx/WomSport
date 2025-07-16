const noItems = document.getElementById("non-items");
const itemsHTML = document.getElementById("items");
const loading = document.getElementById("loading");
const globa_carrito = new Carrito();

function productCard() {
  return {
    products: [],

    init() {
      itemsHTML.style.display = "none";
      loading.style.display = "flex";
      fetch("/data/productos.json")
        .then((response) => response.json())
        .then((productos) => {
          this.products = globa_carrito._transformAllProductsData(productos);
        })
        .catch((error) => {
          console.error("Error loading products:", error);
        });
      console.log("Getting products for Alpine.js:");
      loading.style.display = "none";
      itemsHTML.style.display = "flex";
    },

    totalQuantity(product) {
      return product.sizes.reduce((sum, size) => sum + size.quantity, 0);
    },

    totalCost(product) {
      return (this.totalQuantity(product) * product.cost).toFixed(2);
    },

    updateQuantity(productIndex, sizeIndex, change) {
      const product = this.products[productIndex];
      const amount = Math.max(0, product.sizes[sizeIndex].quantity + change);
      product.sizes[sizeIndex].quantity = amount;
      globa_carrito.remove_item(
        product.id,
        product.sizes[sizeIndex].alias,
        -change
      );
    },

    removeSize(productIndex, sizeIndex) {
      const product = this.products[productIndex];
      const size = product.sizes[sizeIndex];
      globa_carrito.remove_item(product.id, size.alias, size.quantity + 1);
      this.products[productIndex].sizes.splice(sizeIndex, 1);

      if (this.products[productIndex].sizes.length == 0) {
        this.init();
      }
    },

    deleteProduct(productIndex) {
      const product = this.products[productIndex];
      if (confirm("Are you sure you want to delete this product?")) {
        this.products.splice(productIndex, 1);
        globa_carrito.delete_product(product.id);
      }
    },

    grandTotal() {
      return this.products
        .reduce((sum, product) => {
          const quantity = product.sizes.reduce(
            (q, size) => q + size.quantity,
            0
          );
          return sum + quantity * product.cost;
        }, 0)
        .toFixed(2);
    },
  };
}
