class Carrito {
  constructor(id) {
    this.id = id;
    this.carrito = this.fetch_data();
  }

  fetch_data() {
    let res = localStorage.getItem("carritoList");
    res ||= "{}";
    try {
      return JSON.parse(res);
    } catch {
      return {};
    }
  }

  _save() {
    localStorage.setItem("carritoList", JSON.stringify(this.carrito));
  }

  add_item(id, talla, amount) {
    let item_data = this.carrito[id];
    let items = item_data ? item_data.data : {};
    let on_cart = items[talla] ?? 0;
    on_cart += amount;
    items[talla] = on_cart;
    this.carrito[id] = { data: items };
    this._save();
  }

  remove_item(id, talla, amount) {
    let item_data = this.carrito[id];
    if (!item_data) return;
    let items = item_data.data;
    let on_cart = items[talla];
    if (!on_cart) return;
    on_cart = Math.max(on_cart - amount, 0);
    if (on_cart === 0) {
      delete items[talla];
    } else {
      items[talla] = on_cart;
    }
    this.carrito[id] = { data: items };
    this._save();
  }

  clear_cart() {
    this.carrito = {};
    this._save();
  }

  get_total_items() {
    let total = 0;
    for (const id in this.carrito) {
      const items = this.carrito[id].data;
      for (const talla in items) {
        total += items[talla];
      }
    }
    return total;
  }

  async transformCarrito() {
    const response = await fetch("data/productos.json");
    const productos = await response.json();
    const result = this._transformAllProductsData(this.carrito, productos);
    console.log(result); // Here you'll get the actual result
    return result; // Optional: return if you want to use it elsewhere
  }

  _transformAllProductsData(quantities, products) {
    const sizeNames = {
      XS: "Extra Small",
      S: "Small",
      M: "Medium",
      L: "Large",
      XL: "Extra Large",
      XXL: "Double Extra Large",
    };

    const results = [];

    for (const [productId, productData] of Object.entries(quantities)) {
      const id = parseInt(productId, 10);
      const product = products.find((p) => p.id === id);

      if (!product) continue; // Skip if not found

      const sizes = Object.entries(productData.data).map(
        ([alias, quantity]) => ({
          name: sizeNames[alias] || alias,
          quantity,
          alias,
        })
      );

      results.push({
        id,
        name: product.nombre || "Unknown Product",
        image: `https://example.com/${product.imagen}`, // Adjust this base URL
        cost: product.precio_actual,
        sizes,
      });
    }

    return results;
  }
}
