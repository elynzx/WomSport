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
}
