// Sample product data
const products = [
  { id: 1, name: 'Tomatoes', category: 'vegetables', price: 250, image: 'https://images.unsplash.com/photo-1617196036584-2cda8dc43c91?w=600' },
  { id: 2, name: 'Carrots', category: 'vegetables', price: 180, image: 'https://images.unsplash.com/photo-1615485290413-3b5d2855fd17?w=600' },
  { id: 3, name: 'Broccoli', category: 'vegetables', price: 320, image: 'https://images.unsplash.com/photo-1603052875226-30fb7b6c389b?w=600' },
  { id: 4, name: 'Bell Peppers', category: 'vegetables', price: 380, image: 'https://images.unsplash.com/photo-1601072525550-8c556d8804db?w=600' },
  { id: 5, name: 'Apples', category: 'fruits', price: 220, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600' },
  { id: 6, name: 'Bananas', category: 'fruits', price: 150, image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e12a?w=600' },
  { id: 7, name: 'Oranges', category: 'fruits', price: 280, image: 'https://images.unsplash.com/photo-1547514701-42782101795d?w=600' },
  { id: 8, name: 'Strawberries', category: 'fruits', price: 450, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600' },
  { id: 9, name: 'Milk', category: 'dairy', price: 380, image: 'https://images.unsplash.com/photo-1585238342028-4c52c66e2a46?w=600' },
  { id: 10, name: 'Cheese', category: 'dairy', price: 580, image: 'https://images.unsplash.com/photo-1559561854-22907d132b8a?w=600' },
  { id: 11, name: 'Yogurt', category: 'dairy', price: 280, image: 'https://images.unsplash.com/photo-1580910051074-d6a1d3f51f78?w=600' },
  { id: 12, name: 'Butter', category: 'dairy', price: 420, image: 'https://images.unsplash.com/photo-1615485290413-3b5d2855fd17?w=600' },
  { id: 13, name: 'Orange Juice', category: 'beverages', price: 320, image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600' },
  { id: 14, name: 'Coffee', category: 'beverages', price: 650, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600' },
  { id: 15, name: 'Tea', category: 'beverages', price: 380, image: 'https://images.unsplash.com/photo-1518976024611-28bf4f0b9c31?w=600' },
  { id: 16, name: 'Water', category: 'beverages', price: 180, image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=600' }
];


let cart = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    setupCartIcon();
    loadOrders();
});

// Load products
function loadProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-price">Rs.${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter buttons
function setupEventListeners() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            loadProducts(currentFilter);
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) navMenu.classList.remove('active');
    });
}

// Cart icon
function setupCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.addEventListener('click', openCart);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    updateCartUI();
    showNotification('Added to cart!');
}

// Remove/update quantity
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(productId);
        else updateCartUI();
    }
}

// Update cart UI
function updateCartUI() {
    updateCartCount();
    displayCartItems();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
}

function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-price">Rs.${itemTotal.toFixed(2)}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove"><i class="fas fa-trash"></i></button>
            </div>
        `;
    });
    cartItems.innerHTML = html;
    cartTotal.textContent = total.toFixed(2);
}

// Open/close cart
function openCart() { document.getElementById('cartModal').style.display = 'block'; displayCartItems(); }
function closeCart() { document.getElementById('cartModal').style.display = 'none'; }

// Checkout with toast & localStorage
function checkout() {
    if (cart.length === 0) return showNotification('Your cart is empty!');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = { id: Date.now(), items: [...cart], total, placedAt: new Date().toLocaleString() };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    showNotification(`Order placed! Total Rs.${total.toFixed(2)}`);
    cart = [];
    updateCartUI();
    closeCart();
    loadOrders();
}

// Contact & Loyalty
function handleContactForm(e) { e.preventDefault(); showNotification('Message sent!'); e.target.reset(); }
function handleLoyaltyRegistration(e) { e.preventDefault(); showNotification('Loyalty registration successful!'); e.target.reset(); }

// Notifications
function showNotification(msg) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background-color: var(--primary-color);
        color: var(--dark-bg);
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 300;
        font-weight: bold;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => { notif.style.animation = 'slideOut 0.3s ease'; setTimeout(() => notif.remove(), 300); }, 2000);
}

// Close cart outside click
window.addEventListener('click', e => { if (e.target === document.getElementById('cartModal')) closeCart(); });

// Load Orders
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersList = document.getElementById("ordersList");

    if (orders.length === 0) { ordersList.innerHTML = "<p>No orders placed yet.</p>"; return; }

    let html = '';
    orders.forEach(order => {
        html += `
            <div class="order-card">
                <h3>Order #${order.id}</h3>
                <p><strong>Date:</strong> ${order.placedAt}</p>
                <p><strong>Total:</strong> Rs.${order.total.toFixed(2)}</p>
                <ul>
                    ${order.items.map(item => `<li>${item.name} x ${item.quantity}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    ordersList.innerHTML = html;
}
