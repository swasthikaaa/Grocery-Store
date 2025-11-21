// Load Orders from localStorage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersList = document.getElementById("ordersList");

    // Clear previous content
    ordersList.innerHTML = '';

    if (orders.length === 0) {
        ordersList.innerHTML = "<p>No orders placed yet.</p>";
        return;
    }

    let html = `<table class="orders-table">
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Date & Time</th>
                <th>Total (Rs.)</th>
                <th>Items</th>
            </tr>
        </thead>
        <tbody>
    `;

    orders.forEach(order => {
        html += `
            <tr>
                <td>#${order.id}</td>
                <td>${order.placedAt}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                    <ul>
                        ${order.items.map(item => `<li>${item.name} x ${item.quantity}</li>`).join('')}
                    </ul>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    ordersList.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', loadOrders);
