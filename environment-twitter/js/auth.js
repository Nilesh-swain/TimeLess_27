/* ========================================
   AUTH.JS - LOGIN & IDENTITY LOGIC
   ======================================== */

// Web3 Wallet Connection
async function connectWallet() {
    try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0];
            
            // Create user from wallet
            const user = {
                id: Math.random().toString(36).substr(2, 9),
                name: `Eco User ${walletAddress.substr(0, 6)}`,
                handle: `@ecouser_${walletAddress.substr(2, 8)}`,
                avatar: 'assets/images/default-avatar.svg',
                wallet: walletAddress,
                email: null,
                bio: 'Environmental advocate using Web3 identity',
                followers: 0,
                following: 0,
                posts: 0,
                likes: []
            };
            
            loginUser(user);
        } else {
            alert('MetaMask not installed. Please install MetaMask to connect your wallet.');
        }
    } catch (error) {
        console.error('Wallet connection failed:', error);
        alert('Failed to connect wallet. Using demo mode instead.');
        loginAsGuest();
    }
}

// Guest Login
function loginAsGuest() {
    const randomId = Math.random().toString(36).substr(2, 9);
    const user = {
        id: randomId,
        name: `Guest User`,
        handle: `@guest_${randomId}`,
        avatar: 'assets/images/default-avatar.svg',
        email: null,
        wallet: null,
        bio: 'Guest browsing the environmental community',
        followers: 0,
        following: 0,
        posts: 0,
        likes: [],
        isGuest: true
    };
    
    loginUser(user);
}

// Save user session
function loginUser(user) {
    APP.currentUser = user;
    APP.isLoggedIn = true;
    
    // Save to local storage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to home
    window.location.href = 'index.html';
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        APP.currentUser = null;
        APP.isLoggedIn = false;
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Check if user is logged in
function isUserLoggedIn() {
    return APP.isLoggedIn && APP.currentUser !== null;
}

// Get current user
function getCurrentUser() {
    return APP.currentUser;
}

// Update user profile
function updateUserProfile(userData) {
    if (APP.currentUser) {
        APP.currentUser = { ...APP.currentUser, ...userData };
        localStorage.setItem('currentUser', JSON.stringify(APP.currentUser));
        showNotification('Profile updated successfully!');
    }
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('currentUser');
    if (user && !window.location.pathname.includes('login.html')) {
        APP.currentUser = JSON.parse(user);
        APP.isLoggedIn = true;
    }
});

console.log('Auth module loaded');
