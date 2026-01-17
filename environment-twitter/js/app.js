/* ========================================
   APP.JS - COMMON UTILITIES & GLOBAL STATE
   ======================================== */

// Global state
const APP = {
    currentUser: null,
    posts: [],
    users: [],
    groups: [],
    conversations: [],
    isLoggedIn: false
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
        APP.currentUser = JSON.parse(user);
        APP.isLoggedIn = true;
    } else {
        // Redirect to login if not on login page
        if (!window.location.pathname.includes('login.html')) {
            // Allow access to demo without login for now
            // window.location.href = 'login.html';
        }
    }
    
    // Load sample data
    loadSampleData();
}

// Load sample data from data files
function loadSampleData() {
    // Sample posts
    APP.posts = [
        {
            id: 1,
            author: 'Eco Warrior',
            handle: '@ecowarrior',
            avatar: 'assets/images/default-avatar.svg',
            text: 'Just planted 100 trees in our community garden! Every action counts towards a greener future. 🌱🌳',
            image: null,
            hashtags: ['#TreePlanting', '#ClimateAction', '#Community'],
            location: 'Central Park',
            timestamp: '2 hours ago',
            likes: 234,
            replies: 45,
            reposts: 67,
            liked: false
        },
        {
            id: 2,
            author: 'Green Advocate',
            handle: '@greenadvocate',
            avatar: 'assets/images/avatar2.svg',
            text: 'Did you know? Reducing plastic use by just 50% can save tons of ocean waste annually. Let\'s make the switch! 🌍♻️',
            image: 'assets/images/post-recycle.svg',
            hashtags: ['#ZeroWaste', '#PlasticFree', '#SustainableLiving'],
            location: 'Global',
            timestamp: '4 hours ago',
            likes: 567,
            replies: 89,
            reposts: 234,
            liked: false
        },
        {
            id: 3,
            author: 'Solar Power Fan',
            handle: '@solarpowerfan',
            avatar: 'assets/images/avatar3.svg',
            text: 'Our school just installed solar panels! Reduced electricity costs by 40% and we\'re teaching kids about renewable energy. Win-win! ☀️',
            image: 'assets/images/post-solar.svg',
            hashtags: ['#RenewableEnergy', '#SolarPower', '#Education'],
            location: 'Boston, MA',
            timestamp: '6 hours ago',
            likes: 412,
            replies: 67,
            reposts: 145,
            liked: false
        }
    ];

    // Sample users
    APP.users = [
        { id: 1, name: 'Eco Warrior', handle: '@ecowarrior', avatar: 'assets/images/avatar1.svg', bio: 'Passionate about environmental sustainability' },
        { id: 2, name: 'Green Advocate', handle: '@greenadvocate', avatar: 'assets/images/avatar2.svg', bio: 'Fighting for a plastic-free world' },
        { id: 3, name: 'Solar Power Fan', handle: '@solarpowerfan', avatar: 'assets/images/avatar3.svg', bio: 'Advocate for renewable energy' }
    ];

    // Sample groups
    APP.groups = [
        {
            id: 1,
            name: 'Climate Action Club',
            icon: '🌍',
            description: 'Global community dedicated to climate change awareness and action',
            members: 2340,
            posts: 5620
        },
        {
            id: 2,
            name: 'Zero Waste Community',
            icon: '♻️',
            description: 'Share tips for reducing, reusing, and recycling',
            members: 1850,
            posts: 3420
        },
        {
            id: 3,
            name: 'Ocean Cleanup Initiative',
            icon: '🌊',
            description: 'Protecting our oceans from plastic pollution',
            members: 945,
            posts: 2100
        },
        {
            id: 4,
            name: 'Urban Gardening',
            icon: '🌱',
            description: 'Growing food in cities for sustainability',
            members: 1200,
            posts: 1890
        }
    ];

    // Sample conversations
    APP.conversations = [
        {
            id: 1,
            participant: 'Green Advocate',
            lastMessage: 'That\'s a great idea!',
            timestamp: 'Today',
            unread: true
        },
        {
            id: 2,
            participant: 'Solar Power Fan',
            lastMessage: 'Let\'s organize that event',
            timestamp: 'Yesterday',
            unread: false
        }
    ];
}

// Utility: Format number to K, M format
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
}

// Utility: Get random user
function getRandomUser() {
    return APP.users[Math.floor(Math.random() * APP.users.length)];
}

// Utility: Create tweet element
function createTweetElement(post) {
    const tweetHTML = `
        <div class="feed-item">
            <div class="feed-item-content">
                <div class="feed-item-avatar">
                    <img src="${post.avatar}" alt="${post.author}">
                </div>
                <div class="feed-item-body">
                    <div class="feed-item-header">
                        <span class="feed-item-author">${post.author}</span>
                        <span class="feed-item-handle">${post.handle}</span>
                        <span class="feed-item-timestamp">${post.timestamp}</span>
                    </div>
                    <div class="feed-item-text">${escapeHtml(post.text)}</div>
                    ${post.image ? `<img src="${post.image}" alt="Post image" class="feed-item-image">` : ''}
                    ${post.location ? `<div class="feed-item-location">📍 ${post.location}</div>` : ''}
                    ${post.hashtags && post.hashtags.length > 0 ? `
                        <div class="feed-item-hashtags">
                            ${post.hashtags.map(tag => `<a href="#" class="hashtag">${tag}</a>`).join('')}
                        </div>
                    ` : ''}
                    <div class="feed-item-actions">
                        <button class="feed-action-btn" onclick="replyToPost(${post.id})">
                            <span>💬</span> <span>${formatNumber(post.replies)}</span>
                        </button>
                        <button class="feed-action-btn" onclick="reposts(${post.id})">
                            <span>🔄</span> <span>${formatNumber(post.reposts)}</span>
                        </button>
                        <button class="feed-action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(this, ${post.id})">
                            <span>${post.liked ? '❤️' : '🤍'}</span> <span>${formatNumber(post.likes)}</span>
                        </button>
                        <button class="feed-action-btn" onclick="sharePost(${post.id})">
                            <span>📤</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return tweetHTML;
}

// Utility: Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Action: Toggle like
function toggleLike(btn, postId) {
    const post = APP.posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        
        const likeSpan = btn.querySelector('span:nth-child(2)');
        const icon = btn.querySelector('span:nth-child(1)');
        
        icon.textContent = post.liked ? '❤️' : '🤍';
        likeSpan.textContent = formatNumber(post.likes);
        btn.classList.toggle('liked');
    }
}

// Action: Reply to post
function replyToPost(postId) {
    alert('Reply functionality coming soon!');
}

// Action: Repost
function reposts(postId) {
    alert('Repost functionality coming soon!');
}

// Action: Share post
function sharePost(postId) {
    alert('Share functionality coming soon!');
}

// Navigation
function goBack() {
    window.history.back();
}

// Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Deactivate all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Activate selected button
    event.target.classList.add('active');
}

// Explore tab switching
function switchExploreTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.explore-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Deactivate all buttons
    const buttons = document.querySelectorAll('.explore-tabs .tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Activate selected button
    event.target.classList.add('active');
}

console.log('App initialized with sample data');
