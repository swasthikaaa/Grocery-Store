// Sample product data with accurate category-specific product images
const products = [
    { id: 1, name: 'Tomatoes', category: 'vegetables', price: 250, image: 'https://via.placeholder.com/400x300?text=Tomatoes&bg=FF6B6B&fg=fff' },
    { id: 2, name: 'Carrots', category: 'vegetables', price: 180, image: 'https://via.placeholder.com/400x300?text=Carrots&bg=FF9F43&fg=fff' },
    { id: 3, name: 'Broccoli', category: 'vegetables', price: 320, image: 'https://via.placeholder.com/400x300?text=Broccoli&bg=2ECC71&fg=fff' },
    { id: 4, name: 'Bell Peppers', category: 'vegetables', price: 380, image: 'https://via.placeholder.com/400x300?text=Bell+Peppers&bg=F39C12&fg=fff' },
    { id: 5, name: 'Apples', category: 'fruits', price: 220, image: 'https://via.placeholder.com/400x300?text=Apples&bg=E74C3C&fg=fff' },
    { id: 6, name: 'Bananas', category: 'fruits', price: 150, image: 'https://via.placeholder.com/400x300?text=Bananas&bg=F1C40F&fg=333' },
    { id: 7, name: 'Oranges', category: 'fruits', price: 280, image: 'https://via.placeholder.com/400x300?text=Oranges&bg=E67E22&fg=fff' },
    { id: 8, name: 'Strawberries', category: 'fruits', price: 450, image: 'https://via.placeholder.com/400x300?text=Strawberries&bg=E91E63&fg=fff' },
    { id: 9, name: 'Milk', category: 'dairy', price: 380, image: 'https://via.placeholder.com/400x300?text=Milk&bg=ECF0F1&fg=333' },
    { id: 10, name: 'Cheese', category: 'dairy', price: 580, image: 'https://via.placeholder.com/400x300?text=Cheese&bg=F4D03F&fg=333' },
    { id: 11, name: 'Yogurt', category: 'dairy', price: 280, image: 'https://via.placeholder.com/400x300?text=Yogurt&bg=BDC3C7&fg=fff' },
    { id: 12, name: 'Butter', category: 'dairy', price: 420, image: 'https://via.placeholder.com/400x300?text=Butter&bg=F8C471&fg=333' },
    { id: 13, name: 'Orange Juice', category: 'beverages', price: 320, image: 'https://via.placeholder.com/400x300?text=Orange+Juice&bg=FF8C42&fg=fff' },
    { id: 14, name: 'Coffee', category: 'beverages', price: 650, image: 'https://via.placeholder.com/400x300?text=Coffee&bg=8B4513&fg=fff' },
    { id: 15, name: 'Tea', category: 'beverages', price: 380, image: 'https://via.placeholder.com/400x300?text=Tea&bg=D2B48C&fg=333' },
    { id: 16, name: 'Water', category: 'beverages', price: 180, image: 'https://via.placeholder.com/400x300?text=Water&bg=3498DB&fg=fff' }
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
