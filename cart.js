// Example structure for cart items in localStorage: [{id: 3, quantity: 2}, {id: 1, quantity: 1}]

// Simulate login status (use your actual auth logic here)
const isUserLoggedIn = false; // change to true when user logs in!

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const checkoutMessageContainer = document.getElementById('checkout-message');

function renderCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px;">Your cart is empty.</td></tr>`;
        checkoutMessageContainer.style.display = 'none';
        return;
    }

    // Iterate over items (find product info by id)
    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const subtotal = product.price * item.quantity;
        const row = `
        <tr>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><button class="remove-btn" data-id="${product.id}">Remove</button></td>
        </tr>`;
        cartItemsContainer.innerHTML += row;
    });

    if (!isUserLoggedIn) {
        checkoutMessageContainer.style.display = 'block';
        checkoutMessageContainer.innerText = "Please log in to proceed to checkout.";
    } else {
        checkoutMessageContainer.style.display = 'none';
    }
}

// Call once on page load
renderCart();

// Additional: add event listeners for “Remove” buttons, quantity change, etc. (not shown here)
