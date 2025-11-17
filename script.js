// Sample product data with real image URLs from Unsplash
const products = [
    { id: 1, name: 'Tomatoes', category: 'vegetables', price: 250, image: 'https://images.unsplash.com/photo-1592841494240-92d7d651fc45?w=400&h=300&fit=crop' },
    { id: 2, name: 'Carrots', category: 'vegetables', price: 180, image: 'https://images.unsplash.com/photo-1585518419759-77fbd7d1f0bf?w=400&h=300&fit=crop' },
    { id: 3, name: 'Broccoli', category: 'vegetables', price: 320, image: 'https://images.unsplash.com/photo-1583285694395-8daf3d08471c?w=400&h=300&fit=crop' },
    { id: 4, name: 'Bell Peppers', category: 'vegetables', price: 380, image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33bd1?w=400&h=300&fit=crop' },
    { id: 5, name: 'Apples', category: 'fruits', price: 220, image: 'https://images.unsplash.com/photo-1560806e614de1200309ca8216e8440531c15ec6?w=400&h=300&fit=crop' },
    { id: 6, name: 'Bananas', category: 'fruits', price: 150, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop' },
    { id: 7, name: 'Oranges', category: 'fruits', price: 280, image: 'https://images.unsplash.com/photo-1582979696075-33d80c24b46e?w=400&h=300&fit=crop' },
    { id: 8, name: 'Strawberries', category: 'fruits', price: 450, image: 'https://images.unsplash.com/photo-1585518419759-77fbd7d1f0bf?w=400&h=300&fit=crop' },
    { id: 9, name: 'Milk', category: 'dairy', price: 380, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop' },
    { id: 10, name: 'Cheese', category: 'dairy', price: 580, image: 'https://images.unsplash.com/photo-1452894169989-597421aeb8c5?w=400&h=300&fit=crop' },
    { id: 11, name: 'Yogurt', category: 'dairy', price: 280, image: 'https://images.unsplash.com/photo-1488527266792-59a38f1e3ad5?w=400&h=300&fit=crop' },
    { id: 12, name: 'Butter', category: 'dairy', price: 420, image: 'https://images.unsplash.com/photo-1452894169989-597421aeb8c5?w=400&h=300&fit=crop' },
    { id: 13, name: 'Orange Juice', category: 'beverages', price: 320, image: 'https://images.unsplash.com/photo-1600271886742-f049cd1f3af0?w=400&h=300&fit=crop' },
    { id: 14, name: 'Coffee', category: 'beverages', price: 650, image: 'https://images.unsplash.com/photo-1559056169-641ef2588b48?w=400&h=300&fit=crop' },
    { id: 15, name: 'Tea', category: 'beverages', price: 380, image: 'https://images.unsplash.com/photo-1597318086132-e5b43e9914bc?w=400&h=300&fit=crop' },
    { id: 16, name: 'Water', category: 'beverages', price: 180, image: 'https://images.unsplash.com/photo-1570970336561-f994cac2a2d2?w=400&h=300&fit=crop' }
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
    alert(`Thank you for your order!\nTotal: Rs.${total.toFixed(2)}\n\nYour order will be delivered soon!`);
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

// Handle loyalty registration
function handleLoyaltyRegistration(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = event.target.elements[0].value;
    const email = event.target.elements[1].value;
    const phone = event.target.elements[2].value;
    const tier = event.target.elements[4].value;
    
    alert(`Welcome to FreshMart Loyalty Program, ${name}!\n\nMembership Tier: ${tier.charAt(0).toUpperCase() + tier.slice(1)}\nA confirmation email has been sent to: ${email}\n\nStart earning rewards today!`);
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
