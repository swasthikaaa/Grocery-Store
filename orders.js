// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

// Load Orders from localStorage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersList = document.getElementById("ordersList");

    if (orders.length === 0) {
        ordersList.innerHTML = "<p>No orders placed yet.</p>";
        return;
    }

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

document.addEventListener('DOMContentLoaded', loadOrders);
