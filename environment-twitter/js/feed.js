/* ========================================
   FEED.JS - LOAD & RENDER FEED
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    loadAndRenderFeed();
    setupFilterListeners();
});

function loadAndRenderFeed() {
    const feedContainer = document.getElementById('feed');
    
    if (!feedContainer) return;
    
    // Load posts from localStorage or use sample data
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
        APP.posts = JSON.parse(savedPosts);
    }
    
    // Render feed
    renderFeed(APP.posts);
}

function renderFeed(posts) {
    const feedContainer = document.getElementById('feed');
    
    if (!feedContainer) return;
    
    if (posts.length === 0) {
        feedContainer.innerHTML = '<div class="loading">No posts yet. Be the first to post!</div>';
        return;
    }
    
    feedContainer.innerHTML = posts.map(post => createTweetElement(post)).join('');
}

function setupFilterListeners() {
    const hashtagFilter = document.getElementById('hashtagFilter');
    
    if (hashtagFilter) {
        hashtagFilter.addEventListener('input', (e) => {
            const filter = e.target.value.toLowerCase();
            
            if (!filter) {
                renderFeed(APP.posts);
                return;
            }
            
            const filtered = APP.posts.filter(post => {
                return post.text.toLowerCase().includes(filter) ||
                       (post.hashtags && post.hashtags.some(tag => 
                           tag.toLowerCase().includes(filter)
                       ));
            });
            
            renderFeed(filtered);
        });
    }
}

// Load trending topics
function loadTrendingTopics() {
    const trendingList = document.getElementById('trending-list');
    if (!trendingList) return;
    
    const trending = [
        { hashtag: '#ClimateAction', count: 145000 },
        { hashtag: '#ZeroWaste', count: 89000 },
        { hashtag: '#SolarPower', count: 67000 },
        { hashtag: '#PlantTrees', count: 54000 },
        { hashtag: '#OceanCleanup', count: 42000 }
    ];
    
    trendingList.innerHTML = trending.map(item => `
        <li>
            <a href="#" onclick="filterByHashtag('${item.hashtag}'); return false;">
                ${item.hashtag}
                <span class="trending-count">${formatNumber(item.count)} posts</span>
            </a>
        </li>
    `).join('');
}

function filterByHashtag(hashtag) {
    const filtered = APP.posts.filter(post => {
        return post.hashtags && post.hashtags.some(tag => 
            tag.toLowerCase() === hashtag.toLowerCase()
        );
    });
    
    const feedContainer = document.getElementById('feed');
    if (feedContainer) {
        renderFeed(filtered);
    }
}

// Load explore content
function loadExploreContent() {
    loadTrendingTopics();
    loadHashtags();
    loadExploreGroups();
    loadExplorePeople();
}

function loadHashtags() {
    const hashtagsList = document.getElementById('hashtagsList');
    if (!hashtagsList) return;
    
    const allHashtags = new Set();
    APP.posts.forEach(post => {
        if (post.hashtags) {
            post.hashtags.forEach(tag => allHashtags.add(tag));
        }
    });
    
    const hashtags = Array.from(allHashtags).map(tag => {
        const count = APP.posts.filter(p => 
            p.hashtags && p.hashtags.includes(tag)
        ).length;
        return { tag, count };
    }).sort((a, b) => b.count - a.count);
    
    hashtagsList.innerHTML = hashtags.map(item => `
        <div class="hashtag-item" onclick="filterByHashtag('${item.tag}')">
            <h3>${item.tag}</h3>
            <span class="trending-count">${item.count} posts</span>
        </div>
    `).join('');
}

function loadExploreGroups() {
    const groupsList = document.getElementById('groupsList');
    if (!groupsList) return;
    
    groupsList.innerHTML = APP.groups.map(group => `
        <div class="group-card" onclick="window.location.href='group.html?id=${group.id}'">
            <div class="group-card-icon">${group.icon}</div>
            <div class="group-card-name">${group.name}</div>
            <div class="group-card-description">${group.description}</div>
            <div class="group-card-meta">
                <span>${formatNumber(group.members)} members</span>
                <span>${formatNumber(group.posts)} posts</span>
            </div>
        </div>
    `).join('');
}

function loadExplorePeople() {
    const peopleList = document.getElementById('peopleList');
    if (!peopleList) return;
    
    peopleList.innerHTML = APP.users.map(user => `
        <div class="person-item">
            <img src="${user.avatar}" alt="${user.name}" class="avatar-small">
            <div class="person-info">
                <h4>${user.name}</h4>
                <p class="person-handle">${user.handle}</p>
                <p class="text-muted">${user.bio}</p>
            </div>
            <button class="person-btn" onclick="followUser('${user.id}')">Follow</button>
        </div>
    `).join('');
}

function followUser(userId) {
    event.stopPropagation();
    const user = APP.users.find(u => u.id === userId);
    if (user) {
        showNotification(`Now following ${user.name}`);
    }
}

console.log('Feed module loaded');
