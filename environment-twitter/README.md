# 🌱 EcoTwitter - Environment-Themed Twitter Clone

A modern, decentralization-ready social web application focused on environmental awareness and action.

## 📋 Project Overview

**EcoTwitter** is a Twitter-like platform where users can:
- Post short text messages with images
- Share environmental initiatives and climate action updates
- Create and join eco-focused groups
- Chat with other environmental advocates
- Discover trending environmental topics
- Maintain detailed profiles
- Follow other users interested in sustainability

The platform is designed with **decentralization in mind**, allowing content and identity to be managed via Web3 and IPFS in the future.

---

## 🏗️ Architecture Overview

### 4-Layer Design

```
┌─────────────────────────────────────┐
│   Presentation Layer (HTML & CSS)   │
├─────────────────────────────────────┤
│   Logic Layer (JavaScript)          │
├─────────────────────────────────────┤
│   Data Layer (JSON / LocalStorage)  │
├─────────────────────────────────────┤
│   Identity Layer (Web3/IPFS-Ready)  │
└─────────────────────────────────────┘
```

---

## 📁 Project Structure

```
environment-twitter/
├── index.html              # Home feed (main page)
├── login.html              # User authentication
├── post.html               # Create new posts
├── profile.html            # User profile page
├── groups.html             # Browse all groups
├── group.html              # Single group page
├── chat.html               # Direct messaging
├── explore.html            # Discover content
│
├── css/
│   ├── style.css           # Global styles & layout
│   ├── feed.css            # Feed & tweet styling
│   ├── profile.css         # Profile page styles
│   ├── group.css           # Group UI styles
│   └── chat.css            # Chat UI styles
│
├── js/
│   ├── app.js              # Core utilities & global state
│   ├── auth.js             # Authentication logic (Web3/Email)
│   ├── post.js             # Create & manage posts
│   ├── feed.js             # Load & render feeds
│   ├── profile.js          # User profile management
│   ├── groups.js           # Group creation & browsing
│   ├── chat.js             # Messaging system
│   └── storage.js          # IPFS-ready storage layer
│
├── data/
│   ├── users.json          # Sample user data
│   ├── posts.json          # Sample posts
│   └── groups.json         # Sample groups
│
├── assets/
│   ├── images/
│   │   ├── logo.png        # Application logo
│   │   └── default-avatar.png
│   └── icons/              # UI icons
│
└── README.md               # This file
```

---

## 🖥️ Core Pages

### **index.html** - Home Feed
- Displays latest environment-related posts
- Shows user's timeline with text + image posts
- Filter by hashtags
- Like, reply, and repost functionality

### **login.html** - Authentication
- Web3 wallet login (MetaMask integration)
- Email-based login
- Guest browsing mode
- Account creation flow

### **post.html** - Create Post
- Text input (280 character limit)
- Image upload
- Hashtag addition
- Location tagging
- Group selection

### **profile.html** - User Profile
- Profile picture & bio
- Follower/following count
- User's posts, groups, and likes
- Edit profile functionality

### **groups.html** - Group Directory
- Browse all eco-groups
- Search groups
- View group members and activity
- Join groups

### **group.html** - Single Group Page
- Group information & description
- Group-specific feed
- Member statistics
- Group chat

### **chat.html** - Messaging
- One-to-one conversations
- Group messaging
- Message history
- Real-time notifications

### **explore.html** - Discovery
- Trending hashtags
- Popular topics
- Active groups
- Recommended users
- Advanced search

---

## 🎨 CSS Architecture

| File | Purpose |
|------|---------|
| **style.css** | Global colors, fonts, layout, responsive design |
| **feed.css** | Tweet cards, feed layout, trending sidebar |
| **profile.css** | Profile header, stats, tabs |
| **group.css** | Group cards, group detail page |
| **chat.css** | Chat bubbles, conversation list, message styling |

---

## ⚙️ JavaScript Modules

### **app.js** - Core Utilities
- Global state management (`APP` object)
- Sample data loading
- Shared utilities (formatting, HTML creation)
- Action handlers (like, share, reply)

### **auth.js** - Authentication
- Web3 wallet connection
- Email login/signup
- Guest mode
- Session management via localStorage

### **post.js** - Post Creation
- Form validation
- Image preview
- Character counting
- Post submission & storage

### **feed.js** - Feed Management
- Load posts from storage
- Render feed dynamically
- Hashtag filtering
- Trending topics
- Explore content loading

### **profile.js** - Profile Management
- Load user profile data
- Display user posts/groups/likes
- Edit profile
- Share profile

### **groups.js** - Group Management
- Display group list
- Search groups
- View group details
- Join groups
- Create new groups

### **chat.js** - Messaging
- Load conversations
- Display messages
- Send new messages
- Conversation management

### **storage.js** - Decentralized Storage
- LocalStorage abstraction layer
- IPFS-ready structure
- Hash generation
- Data sync capability
- Easy migration path to Web3

