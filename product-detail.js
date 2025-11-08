// This script assumes data.js has run and 'products' array is available.
const contentContainer = document.getElementById('product-detail-content');

// 1. Get the Product ID from the URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')); 
}

// 2. Find the Product in the Array
function getProductDetails(id) {
    return products.find(product => product.id === id);
}

// 3. Render the Details to the Page
function renderProduct(product) {
    contentContainer.innerHTML = '';

    if (!product) {
        contentContainer.innerHTML = '<h1>Product Not Found</h1><p>Sorry, the product you requested could not be located.</p>';
        return;
    }

    // Template Literals for the detailed layout
    const detailHTML = `
        <div class="product-detail-layout">
            <div class="product-image-area">
                <img src="${product.image}" alt="${product.name}" style="max-width: 100%; border-radius: 8px;">
            </div>
            
            <div class="product-info-area">
                <h1>${product.name}</h1>
                <p class="category">Category: ${product.category}</p>
                <h2 class="price">$${product.price.toFixed(2)}</h2>
                
                <hr>
                
                <p>${product.description}</p>
                
                <div class="actions">
                    <button class="cta-button" id="detail-add-to-cart">Add to Cart</button>
                    <span class="favorite-btn" style="font-size: 2em; margin-left: 20px;">♡</span>
                </div>

                <div class="specs-section">
                    <h3>Specifications</h3>
                    <ul>
                        <li>Brand: MockTech</li>
                        <li>Warranty: 1 Year</li>
                        <li>Detailed Spec: ${product.description.split('.')[0]}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    contentContainer.innerHTML = detailHTML;
    
    // Add simple alert for cart on this page
    document.getElementById('detail-add-to-cart').addEventListener('click', () => {
        alert(`${product.name} added to cart!`);
    });
}


// --- EXECUTION ---
const productId = getProductIdFromUrl();
const product = getProductDetails(productId);
renderProduct(product);