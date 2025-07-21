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
    const item_data = this.carrito[id];
    if (!item_data || !item_data.data) return;

    const items = { ...item_data.data };
    const currentAmount = items[talla];
    if (!currentAmount) return;

    const newAmount = Math.max(currentAmount - amount, 0);

    if (newAmount === 0) {
      delete items[talla];
    } else {
      items[talla] = newAmount;
    }

    if (Object.keys(items).length === 0) {
      delete this.carrito[id];
    } else {
      this.carrito[id] = { data: items };
    }

    this._save();
  }

  delete_product(id) {
    delete this.carrito[id];
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

  async get_grand_total() {
    try {
      const response = await fetch("/data/productos.json");
      const productos = await response.json();
      const temp_prods = this._transform_all_products_data(productos);

      const total = temp_prods.reduce((sum, product) => {
        const quantity = product.sizes.reduce((q, size) => q + size.quantity, 0);
        return sum + quantity * product.cost;
      }, 0);

      return total.toFixed(2);
    } catch (error) {
      console.error("Error loading products:", error);
      return null;
    }
  }

  async transform_carrito() {
    const response = await fetch("data/productos.json");
    const productos = await response.json();
    const result = this._transform_all_products_data(productos);
    console.log(result); // Here you'll get the actual result
    return result; // Optional: return if you want to use it elsewhere
  }

  _transform_all_products_data(products) {
    const quantities = this.carrito
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
        image: product.imagen, // Adjust this base URL
        cost: product.precio_actual,
        sizes,
        get totalQuantity() {
            return this.product.sizes.reduce((sum, size) => sum + size.quantity, 0);
        },
        get totalCost() {
            return (this.totalQuantity * this.product.cost).toFixed(2);
        }
      });
    }

    return results;
  }
}
