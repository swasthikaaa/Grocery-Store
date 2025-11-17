// Sample product data with SVG fallback images
const products = [
    { id: 1, name: 'Tomatoes', category: 'vegetables', price: 250, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23FF6B6B%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3ETomatoes%3C/text%3E%3Ccircle cx=%22200%22 cy=%22150%22 r=%2260%22 fill=%22%23C1272D%22 opacity=%220.5%22/%3E%3C/svg%3E' },
    { id: 2, name: 'Carrots', category: 'vegetables', price: 180, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23FF9F43%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3ECarrots%3C/text%3E%3Crect x=%22150%22 y=%22120%22 width=%22100%22 height=%2280%22 fill=%22%23E67E22%22 rx=%2210%22/%3E%3C/svg%3E' },
    { id: 3, name: 'Broccoli', category: 'vegetables', price: 320, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%222ECC71%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3EBroccoli%3C/text%3E%3Ccircle cx=%22200%22 cy=%22180%22 r=%2250%22 fill=%221E8449%22 opacity=%220.6%22/%3E%3C/svg%3E' },
    { id: 4, name: 'Bell Peppers', category: 'vegetables', price: 380, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23F39C12%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3EBell Peppers%3C/text%3E%3Crect x=%22140%22 y=%22140%22 width=%22120%22 height=%22100%22 fill=%22%23D68910%22 rx=%2215%22/%3E%3C/svg%3E' },
    { id: 5, name: 'Apples', category: 'fruits', price: 220, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23E74C3C%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3EApples%3C/text%3E%3Ccircle cx=%22200%22 cy=%22170%22 r=%2255%22 fill=%22%23C0392B%22 opacity=%220.5%22/%3E%3C/svg%3E' },
    { id: 6, name: 'Bananas', category: 'fruits', price: 150, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23F1C40F%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23333%22 font-weight=%22bold%22%3EBananas%3C/text%3E%3Cpath d=%22M 150 200 Q 200 100 250 200%22 stroke=%22%23F4D03F%22 stroke-width=%2220%22 fill=%22none%22 stroke-linecap=%22round%22/%3E%3C/svg%3E' },
    { id: 7, name: 'Oranges', category: 'fruits', price: 280, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23E67E22%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3EOranges%3C/text%3E%3Ccircle cx=%22200%22 cy=%22170%22 r=%2250%22 fill=%22%23D35400%22 opacity=%220.5%22/%3E%3C/svg%3E' },
    { id: 8, name: 'Strawberries', category: 'fruits', price: 450, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23E91E63%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3EStrawberries%3C/text%3E%3Cpolygon points=%22200,120 230,180 270,180 240,210 260,270 200,230 140,270 160,210 130,180 170,180%22 fill=%22%23C2185B%22 opacity=%220.5%22/%3E%3C/svg%3E' },
    { id: 9, name: 'Milk', category: 'dairy', price: 380, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ECF0F1%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23333%22 font-weight=%22bold%22%3EMilk%3C/text%3E%3Crect x=%22140%22 y=%22130%22 width=%22120%22 height=%22120%22 fill=%22%23BDC3C7%22 rx=%2210%22/%3E%3C/svg%3E' },
    { id: 10, name: 'Cheese', category: 'dairy', price: 580, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23F4D03F%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23333%22 font-weight=%22bold%22%3ECheese%3C/text%3E%3Crect x=%22150%22 y=%22140%22 width=%22100%22 height=%2290%22 fill=%22%23F39C12%22 rx=%225%22/%3E%3C/svg%3E' },
    { id: 11, name: 'Yogurt', category: 'dairy', price: 280, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23BDC3C7%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3EYogurt%3C/text%3E%3Cellipse cx=%22200%22 cy=%22190%22 rx=%2275%22 ry=%2260%22 fill=%2395A5A6%22 opacity=%220.5%22/%3E%3C/svg%3E' },
    { id: 12, name: 'Butter', category: 'dairy', price: 420, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23F8C471%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23333%22 font-weight=%22bold%22%3EButter%3C/text%3E%3Crect x=%22140%22 y=%22130%22 width=%22120%22 height=%22100%22 fill=%22%23F5B041%22 rx=%2210%22/%3E%3C/svg%3E' },
    { id: 13, name: 'Orange Juice', category: 'beverages', price: 320, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23FF8C42%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2236%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3EOrange Juice%3C/text%3E%3Crect x=%22150%22 y=%22140%22 width=%22100%22 height=%22110%22 fill=%22%23F39C12%22 rx=%2210%22/%3E%3C/svg%3E' },
    { id: 14, name: 'Coffee', category: 'beverages', price: 650, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%238B4513%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3ECoffee%3C/text%3E%3Ccircle cx=%22200%22 cy=%22170%22 r=%2245%22 fill=%226F4E37%22 opacity=%220.5%22/%3E%3C/svg%3E' },
    { id: 15, name: 'Tea', category: 'beverages', price: 380, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23D2B48C%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23333%22 font-weight=%22bold%22%3ETea%3C/text%3E%3Cellipse cx=%22200%22 cy=%22180%22 rx=%2270%22 ry=%2250%22 fill=%22%23BC8F8F%22 opacity=%220.5%22/%3E%3C/svg%3E' },
    { id: 16, name: 'Water', category: 'beverages', price: 180, image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%223498DB%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-weight=%22bold%22%3EWater%3C/text%3E%3Cpath d=%22M 150 150 Q 160 140 170 150 T 190 150 T 210 150 T 230 150 T 250 150%22 stroke=%222980B9%22 stroke-width=%223%22 fill=%22none%22/%3E%3C/svg%3E' }
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
