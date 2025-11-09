// --- Initial Setup and State ---
let currentStep = 1;
const stepContainers = [
    document.getElementById('shipping-form'),
    document.getElementById('payment-form'),
    document.getElementById('review-step')
];
const stepIndicators = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3')
];
let shippingData = {};
let paymentData = {};

// Re-use the basket and TotalAmount logic from cart.js
let basket = JSON.parse(localStorage.getItem("data")) || [];


// --- Step Navigation Functions ---

/**
 * Updates the UI to show the current step and hide others.
 * @param {number} step - The step number (1, 2, or 3).
 */
const updateStepUI = (step) => {
    currentStep = step;
    stepContainers.forEach((container, index) => {
        if (index + 1 === step) {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    });

    stepIndicators.forEach((indicator, index) => {
        if (index + 1 <= step) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
};

/** Public function for back/edit buttons */
const goToStep = (step) => {
    updateStepUI(step);
};
// Attach goToStep globally so it works with inline HTML events
window.goToStep = goToStep;


// --- Form Submission Handlers ---

document.getElementById('shipping-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // 1. Capture shipping data
    shippingData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        address1: document.getElementById('address1').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        phone: document.getElementById('phone').value,
    };
    // 2. Move to next step
    updateStepUI(2);
});

document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // 1. Capture payment data
    paymentData = {
        method: document.querySelector('input[name="paymentMethod"]:checked').value,
        cardNumber: document.getElementById('cardNumber').value.slice(-4), // Only save last 4 digits
        cardName: document.getElementById('cardName').value,
    };
    // 2. Load review details and move to next step
    renderReview();
    updateStepUI(3);
});


// --- Review and Summary ---

const calculateFinalTotal = () => {
    // Re-use logic from cart.js TotalAmount, but return the value
    if (basket.length === 0) return 0;
    
    return basket.map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || { price: 0 };
        return item * search.price;
    }).reduce((x, y) => x + y, 0);
};


const renderReview = () => {
    // A. RENDER SHIPPING
    document.getElementById('review-shipping').innerHTML = `
        ${shippingData.fullName} (${shippingData.phone})<br>
        ${shippingData.address1}<br>
        ${shippingData.city}, ${shippingData.zip}
    `;

    // B. RENDER PAYMENT
    let paymentText = paymentData.method === 'card' 
        ? `Visa ending in **** ${paymentData.cardNumber}` 
        : `PayPal Account`;
    document.getElementById('review-payment').innerText = paymentText;
    
// C. RENDER ITEMS
    const reviewItemsContainer = document.getElementById('review-items');
    let itemHTML = basket.map((item) => {
        const product = shopItemsData.find(p => p.id === item.id) || {};
        
        // Ensure formatINR is available (it should be, if defined in cart.js and loaded before checkout.js)
        const itemLineTotal = item.item * product.price;

        return `
            <div class="review-item-card">
                <img src="${product.img}" alt="${product.name}" class="review-item-img">
                <div class="review-item-details">
                    <span class="review-item-name">${product.name}</span>
                    <span class="review-item-qty">Qty: ${item.item} x ${formatINR(product.price)}</span>
                </div>
                <span class="review-item-total">${formatINR(itemLineTotal)}</span>
            </div>
        `;
    }).join('');
    reviewItemsContainer.innerHTML = itemHTML;
    
    // D. RENDER TOTAL (Update to use formatINR)
    const total = calculateFinalTotal();
    document.getElementById('final-total').innerText = formatINR(total);

    // Update the button text as well (if needed, but formatINR handles the symbol)
    document.getElementById('place-order-btn').innerHTML = `
        Place Order (${formatINR(total)})
    `;
};


// --- Final Actions ---

document.getElementById('place-order-btn').addEventListener('click', () => {
    if (basket.length === 0) {
        alert("Your cart is empty! Cannot place order.");
        return;
    }
    
    // 1. SIMULATE ORDER PLACEMENT
    alert(`Order of $${calculateFinalTotal().toFixed(2)} placed successfully! (This is a frontend simulation)`);

    // 2. CLEAR CART AND REDIRECT
    basket = [];
    localStorage.removeItem("data"); // Remove the basket from local storage
    window.location.href = 'index.html'; // Redirect to home or a thank you page
});


// --- Initialize Step 1 on Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Ensure cart is not empty before starting checkout
    if (basket.length === 0) {
        alert("Your cart is empty. Redirecting to cart page.");
        window.location.href = 'cart.html'; 
    } else {
        updateStepUI(1);
        updateCartIcon(); // Ensure header cart count is correct
    }
});