// Global DOM references and state variables
let cartItemCount = 0;
const cartCountElement = document.getElementById('cart-count');
const productGrid = document.querySelector('.product-grid'); // Container for products


// --- 1. DYNAMIC RENDERING FUNCTION ---
function renderProducts() {
    productGrid.innerHTML = ''; 

    products.forEach(product => {
        // Builds the product card HTML using template literals
        const productCardHTML = `
            <div class="product-card" data-product-id="${product.id}">
                <a href="${product.link}">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                </a>
                <a href="${product.link}" style="text-decoration:none; color:#333;">
                    <h3>${product.name}</h3>
                </a>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                <span class="favorite-btn" data-product-id="${product.id}">♡</span>
            </div>
        `;
        
        productGrid.innerHTML += productCardHTML;
    });
    
    // Attach listeners after all cards are created
    setupEventListeners(); 
}


// --- 2. EVENT LISTENER SETUP AND HANDLERS ---
function setupEventListeners() {
    const allAddToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const allFavoriteBtns = document.querySelectorAll('.favorite-btn');
    
    // Attach listener for Add to Cart
    allAddToCartBtns.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // Attach listener for Favorite Toggle
    allFavoriteBtns.forEach(button => {
        button.addEventListener('click', handleFavoriteToggle);
    });
}

function handleAddToCart(event) {
    const btn = event.target;
    
    // Update the Cart Count
    cartItemCount += 1;
    cartCountElement.innerText = cartItemCount;
    
    // UI feedback: "disappear" effect
    btn.style.opacity = '0.5';
    btn.innerText = 'Added!';
    btn.style.pointerEvents = 'none';
}

function handleFavoriteToggle(event) {
    const button = event.target;
    button.classList.toggle('favorited');

    // Change the heart symbol
    button.innerText = button.classList.contains('favorited') ? '❤️' : '♡';
}


// --- EXECUTION: Start the process ---
renderProducts();