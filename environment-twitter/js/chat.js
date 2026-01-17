/* ========================================
   CHAT.JS - MESSAGING LOGIC
   ======================================== */

let currentConversation = null;

document.addEventListener('DOMContentLoaded', () => {
    loadConversations();
    setupChatInput();
});

function loadConversations() {
    const conversationsList = document.getElementById('conversationsList');
    
    if (APP.conversations.length === 0) {
        conversationsList.innerHTML = '<div class="loading">No conversations yet. Start a new chat!</div>';
        return;
    }
    
    conversationsList.innerHTML = APP.conversations.map(conv => `
        <div class="conversation-item" onclick="openConversation(${conv.id})">
            <div class="conversation-item-name">${conv.participant}</div>
            <div class="conversation-item-preview ${conv.unread ? 'conversation-item-unread' : ''}">
                ${conv.lastMessage}
            </div>
            <div class="conversation-item-time">${conv.timestamp}</div>
        </div>
    `).join('');
}

function openConversation(conversationId) {
    const conversation = APP.conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    currentConversation = conversation;
    
    // Mark as read
    conversation.unread = false;
    
    // Update UI
    const items = document.querySelectorAll('.conversation-item');
    items.forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Show chat window
    loadChatMessages();
    document.getElementById('chatInput').style.display = 'flex';
}

function loadChatMessages() {
    const chatWindow = document.getElementById('chatWindow');
    
    // Sample messages for demo
    const messages = [
        { id: 1, own: false, text: 'Hi! How are you?', timestamp: '10:30 AM' },
        { id: 2, own: true, text: 'Great! How are you doing?', timestamp: '10:31 AM' },
        { id: 3, own: false, text: 'Good! Did you see the latest post about ocean cleanup?', timestamp: '10:32 AM' },
        { id: 4, own: true, text: 'Yes! I found it really inspiring. Want to collaborate on a project?', timestamp: '10:33 AM' },
    ];
    
    chatWindow.innerHTML = messages.map(msg => `
        <div class="message ${msg.own ? 'own' : 'other'}">
            <div class="message-bubble">${escapeHtml(msg.text)}</div>
            <div class="message-timestamp">${msg.timestamp}</div>
        </div>
    `).join('');
    
    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function setupChatInput() {
    const messageInput = document.getElementById('messageInput');
    
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    if (!currentConversation) {
        alert('Please select a conversation first');
        return;
    }
    
    // Create message element
    const chatWindow = document.getElementById('chatWindow');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message own';
    messageDiv.innerHTML = `
        <div class="message-bubble">${escapeHtml(message)}</div>
        <div class="message-timestamp">now</div>
    `;
    chatWindow.appendChild(messageDiv);
    
    // Clear input
    messageInput.value = '';
    
    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
    
    // Update last message in conversation
    currentConversation.lastMessage = message;
    currentConversation.timestamp = 'now';
    
    // Show typing indicator (simulate)
    setTimeout(() => {
        const replyDiv = document.createElement('div');
        replyDiv.className = 'message other';
        replyDiv.innerHTML = `
            <div class="message-bubble">Thanks for the message! 😊</div>
            <div class="message-timestamp">now</div>
        `;
        chatWindow.appendChild(replyDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000);
}

function startNewChat() {
    const participantName = prompt('Enter participant name:');
    if (participantName) {
        const newConversation = {
            id: APP.conversations.length + 1,
            participant: participantName,
            lastMessage: 'No messages yet',
            timestamp: 'now',
            unread: false
        };
        APP.conversations.push(newConversation);
        loadConversations();
        showNotification(`Chat started with ${participantName}`);
    }
}

console.log('Chat module loaded');
