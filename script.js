// Global DOM references and state variables
let cartItemCount = 0;
const cartCountElement = document.getElementById('cart-count');

// Grids and buttons references
const shopNowBtn = document.getElementById('shopNowBtn');
const featureProductsSection = document.getElementById('featureProductsSection');
const allProductsSection = document.getElementById('allProductsSection');
const featureGrid = document.getElementById('featureGrid');
const allProductsGrid = document.getElementById('allProductsGrid');

const searchInput = document.getElementById('product-search');


function addToCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Find if product already in cart
  const existingItemIndex = cartItems.findIndex(item => item.id === productId);

  if (existingItemIndex > -1) {
    // Increase quantity for existing item
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // Add new item as object with quantity 1
    cartItems.push({id: productId, quantity: 1});
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// --- PRODUCTS ARRAYS ---

// Use your existing products array; add `isFeatured` property for featured products
const featuredProducts = products.filter(p => p.isFeatured);

// Now you can use featuredProducts inside your renderFeaturedProducts() function:
function renderFeaturedProducts() {
  const featureGrid = document.getElementById('featureGrid');
  featureGrid.innerHTML = featuredProducts.map(createProductCard).join('');
  setupEventListeners();
}
// --- RENDER FUNCTION ---
function createProductCard(product) {
    return `
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
        </div>`;
}

function renderProductsGrid(gridElement, productArray) {
    gridElement.innerHTML = productArray.map(createProductCard).join('');
    setupEventListeners(); // Attach buttons listeners after rendering
}

// Render featured products first
function renderFeaturedProducts() {
    renderProductsGrid(featureGrid, featuredProducts);
}

// Render all products
function renderAllProducts() {
    renderProductsGrid(allProductsGrid, products);
}

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px;">Your cart is empty</td></tr>`;
    return;
  }

  cartItems.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    const subtotal = product.price * item.quantity;

    cartItemsContainer.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button class="remove-btn" data-id="${product.id}">Remove</button></td>
      </tr>
    `;
  });

  // call add listeners for remove buttons here
  setupRemoveButtons();
}

function setupRemoveButtons() {
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(btn => {
    btn.onclick = function() {
      const id = Number(this.getAttribute('data-id'));
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems = cartItems.filter(item => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      renderCart();
    };
  });
}


// --- EVENT LISTENER SETUP AND HANDLERS ---
function setupEventListeners() {
    const allAddToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const allFavoriteBtns = document.querySelectorAll('.favorite-btn');

    allAddToCartBtns.forEach(button => {
        button.removeEventListener('click', handleAddToCart);
        button.addEventListener('click', handleAddToCart);
    });

    allFavoriteBtns.forEach(button => {
        button.removeEventListener('click', handleFavoriteToggle);
        button.addEventListener('click', handleFavoriteToggle);
    });
}

function handleAddToCart(event) {
  const productId = Number(event.target.getAttribute('data-product-id'));
  addToCart(productId);

  // Update UI: increment cart count, disable button etc
  cartItemCount += 1;
  cartCountElement.innerText = cartItemCount;
  event.target.style.opacity = '0.5';
  event.target.innerText = 'Added!';
  event.target.style.pointerEvents = 'none';
}


function handleFavoriteToggle(event) {
    const button = event.target;
    button.classList.toggle('favorited');
    button.innerText = button.classList.contains('favorited') ? '❤️' : '♡';
}

// --- SEARCH FILTER ---

searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase().trim();
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value) ||
        product.description.toLowerCase().includes(value)
    );
    // Show filtered products in the "all products" grid
    if (filtered.length > 0) {
        allProductsSection.style.display = 'block';
        featureProductsSection.style.display = 'none';
        shopNowBtn.style.display = 'none';
        renderProductsGrid(allProductsGrid, filtered);
    } else {
        allProductsGrid.innerHTML = `<p>No products found.</p>`;
    }
});

// --- SHOP NOW BUTTON ---
shopNowBtn.addEventListener('click', function () {
    shopNowBtn.style.display = "none";
    featureProductsSection.style.display = "none";
    allProductsSection.style.display = "block";
    renderAllProducts();
});

// --- INITIALIZATION ON PAGE LOAD ---
renderFeaturedProducts();

