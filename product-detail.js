let detailContainer = document.getElementById("product-detail-view");

/**
 * 1. Get Product ID from URL
 * 2. Find Product Data
 * 3. Render Detail View
 */
let loadProductDetails = () => {
    // 1. Get the URL parameters (the ID is passed via index.html link)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Handle case where no ID is found (e.g., user navigated directly)
    if (!productId) {
        detailContainer.innerHTML = "<h1>Product not found. Please return to the <a href='index.html'>homepage</a>.</h1>";
        return;
    }

    // 2. Find the product object in the shopItemsData array
    let product = shopItemsData.find((item) => item.id === productId);

    if (!product) {
        detailContainer.innerHTML = "<h1>Product data not available.</h1>";
        return;
    }

    // Update the page title
    document.getElementById("pageTitle").innerText = product.name;

    // 3. Render the detail view
    // Check cart for current quantity (reusing logic from cart.js/script.js)
    let search = basket.find((x) => x.id === product.id) || {};
    let itemQuantity = search.item === undefined ? 0 : search.item;

    detailContainer.innerHTML = `
        <div class="detail-wrapper">
            
            <div class="detail-image-area">
                <img src="${product.img}" alt="${product.name}" class="detail-main-image">
                </div>

            <div class="detail-info-area">
                <h1 class="product-name">${product.name}</h1>
                <p class="product-id">SKU: ${product.id}</p>
                
                <h2 class="product-price-large">₹ ${product.price}.00</h2>
                
                <p class="product-description-full">${product.desc}
                    <br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
                
                <div class="purchase-controls">
                    <button onclick="addToCart('${product.id}')" class="add-to-cart-large-btn">
                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                    
                    <div class="current-quantity-text">
                        ${itemQuantity > 0 ? `<i class="fa-solid fa-check-circle"></i> ${itemQuantity} currently in your cart` : 'Not yet added to cart'}
                    </div>
                </div>

                <ul class="spec-list">
                    <li><i class="fa-solid fa-tag"></i> **Material:** 100% Original Product</li>
                    <li><i class="fa-solid fa-truck"></i> **Shipping:** Free 3-Day Shipping</li>
                    <li><i class="fa-solid fa-rotate-left"></i> **Returns:** 10-Day Money Back Guarantee</li>
                </ul>

            </div>
        </div>
    `;
};

loadProductDetails();