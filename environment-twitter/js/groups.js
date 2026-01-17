/* ========================================
   GROUPS.JS - GROUPS LOGIC
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const groupsList = document.getElementById('groupsList');
    const groupHeader = document.getElementById('groupHeader');
    
    if (groupsList) {
        loadGroupsList();
    }
    
    if (groupHeader) {
        loadGroupDetail();
    }
});

function loadGroupsList() {
    const groupsList = document.getElementById('groupsList');
    const groupSearch = document.getElementById('groupSearch');
    
    displayGroups(APP.groups);
    
    if (groupSearch) {
        groupSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = APP.groups.filter(group => 
                group.name.toLowerCase().includes(query) ||
                group.description.toLowerCase().includes(query)
            );
            displayGroups(filtered);
        });
    }
}

function displayGroups(groups) {
    const groupsList = document.getElementById('groupsList');
    
    if (groups.length === 0) {
        groupsList.innerHTML = '<div class="empty-state"><h3>No groups found</h3><p>Try a different search term</p></div>';
        return;
    }
    
    groupsList.innerHTML = groups.map(group => `
        <div class="group-card" onclick="viewGroup(${group.id})">
            <div class="group-card-icon">${group.icon}</div>
            <div class="group-card-name">${group.name}</div>
            <div class="group-card-description">${group.description}</div>
            <div class="group-card-meta">
                <span>${formatNumber(group.members)} members</span>
                <span>${formatNumber(group.posts)} posts</span>
            </div>
            <button class="group-card-action" onclick="event.stopPropagation(); joinGroup(${group.id})">
                Join Group
            </button>
        </div>
    `).join('');
}

function loadGroupDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = parseInt(urlParams.get('id')) || 1;
    
    const group = APP.groups.find(g => g.id === groupId);
    
    if (!group) {
        window.location.href = 'groups.html';
        return;
    }
    
    // Update header
    const groupHeader = document.getElementById('groupHeader');
    groupHeader.innerHTML = `
        <h2>${group.icon} ${group.name}</h2>
        <p>${group.description}</p>
    `;
    
    // Update info
    document.getElementById('groupAbout').textContent = group.description;
    document.getElementById('groupMembers').textContent = `Members: ${formatNumber(group.members)}`;
    
    // Load group posts
    loadGroupPosts(groupId);
}

function loadGroupPosts(groupId) {
    const groupFeed = document.getElementById('groupFeed');
    
    // Filter posts by group (for demo, just show all posts)
    const groupPosts = APP.posts.slice(0, 3);
    
    if (groupPosts.length === 0) {
        groupFeed.innerHTML = '<div class="empty-state"><h3>No posts yet</h3><p>Be the first to post in this group!</p></div>';
    } else {
        groupFeed.innerHTML = groupPosts.map(post => createTweetElement(post)).join('');
    }
}

function viewGroup(groupId) {
    window.location.href = `group.html?id=${groupId}`;
}

function joinGroup(groupId) {
    const group = APP.groups.find(g => g.id === groupId);
    if (group) {
        group.members += 1;
        showNotification(`Joined ${group.name}!`);
    }
}

function postToGroup() {
    window.location.href = 'post.html';
}

function createGroup() {
    const groupName = prompt('Enter group name:');
    if (groupName) {
        const newGroup = {
            id: APP.groups.length + 1,
            name: groupName,
            icon: '👥',
            description: 'A new eco community',
            members: 1,
            posts: 0
        };
        APP.groups.push(newGroup);
        showNotification(`Group "${groupName}" created!`);
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
}

console.log('Groups module loaded');
