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


function productCard() {
    return {
        product: {
            name: 'Classic T-Shirt',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
            cost: 25.99,
            sizes: [
                { name: 'Small', quantity: 2 },
                { name: 'Medium', quantity: 3 },
                { name: 'Large', quantity: 4 }
            ]
        },
        
        get totalQuantity() {
            return this.product.sizes.reduce((sum, size) => sum + size.quantity, 0);
        },
        
        get totalCost() {
            return (this.totalQuantity * this.product.cost).toFixed(2);
        },
        
        updateQuantity(index, change) {
            this.product.sizes[index].quantity = Math.max(0, this.product.sizes[index].quantity + change);
        },
        
        removeSize(index) {
            this.product.sizes.splice(index, 1);
        },
        
        deleteProduct() {
            if (confirm('Are you sure you want to delete this product?')) {
                alert('Product deleted!');
                // Handle deletion logic here
                // You can add custom logic like:
                // - Remove from cart
                // - Update database
                // - Redirect to another page
                // - Call an API endpoint
            }
        }
    }
}