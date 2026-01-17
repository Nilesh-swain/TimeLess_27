/* ========================================
   STORAGE.JS - DECENTRALIZED STORAGE LOGIC
   ======================================== */

// Storage abstraction layer for IPFS-ready data handling

class Storage {
    // Store data locally (for now) - can be replaced with IPFS later
    static async save(key, data) {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
            console.log(`Data saved to ${key}`);
            return { success: true, hash: this.generateHash(jsonData) };
        } catch (error) {
            console.error('Storage save error:', error);
            return { success: false, error: error.message };
        }
    }

    // Retrieve data locally (for now) - can be replaced with IPFS later
    static async retrieve(key) {
        try {
            const data = localStorage.getItem(key);
            if (data) {
                return { success: true, data: JSON.parse(data) };
            }
            return { success: false, error: 'Data not found' };
        } catch (error) {
            console.error('Storage retrieve error:', error);
            return { success: false, error: error.message };
        }
    }

    // Save to IPFS (future implementation)
    static async saveToIPFS(data) {
        // This would integrate with IPFS in production
        // For now, we save locally and generate a simulated IPFS hash
        const jsonData = JSON.stringify(data);
        const hash = this.generateHash(jsonData);
        
        // Save with IPFS-like structure
        localStorage.setItem(`ipfs_${hash}`, jsonData);
        
        console.log(`Data saved to IPFS with hash: ${hash}`);
        return { hash, data };
    }

    // Retrieve from IPFS (future implementation)
    static async retrieveFromIPFS(hash) {
        const data = localStorage.getItem(`ipfs_${hash}`);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    // Generate simulated hash (would be actual IPFS hash in production)
    static generateHash(data) {
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return 'Qm' + Math.abs(hash).toString(16).padStart(44, '0');
    }

    // Save post to IPFS-ready storage
    static async savePost(post) {
        try {
            const result = await this.saveToIPFS(post);
            
            // Save post reference
            const posts = await this.retrieve('posts') || { data: [] };
            posts.data.push(result.hash);
            await this.save('posts', posts);
            
            return result;
        } catch (error) {
            console.error('Error saving post:', error);
            return { success: false, error };
        }
    }

    // Retrieve post from IPFS-ready storage
    static async retrievePost(hash) {
        try {
            const post = await this.retrieveFromIPFS(hash);
            return { success: true, data: post };
        } catch (error) {
            console.error('Error retrieving post:', error);
            return { success: false, error };
        }
    }

    // Save user profile to decentralized storage
    static async saveProfile(userProfile) {
        try {
            // Add creation timestamp
            userProfile.lastUpdated = new Date().toISOString();
            
            const result = await this.saveToIPFS(userProfile);
            
            // Link to user wallet address if available
            if (userProfile.wallet) {
                const userIndex = `user_${userProfile.wallet}`;
                await this.save(userIndex, { profileHash: result.hash });
            }
            
            return result;
        } catch (error) {
            console.error('Error saving profile:', error);
            return { success: false, error };
        }
    }

    // Sync data across devices (via IPFS in future)
    static async syncData() {
        try {
            // Get all data
            const allData = {
                posts: await this.retrieve('posts'),
                user: await this.retrieve('currentUser'),
                groups: await this.retrieve('groups'),
                timestamp: new Date().toISOString()
            };
            
            // Save sync record
            const syncHash = await this.saveToIPFS(allData);
            console.log('Data synced:', syncHash);
            
            return syncHash;
        } catch (error) {
            console.error('Sync error:', error);
            return { success: false, error };
        }
    }

    // Delete data
    static async delete(key) {
        try {
            localStorage.removeItem(key);
            console.log(`Data deleted: ${key}`);
            return { success: true };
        } catch (error) {
            console.error('Delete error:', error);
            return { success: false, error };
        }
    }

    // Clear all data
    static async clearAll() {
        if (confirm('Are you sure? This will delete all local data.')) {
            try {
                localStorage.clear();
                console.log('All data cleared');
                return { success: true };
            } catch (error) {
                console.error('Clear error:', error);
                return { success: false, error };
            }
        }
    }
}

// Export for use in other modules
console.log('Storage module loaded - Ready for decentralization!');
