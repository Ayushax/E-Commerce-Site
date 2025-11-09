let accountContainer = document.getElementById('account-container');
const LOGGED_IN_KEY = 'gadgetzhub_loggedInUser'; // Local Storage Key

/**
 * 1. CHECKS AUTH STATE: Determines which view to show (Login or Dashboard).
 */
const checkAuthState = () => {
    const user = JSON.parse(localStorage.getItem(LOGGED_IN_KEY));
    if (user && user.email) {
        renderDashboard(user);
    } else {
        renderAuthForm('signin'); // Default to signin view
    }
};

/**
 * 2. RENDER AUTH FORMS: Displays the Sign In or Register Forms.
 * @param {string} view - 'signin' or 'register'.
 */
const renderAuthForm = (view) => {
    const isSignIn = view === 'signin';
    const title = isSignIn ? "Sign In" : "Create Account";
    const actionText = isSignIn ? "Continue" : "Register";
    const toggleText = isSignIn ? "New to GadgetzHub? Register here." : "Already have an account? Sign In.";
    const toggleView = isSignIn ? 'register' : 'signin';

    accountContainer.innerHTML = `
        <div class="auth-box">
            <h2>${title}</h2>

            <button class="social-btn apple-btn" onclick="socialLogin('Apple')">
                <i class="fa-brands fa-apple"></i> Continue with Apple
            </button>
            <button class="social-btn google-btn" onclick="socialLogin('Google')">
                <i class="fa-brands fa-google"></i> Continue with Google
            </button>

            <div class="divider">OR</div>

            <form id="auth-form">
                ${!isSignIn ? '<input type="text" id="username" placeholder="Name" required>' : ''}
                <input type="email" id="email" placeholder="Email Address" required>
                <input type="password" id="password" placeholder="Password" required>
                ${!isSignIn ? '<input type="password" id="confirm-password" placeholder="Confirm Password" required>' : ''}
                
                <button type="submit" class="auth-submit-btn">${actionText}</button>
            </form>

            <p class="toggle-view" onclick="renderAuthForm('${toggleView}')">${toggleText}</p>
        </div>
    `;

    document.getElementById('auth-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Basic frontend validation simulation
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = isSignIn ? 'User' : document.getElementById('username').value;
        
        if (password.length < 6) {
             alert("Password must be at least 6 characters.");
             return;
        }

        // Simulate successful login/registration
        simulateLogin(email, name, 'Traditional');
    });
};

/**
 * 3. SOCIAL LOGIN SIMULATION
 */
const socialLogin = (provider) => {
    // In a real app, this would trigger an OAuth flow.
    // Here, we simulate a successful login.
    const email = `testuser@${provider.toLowerCase()}.com`;
    simulateLogin(email, 'Social User', provider);
};
window.socialLogin = socialLogin; // Make available globally

/**
 * 4. FINAL LOGIN ACTION
 */
const simulateLogin = (email, name, method) => {
    const userObject = { 
        email: email, 
        name: name, 
        loginMethod: method, 
        dateJoined: new Date().toLocaleDateString()
    };
    
    localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(userObject));
    alert(`Welcome, ${name}! Logged in via ${method}.`);
    checkAuthState(); // Refresh to dashboard
};


/**
 * 5. RENDER DASHBOARD: The view after successful login.
 */
const renderDashboard = (user) => {
    // Get last 4 digits of email for display
    const emailPrefix = user.email.substring(0, 4); 

    accountContainer.innerHTML = `
        <div class="dashboard-box">
            <h2>Welcome Back, ${user.name}!</h2>
            <div class="dashboard-grid">

                <div class="dashboard-card primary">
                    <h3>Account Info</h3>
                    <p><strong>Email:</strong> ${emailPrefix}****@***.com</p>
                    <p><strong>Joined:</strong> ${user.dateJoined}</p>
                    <p><strong>Login Method:</strong> ${user.loginMethod}</p>
                    <button class="edit-btn"><i class="fa-solid fa-user-edit"></i> Edit Profile</button>
                </div>
                
                <div class="dashboard-card">
                    <h3>Your Orders</h3>
                    <p>You have <strong>3 past orders</strong>.</p>
                    <p class="small-text">Order #GZH452 (Dec 12, 2025) - Delivered</p>
                    <a href="#" class="view-link">View Order History</a>
                </div>

                <div class="dashboard-card">
                    <h3>Addresses</h3>
                    <p>1 default shipping address saved.</p>
                    <a href="#" class="view-link">Manage Addresses</a>
                </div>

                <div class="dashboard-card">
                    <h3>Payment Methods</h3>
                    <p>1 primary card saved.</p>
                    <a href="#" class="view-link">Manage Payments</a>
                </div>

            </div>
            <button class="logout-btn" onclick="logout()">
                <i class="fa-solid fa-sign-out-alt"></i> Sign Out
            </button>
        </div>
    `;
};


/**
 * 6. LOGOUT ACTION
 */
const logout = () => {
    localStorage.removeItem(LOGGED_IN_KEY);
    alert("You have been successfully signed out.");
    checkAuthState(); // Return to signin view
};
window.logout = logout; // Make available globally

// --- Initialize on Page Load ---
document.addEventListener('DOMContentLoaded', checkAuthState);