---

## 🔐 Authentication Flow

### **Web3 Wallet (Recommended)**
1. User clicks "Connect Wallet"
2. MetaMask popup appears
3. User approves connection
4. Wallet address becomes user ID
5. User profile created automatically

### **Email-Based (Demo)**
1. User enters email & username
2. Account created locally
3. Stored in localStorage
4. Can later migrate to blockchain

### **Guest Mode**
- Browse without account
- Read-only access
- No posting or following

---

## 📊 Data Model

### User Object
```json
{
  "id": "unique_id",
  "name": "User Name",
  "handle": "@username",
  "avatar": "url",
  "email": "optional",
  "wallet": "0x...",
  "bio": "Bio text",
  "followers": 100,
  "following": 50,
  "posts": 25,
  "likes": []
}
```

### Post Object
```json
{
  "id": 1,
  "author": "Name",
  "handle": "@handle",
  "text": "Post content",
  "image": "url",
  "hashtags": ["#tag1", "#tag2"],
  "location": "Location",
  "timestamp": "2 hours ago",
  "likes": 50,
  "replies": 10,
  "reposts": 5
}
```

### Group Object
```json
{
  "id": 1,
  "name": "Group Name",
  "icon": "🌍",
  "description": "Description",
  "members": 1000,
  "posts": 500,
  "founded": "2023-01-15"
}
```

---

## 🌐 Decentralization Roadmap

### Phase 1: Current (Local Storage)
- ✅ All data stored locally
- ✅ No server required
- ✅ Easy to understand & develop

### Phase 2: Next (IPFS)
- [ ] Posts stored on IPFS
- [ ] Content hashing for verification
- [ ] Distributed storage
- [ ] Censorship-resistant

### Phase 3: Web3 Identity
- [ ] Wallet-based authentication
- [ ] User profiles on blockchain
- [ ] Smart contracts for groups
- [ ] Token rewards

### Phase 4: Full Decentralization
- [ ] DAO governance
- [ ] Decentralized moderation
- [ ] User-owned data
- [ ] No single point of failure

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: MetaMask extension for Web3 features

### Installation
1. Download/clone the project
2. Open `login.html` in your browser
3. Choose login method:
   - Connect MetaMask wallet
   - Use email
   - Browse as guest
4. Start exploring!

### Local Development
```bash
# No build step required!
# Simply open files in browser or use a local server

# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx serve

# Option 3: VS Code
# Install "Live Server" extension and right-click index.html
```

Then visit: `http://localhost:8000`

---

## 💡 Key Features

### ✅ Fully Implemented
- User authentication (email & guest)
- Post creation with hashtags
- Feed with filtering
- User profiles
- Group browsing
- Messaging interface
- Explore/discover
- Responsive design

### 🔄 Ready for Extension
- Web3 wallet integration
- IPFS storage
- Smart contracts
- Push notifications
- Real-time updates
- Advanced search

---

## 🎯 Use Cases

1. **Climate Activists** - Share climate action initiatives
2. **Environmental Organizations** - Coordinate campaigns
3. **Students** - Learn about sustainability
4. **Communities** - Organize local eco-projects
5. **Researchers** - Share findings on environmental issues

---

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: LocalStorage (migratable to IPFS)
- **Identity**: Web3 Ready (MetaMask compatible)
- **Design Pattern**: Modular architecture
- **Responsive**: Mobile-first approach

### Why This Stack?
- ✅ No dependencies = easy to learn
- ✅ Fast performance
- ✅ Easy to understand & modify
- ✅ Perfect for demos & learning
- ✅ Production-ready foundation

---

## 🎓 Educational Value

### Great for Learning:
- JavaScript fundamentals
- DOM manipulation
- localStorage & data persistence
- Web3 integration basics
- Responsive web design
- Component-based architecture
- Git/version control

### Perfect for:
- Portfolio projects
- Capstone projects
- Hackathons
- Web development bootcamps
- Interview prep

---

## 🤝 Contributing

Suggestions for improvements:
1. Add dark mode
2. Implement real-time notifications
3. Add image gallery feature
4. Create mobile app with React Native
5. Integrate actual IPFS
6. Add video support
7. Create AI-powered suggestions

---

## 📄 License

This project is open source and available for educational use.

---

## 👥 Author

Created as an environment-focused social platform for the modern web.

---

## 🌍 Mission

**To democratize environmental activism through a decentralized social platform where anyone can share, connect, and take action for climate and sustainability.**

### Remember:
> "The greatest threat to our planet is the belief that someone else will save it." - Robert Swan

Let's build a better future, together. 🌱

---

## 📞 Support

For questions or issues:
1. Check existing code comments
2. Review the HTML for structure
3. Test in browser DevTools
4. Customize as needed

---

## 🎉 Thank You!

Thank you for using EcoTwitter. We hope this platform inspires environmental action and community building!

**Together, we can make a difference.** 🌎♻️🌱
