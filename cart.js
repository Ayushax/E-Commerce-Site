// Retrieve basket from Local Storage, or use an empty array
let basket = JSON.parse(localStorage.getItem("data")) || [];

let shoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");


const formatINR = (amount) => {
    // Note: 'en-IN' locale uses the Indian numbering system (lakhs/crores)
    // 'currencyDisplay: "symbol"' shows the ₹ symbol.
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0 // Optional: Remove decimal if prices are integers
    }).format(amount);
};
window.formatINR = formatINR; // Make globally accessible for other scripts

// --- NEW WISHLIST DATA & LOGIC ---
// Retrieve wishlist from Local Storage, or use an empty array
let wishlist = JSON.parse(localStorage.getItem("gadgetzhub_wishlist")) || [];

/**
 * Adds an item to the wishlist and updates the icon.
 * @param {string} id - The unique ID of the product.
 */
let addToWishlist = (id) => {
    let selectedItem = id;
    let search = wishlist.find((x) => x === selectedItem);

    if (search === undefined) {
        // Item is new, add the ID
        wishlist.push(selectedItem);
        alert("Product added to Wishlist!");
    } else {
        // Item exists, remove it (toggle feature)
        wishlist = wishlist.filter((x) => x !== selectedItem);
        alert("Product removed from Wishlist!");
    }

    // Always update the display and save the state
    updateWishlistIcon();
    localStorage.setItem("gadgetzhub_wishlist", JSON.stringify(wishlist));
    
    // Optional: Re-render the shop/detail page to update the icon color
    // If on the detail page, you might call loadProductDetails() here.
};
window.addToWishlist = addToWishlist; // Make globally accessible

/**
 * Updates the quantity on the wishlist icon in the header.
 */
let updateWishlistIcon = () => {
    let wishlistIcon = document.getElementById("wishlistAmount");
    if (wishlistIcon) {
        wishlistIcon.innerHTML = wishlist.length;
    }
};

updateWishlistIcon(); // Initial call to set the number on page load

// --- END NEW WISHLIST LOGIC ---

/**
 * Updates the quantity on the cart icon in the header.
 * (Kept from previous steps)
 */
let updateCartIcon = () => {
    let cartIcon = document.getElementById("cartAmount");
    let totalItems = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    cartIcon.innerHTML = totalItems;
};

updateCartIcon(); // Initial call

/**
 * 1. ADD: Adds or increments an item in the cart. 
 * (Used by index.html and product-detail.html)
 */
let addToCart = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if (search === undefined) {
        basket.push({ id: selectedItem, item: 1 });
    } else {
        search.item += 1;
    }
    
    // Rerender cart if we are on the cart page
    if (shoppingCart) {
        generateCartItems();
    }
    
    updateCartIcon();
    localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * 2. DECREMENT: Decreases the item quantity in the basket.
 */
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if (search === undefined) return; // Item not found
    
    if (search.item === 0) return; // Can't go below zero
    
    search.item -= 1;

    // Filter out items with quantity 0 and update storage
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));

    // Rerender and recalculate totals
    generateCartItems();
    updateCartIcon();
};


/**
 * 3. REMOVE: Removes a product entirely from the cart.
 */
let removeItem = (id) => {
    let selectedItem = id;
    
    // Filter out the selected item by ID
    basket = basket.filter((x) => x.id !== selectedItem);
    
    // Rerender and recalculate totals
    generateCartItems();
    updateCartIcon();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * 4. RENDER: Generates the HTML for all items currently in the basket.
 */
let generateCartItems = () => {
    if (basket.length !== 0) {
        // Map over the basket array to create HTML for each item
        shoppingCart.innerHTML = basket.map((basketItem) => {
            // Find the full product data from the master data.js array
            let { id, item } = basketItem;
            let search = shopItemsData.find((product) => product.id === id) || [];
            let { img, name, price } = search; // Destructure product details

            // Generate HTML for a single cart item
            return `
            <div class="cart-item">
                <img width="100" src="${img}" alt="${name}" />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">₹ ${price}.00</p>
                        </h4>
                        <i onclick="removeItem('${id}')" class="fa-solid fa-xmark"></i>
                    </div>

                    <div class="cart-buttons">
                        <i onclick="decrement('${id}')" class="fa-solid fa-minus"></i>
                        <div id="${id}" class="quantity">${item}</div>
                        <i onclick="addToCart('${id}')" class="fa-solid fa-plus"></i>
                    </div>
                <p class="cart-item-price">${formatINR(price)}</p>
                <h3>${formatINR(item * price)}</h3> </div>
            </div>
            `;
        }).join("");
    } else {
        // Display if the cart is empty
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2 class="cart-empty-message">Your Cart is Empty</h2>
        <a href="index.html">
            <button class="home-btn">Browse Products</button>
        </a>
        `;
    }
    // Always call TotalAmount after rendering items
    TotalAmount(); 
};

/**
 * 5. TOTAL CALCULATION: Calculates and displays the grand total and checkout button.
 */
let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0); // Sum all line totals

        label.innerHTML = `
        <div class="cart-summary-box">
            <h2>Cart Total: ${formatINR(amount)}</h2>
            <button class="checkout-btn">Proceed to Checkout</button>
            <button onclick="clearCart()" class="clear-cart-btn">Clear Cart</button>
        </div>
        `;
    } else {
        // Clear summary box if cart is empty
        label.innerHTML = ``;
    }
};

/**
 * 6. CLEAR: Clears the entire cart.
 */
let clearCart = () => {
    basket = [];
    localStorage.setItem("data", JSON.stringify(basket));
    // Rerender the empty cart view
    generateCartItems();
    updateCartIcon();
};

// Initiate the cart rendering when cart.html loads
if (document.getElementById("shopping-cart")) {
    generateCartItems();
}

// Note: If you want to visually update the quantity box on index.html when pressing +/- 
// on the cart page, you would need to also update the quantity display element in script.js 
// after calling addToCart/decrement.