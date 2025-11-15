let shop = document.getElementById("shop");
let categoriesContainer = document.getElementById("categories");
let dealsContainer = document.getElementById("deals");

// --- 1. RENDER CATEGORIES ---
let generateCategories = () => {
    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = categoriesData.map((cat) => {
        return `
            <a href="#" class="category-card reveal">
                <i class="fa-solid ${cat.icon}"></i>
                <p>${cat.name}</p>
            </a>
        `;
    }).join("");
};

// --- 2. RENDER DEALS GRID ---
let generateDeals = () => {
    if (!dealsContainer) return;

    dealsContainer.innerHTML = dealsData.map((deal) => {
        return `
            <div class="deal-card reveal" style="background-color: ${deal.color};">
                <h3>${deal.title}</h3>
                <p>${deal.text}</p>
                <a href="#"><i class="fa-solid fa-arrow-right"></i> Shop Now</a>
            </div>
        `;
    }).join("");
};

// Global variable to store the current product set to display (from previous steps)
let displayedProducts = shopItemsData;

// --- 3. RENDER FEATURED PRODUCTS (Updated to include Wishlist check) ---
let generateShop = () => {
    if (!shop) return;

    // Use the filtered list (or the full list by default)
    shop.innerHTML = displayedProducts.map((product) => {
        let { id, name, price, desc, img } = product;
        let search = basket.find((x) => x.id === id) || {};
        let itemQuantity = search.item === undefined ? 0 : search.item;

        // CHECK WISHLIST STATE: If the product ID is in the global wishlist array, set the class 'wishlisted'
        let isWishlisted = wishlist.includes(id) ? 'wishlisted' : '';

        return `
        <div id="product-id-${id}" class="product-card reveal">
            <a href="product-detail.html?id=${id}" class="product-image-link">
                <img src="${img}" alt="${name}" class="product-image">
            </a>
            <div class="product-details">
                <a href="product-detail.html?id=${id}" class="product-title-link">
                    <h3>${name}</h3>
                </a>
                <p class="product-description">${desc.substring(0, 50)}...</p> 
                <div class="product-footer">
                    <span class="product-price">₹ ${price}.00</span>
                    
                    <button onclick="addToWishlist('${id}'); generateShop();" 
                            class="wishlist-btn ${isWishlisted}" 
                            title="Add to Wishlist">
                        <i class="fa-solid fa-heart"></i>
                    </button>

                    <button onclick="handleAddToCart('${id}', event)" class="add-to-cart-btn">
    <i class="fa-solid fa-cart-plus"></i> Add
</button>
                </div>
                <div class="in-cart-count">
                    ${itemQuantity > 0 ? `<i class="fa-solid fa-check"></i> ${itemQuantity} in cart` : ''}
                </div>
            </div>
        </div>
        `;
    }).join("");

    if (displayedProducts.length === 0) {
        shop.innerHTML = "<p class='no-results'>No products found matching your search criteria.</p>";
    }
};

// --- NEW WRAPPER FUNCTION FOR VISUAL FEEDBACK ---
const handleAddToCart = (id, event) => {
    // 1. Run the core logic from cart.js (defined in previous steps)
    addToCart(id);

    // 2. Get the button element that was clicked
    const button = event.currentTarget;

    // 3. Apply the feedback class and text
    button.classList.add('added-feedback');
    button.innerHTML = '<i class="fa-solid fa-check"></i> Added!';

    // 4. Reset the button after 1.5 seconds
    setTimeout(() => {
        button.classList.remove('added-feedback');
        button.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add';
    }, 1500);
};
window.handleAddToCart = handleAddToCart; // Make accessible globally      

// --- 4. NEW FEATURE: SEARCH FUNCTION ---
const performSearch = () => {
    const query = document.getElementById('searchInput').value.toLowerCase();

    // Filter the original shopItemsData based on the query
    const results = shopItemsData.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
    );

    // Update the global variable
    displayedProducts = results;

    // Re-render the shop section with only the results
    generateShop();

    // Scroll to the shop section to see results immediately
    document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });

    // Display a reset button if search was performed
    if (query !== "") {
        if (!document.getElementById('search-reset-btn')) {
            const container = document.getElementById('shop-section').querySelector('h2');
            container.insertAdjacentHTML('afterend', '<button id="search-reset-btn" onclick="resetSearch()" class="reset-btn"><i class="fa-solid fa-times"></i> Clear Search</button>');
        }
    }
};
window.performSearch = performSearch;

// --- 5. RESET SEARCH FUNCTION ---
const resetSearch = () => {
    document.getElementById('searchInput').value = '';
    displayedProducts = shopItemsData;
    generateShop();
    const resetButton = document.getElementById('search-reset-btn');
    if (resetButton) {
        resetButton.remove();
    }
};
window.resetSearch = resetSearch;

// --- Initialize with full product list ---
// (Ensure generateShop is called at the end of script.js)
generateCategories();
generateDeals();
generateShop();

// --- ADVANCED SCROLL REVEAL LOGIC ---
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150; // Trigger point

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            // Optional: Remove this else block if you want items to stay visible once revealed
            reveals[i].classList.remove('active'); 
        }
    }
}
// Trigger the reveal function once on page load to show top items immediately
reveal();
