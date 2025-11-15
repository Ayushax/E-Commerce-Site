// --- 1. Initial Setup ---
let shippingData = {};
let paymentData = {};

// Define steps globally
const step1 = document.getElementById('shipping-form');
const step2 = document.getElementById('payment-form');
const step3 = document.getElementById('review-step');

const indicator1 = document.getElementById('step-1');
const indicator2 = document.getElementById('step-2');
const indicator3 = document.getElementById('step-3');

// Currency Formatter
const formatCurrency = window.formatINR || ((amount) => "₹ " + amount); 


// --- 2. Navigation Logic ---

function updateStepUI(stepNumber) {
    // Reset all to hidden first
    step1.classList.add('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');

    // Reset indicators
    indicator1.classList.remove('active');
    indicator2.classList.remove('active');
    indicator3.classList.remove('active');

    // Show the correct step
    if (stepNumber === 1) {
        step1.classList.remove('hidden');
        indicator1.classList.add('active');
    } else if (stepNumber === 2) {
        step2.classList.remove('hidden');
        indicator1.classList.add('active');
        indicator2.classList.add('active');
    } else if (stepNumber === 3) {
        step3.classList.remove('hidden');
        indicator1.classList.add('active');
        indicator2.classList.add('active');
        indicator3.classList.add('active');
    }
}

// Make this global so the "Edit" buttons work
window.goToStep = function(step) {
    updateStepUI(step);
};


// --- 3. DIRECT FORM HANDLERS (Connected via onsubmit) ---

// Step 1: Shipping Submit
window.handleShipping = function(e) {
    e.preventDefault(); // STOPS PAGE RELOAD

    // Capture Data
    shippingData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        address1: document.getElementById('address1').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        phone: document.getElementById('phone').value,
    };

    console.log("Shipping Saved, moving to Payment...");
    updateStepUI(2); // Go to Step 2
};

// Step 2: Payment Submit
window.handlePayment = function(e) {
    e.preventDefault(); // STOPS PAGE RELOAD

    // Capture Data
    paymentData = {
        method: document.querySelector('input[name="paymentMethod"]:checked').value,
        cardNumber: document.getElementById('cardNumber').value.slice(-4), 
    };

    console.log("Payment Saved, moving to Review...");
    renderReview(); // Build the review HTML
    updateStepUI(3); // Go to Step 3
};


// --- 4. Review & Calculation Logic ---

function calculateFinalTotal() {
    if (basket.length === 0) return 0;
    return basket.map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || { price: 0 };
        return item * search.price;
    }).reduce((x, y) => x + y, 0);
}

function renderReview() {
    // Render Shipping
    document.getElementById('review-shipping').innerHTML = `
        <strong>${shippingData.fullName}</strong><br>
        ${shippingData.address1}<br>
        ${shippingData.city}, ${shippingData.zip}<br>
        ${shippingData.phone}
    `;

    // Render Payment
    document.getElementById('review-payment').innerText = 
        paymentData.method === 'card' ? `Card ending in **** ${paymentData.cardNumber}` : `PayPal`;

    // Render Items
    const reviewItemsContainer = document.getElementById('review-items');
    let itemHTML = basket.map((item) => {
        const product = shopItemsData.find(p => p.id === item.id) || {};
        return `
            <div class="review-item-card">
                <img src="${product.img}" alt="${product.name}" class="review-item-img">
                <div class="review-item-details">
                    <span class="review-item-name">${product.name}</span>
                    <span class="review-item-qty">Qty: ${item.item}</span>
                </div>
                <span class="review-item-total">${formatCurrency(item.item * product.price)}</span>
            </div>
        `;
    }).join('');
    reviewItemsContainer.innerHTML = itemHTML;

    // Render Total
    const total = calculateFinalTotal();
    document.getElementById('review-total').innerHTML = `<div class="review-total-box">Grand Total: ${formatCurrency(total)}</div>`;
    
    // Setup Place Order Button
    const placeBtn = document.getElementById('place-order-btn');
    placeBtn.innerHTML = `Place Order (${formatCurrency(total)})`;
    
    // Attach Click Event to Place Order (One-time attachment)
    placeBtn.onclick = function() {
        alert(`Order Placed Successfully! Total: ${formatCurrency(total)}`);
        localStorage.removeItem("data");
        window.location.href = 'index.html';
    };
}


// --- 5. Initialization ---
// Ensure cart isn't empty
if (basket.length === 0) {
    alert("Cart is empty");
    window.location.href = 'cart.html';
} else {
    updateStepUI(1);
}