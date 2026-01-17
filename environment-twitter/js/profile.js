/* ========================================
   PROFILE.JS - PROFILE DATA HANDLING
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
});

function loadUserProfile() {
    const user = APP.currentUser || APP.users[0]; // Use current user or demo user
    
    // Update profile header
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileHandle').textContent = user.handle;
    document.getElementById('profileBio').textContent = user.bio || 'Environmental advocate';
    
    // Update stats
    document.getElementById('followerCount').textContent = formatNumber(user.followers || 0);
    document.getElementById('followingCount').textContent = formatNumber(user.following || 0);
    document.getElementById('postCount').textContent = formatNumber(user.posts || 0);
    
    // Load user posts
    loadUserPosts(user.id);
    loadUserGroups(user.id);
    loadUserLikes(user.id);
}

function loadUserPosts(userId) {
    const userPostsContainer = document.getElementById('userPosts');
    
    // Filter posts by user
    const userPosts = APP.posts.filter(post => {
        // For demo, filter by handle
        return post.handle === (APP.users.find(u => u.id === userId) || {}).handle;
    });
    
    if (userPosts.length === 0) {
        userPostsContainer.innerHTML = '<div class="empty-state"><h3>No posts yet</h3><p>Start sharing your environmental initiatives!</p></div>';
    } else {
        userPostsContainer.innerHTML = userPosts.map(post => createTweetElement(post)).join('');
    }
}

function loadUserGroups(userId) {
    const userGroupsContainer = document.getElementById('userGroups');
    
    // For demo, show all groups (in real app, would filter by user membership)
    const userGroups = APP.groups.slice(0, 2);
    
    if (userGroups.length === 0) {
        userGroupsContainer.innerHTML = '<div class="empty-state"><h3>No groups joined</h3><p>Join groups to connect with others!</p></div>';
    } else {
        userGroupsContainer.innerHTML = userGroups.map(group => `
            <div class="group-card" onclick="window.location.href='group.html?id=${group.id}'">
                <div class="group-card-icon">${group.icon}</div>
                <div class="group-card-name">${group.name}</div>
                <div class="group-card-description">${group.description}</div>
            </div>
        `).join('');
    }
}

function loadUserLikes(userId) {
    const userLikesContainer = document.getElementById('userLikes');
    
    // Filter liked posts
    const likedPosts = APP.posts.filter(post => post.liked);
    
    if (likedPosts.length === 0) {
        userLikesContainer.innerHTML = '<div class="empty-state"><h3>No liked posts</h3><p>Like posts to save them here!</p></div>';
    } else {
        userLikesContainer.innerHTML = likedPosts.map(post => createTweetElement(post)).join('');
    }
}

function editProfile() {
    const newBio = prompt('Enter your bio:', APP.currentUser?.bio || '');
    if (newBio !== null) {
        if (APP.currentUser) {
            APP.currentUser.bio = newBio;
            updateUserProfile({ bio: newBio });
            location.reload();
        }
    }
}

function shareProfile() {
    const profileUrl = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: `${APP.currentUser?.name} - EcoTwitter`,
            text: `Check out ${APP.currentUser?.name}'s profile on EcoTwitter!`,
            url: profileUrl
        });
    } else {
        alert('Profile URL: ' + profileUrl);
    }
}

console.log('Profile module loaded');
