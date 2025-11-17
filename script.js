// Sample product data
const products = [
    { id: 1, name: 'Tomatoes', category: 'vegetables', price: 2.99, emoji: '🍅' },
    { id: 2, name: 'Carrots', category: 'vegetables', price: 1.99, emoji: '🥕' },
    { id: 3, name: 'Broccoli', category: 'vegetables', price: 3.49, emoji: '🥦' },
    { id: 4, name: 'Bell Peppers', category: 'vegetables', price: 3.99, emoji: '🫑' },
    { id: 5, name: 'Apples', category: 'fruits', price: 2.49, emoji: '🍎' },
    { id: 6, name: 'Bananas', category: 'fruits', price: 1.49, emoji: '🍌' },
    { id: 7, name: 'Oranges', category: 'fruits', price: 3.99, emoji: '🍊' },
    { id: 8, name: 'Strawberries', category: 'fruits', price: 4.99, emoji: '🍓' },
    { id: 9, name: 'Milk', category: 'dairy', price: 3.99, emoji: '🥛' },
    { id: 10, name: 'Cheese', category: 'dairy', price: 5.99, emoji: '🧀' },
    { id: 11, name: 'Yogurt', category: 'dairy', price: 2.99, emoji: '🥛' },
    { id: 12, name: 'Butter', category: 'dairy', price: 4.49, emoji: '🧈' },
    { id: 13, name: 'Orange Juice', category: 'beverages', price: 3.49, emoji: '🧃' },
    { id: 14, name: 'Coffee', category: 'beverages', price: 6.99, emoji: '☕' },
    { id: 15, name: 'Tea', category: 'beverages', price: 3.99, emoji: '🫖' },
    { id: 16, name: 'Water', category: 'beverages', price: 1.99, emoji: '💧' }
];

let cart = [];
let currentFilter = 'all';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    setupCartIcon();
});

// Load products into grid
function loadProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Setup filter buttons
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

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
        }
    });
}

// Setup cart icon click
function setupCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.addEventListener('click', function() {
        openCart();
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification('Added to cart!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    updateCartCount();
    displayCartItems();
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Display cart items
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
                <div class="cart-item-name">${item.emoji} ${item.name}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
                <div style="color: var(--primary-color); font-weight: bold;">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    cartTotal.textContent = total.toFixed(2);
}

// Open cart
function openCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'block';
    displayCartItems();
}

// Close cart
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'none';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}\n\nYour order will be delivered soon!`);
    cart = [];
    updateCartUI();
    closeCart();
}

// Handle contact form
function handleContactForm(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--primary-color);
        color: var(--dark-bg);
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 300;
        animation: slideIn 0.3s ease;
        font-weight: bold;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close cart when clicking outside
window.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
        closeCart();
    }
});
