/* ========================================
   POST.JS - CREATE & UPLOAD POSTS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    setupPostForm();
});

function setupPostForm() {
    const postForm = document.getElementById('postForm');
    const postText = document.getElementById('postText');
    const charCount = document.getElementById('charCount');
    const imageInput = document.getElementById('postImage');
    const imagePreview = document.getElementById('imagePreview');
    
    // Character counter
    if (postText) {
        postText.addEventListener('input', () => {
            charCount.textContent = postText.value.length;
        });
    }
    
    // Image preview
    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Form submission
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitPost();
        });
    }
}

function submitPost() {
    const postText = document.getElementById('postText').value;
    const postHashtags = document.getElementById('postHashtags').value;
    const postLocation = document.getElementById('postLocation').value;
    const postGroup = document.getElementById('postGroup').value;
    const imageInput = document.getElementById('postImage');
    
    if (!postText.trim()) {
        alert('Please write something!');
        return;
    }
    
    // Parse hashtags
    const hashtags = postHashtags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
    
    // Handle image conversion
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            // Create post with base64 image
            const newPost = {
                id: APP.posts.length + 1,
                author: APP.currentUser ? APP.currentUser.name : 'Anonymous',
                handle: APP.currentUser ? APP.currentUser.handle : '@anonymous',
                avatar: APP.currentUser ? APP.currentUser.avatar : 'assets/images/default-avatar.svg',
                text: postText,
                image: event.target.result, // Base64 image data
                hashtags: hashtags,
                location: postLocation || null,
                group: postGroup || null,
                timestamp: 'now',
                likes: 0,
                replies: 0,
                reposts: 0,
                liked: false
            };
            
            savePost(newPost);
            showNotification('Post published successfully!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        };
        reader.readAsDataURL(file);
    } else {
        // No image - create post immediately
        const newPost = {
            id: APP.posts.length + 1,
            author: APP.currentUser ? APP.currentUser.name : 'Anonymous',
            handle: APP.currentUser ? APP.currentUser.handle : '@anonymous',
            avatar: APP.currentUser ? APP.currentUser.avatar : 'assets/images/default-avatar.svg',
            text: postText,
            image: null,
            hashtags: hashtags,
            location: postLocation || null,
            group: postGroup || null,
            timestamp: 'now',
            likes: 0,
            replies: 0,
            reposts: 0,
            liked: false
        };
        
        savePost(newPost);
        showNotification('Post published successfully!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

function savePost(post) {
    // Add to APP posts
    APP.posts.unshift(post);
    
    // Update user post count
    if (APP.currentUser) {
        APP.currentUser.posts = (APP.currentUser.posts || 0) + 1;
        localStorage.setItem('currentUser', JSON.stringify(APP.currentUser));
    }
    
    // Save to localStorage (for demo)
    localStorage.setItem('posts', JSON.stringify(APP.posts));
    
    console.log('Post saved:', post);
}

console.log('Post module loaded');
