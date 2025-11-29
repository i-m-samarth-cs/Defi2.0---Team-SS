import CryptoJS from 'crypto-js';

const SECRET_KEY = 'web3-tutor-hub-secret-key';
const USERS_KEY = 'web3-tutor-users';
const CURRENT_USER_KEY = 'web3-tutor-current-user';
const CONVERSATIONS_KEY = 'web3-tutor-conversations';
const USER_PREFERENCES_KEY = 'web3-tutor-preferences';

// Hash password
export const hashPassword = (password) => {
  return CryptoJS.SHA256(password + SECRET_KEY).toString();
};

// Get all users from localStorage
export const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Save users to localStorage
export const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
};

// Register new user
export const registerUser = (email, password, name) => {
  try {
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(user => user.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);
    
    return { success: true, user: { ...newUser, passwordHash: undefined } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Login user
export const loginUser = (email, password) => {
  try {
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (user.passwordHash !== hashPassword(password)) {
      throw new Error('Invalid password');
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    saveUsers(users);

    // Save current user
    const userWithoutPassword = { ...user, passwordHash: undefined };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get current user
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Logout user
export const logoutUser = () => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// Conversation Management Functions

// Get all conversations for a user
export const getUserConversations = (userId) => {
  try {
    const conversations = localStorage.getItem(CONVERSATIONS_KEY);
    const allConversations = conversations ? JSON.parse(conversations) : {};
    return allConversations[userId] || [];
  } catch (error) {
    console.error('Error getting user conversations:', error);
    return [];
  }
};

// Save conversation for a user
export const saveUserConversation = (userId, conversation) => {
  try {
    const conversations = localStorage.getItem(CONVERSATIONS_KEY);
    const allConversations = conversations ? JSON.parse(conversations) : {};
    
    if (!allConversations[userId]) {
      allConversations[userId] = [];
    }
    
    // Add or update conversation
    const existingIndex = allConversations[userId].findIndex(c => c.id === conversation.id);
    if (existingIndex >= 0) {
      allConversations[userId][existingIndex] = conversation;
    } else {
      allConversations[userId].push(conversation);
    }
    
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(allConversations));
    return true;
  } catch (error) {
    console.error('Error saving conversation:', error);
    return false;
  }
};

// Delete conversation for a user
export const deleteUserConversation = (userId, conversationId) => {
  try {
    const conversations = localStorage.getItem(CONVERSATIONS_KEY);
    const allConversations = conversations ? JSON.parse(conversations) : {};
    
    if (allConversations[userId]) {
      allConversations[userId] = allConversations[userId].filter(c => c.id !== conversationId);
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(allConversations));
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return false;
  }
};

// Add message to conversation
export const addMessageToConversation = (userId, conversationId, message) => {
  try {
    const conversations = getUserConversations(userId);
    const conversation = conversations.find(c => c.id === conversationId);
    
    if (conversation) {
      conversation.messages.push({
        ...message,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      });
      conversation.updatedAt = new Date().toISOString();
      
      return saveUserConversation(userId, conversation);
    }
    
    return false;
  } catch (error) {
    console.error('Error adding message to conversation:', error);
    return false;
  }
};

// Create new conversation
export const createConversation = (userId, title = 'New Conversation') => {
  try {
    const conversation = {
      id: Date.now().toString(),
      userId,
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatar: 'ethereum', // default avatar
    };
    
    const success = saveUserConversation(userId, conversation);
    return success ? conversation : null;
  } catch (error) {
    console.error('Error creating conversation:', error);
    return null;
  }
};

// Parse uploaded conversation file
export const parseConversationFile = (fileContent) => {
  try {
    const lines = fileContent.split('\n').filter(line => line.trim());
    const messages = [];
    
    for (const line of lines) {
      // Match format: [2025-11-24T13:10:01.566Z] User: hello
      const match = line.match(/^\[([^\]]+)\]\s+(User|AI|Assistant):\s*(.+)$/);
      if (match) {
        const [, timestamp, role, content] = match;
        messages.push({
          id: Date.now().toString() + Math.random(),
          role: role.toLowerCase() === 'user' ? 'user' : 'assistant',
          content: content.trim(),
          timestamp: timestamp,
        });
      }
    }
    
    return messages;
  } catch (error) {
    console.error('Error parsing conversation file:', error);
    return [];
  }
};

// Import conversation from file
export const importConversation = (userId, fileContent, title) => {
  try {
    const messages = parseConversationFile(fileContent);
    if (messages.length === 0) {
      throw new Error('No valid messages found in file');
    }
    
    const conversation = {
      id: Date.now().toString(),
      userId,
      title: title || `Imported Conversation - ${new Date().toLocaleDateString()}`,
      messages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatar: 'ethereum',
      imported: true,
    };
    
    const success = saveUserConversation(userId, conversation);
    return success ? conversation : null;
  } catch (error) {
    console.error('Error importing conversation:', error);
    return null;
  }
};

// User Preferences Management

// Get user preferences
export const getUserPreferences = (userId) => {
  try {
    const preferences = localStorage.getItem(USER_PREFERENCES_KEY);
    const allPreferences = preferences ? JSON.parse(preferences) : {};
    return allPreferences[userId] || {
      theme: 'light',
      notifications: true,
      defaultChatAvatar: 'ethereum',
      autoSaveConversations: true,
    };
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return {
      theme: 'light',
      notifications: true,
      defaultChatAvatar: 'ethereum',
      autoSaveConversations: true,
    };
  }
};

// Save user preferences
export const saveUserPreferences = (userId, preferences) => {
  try {
    const allPreferences = localStorage.getItem(USER_PREFERENCES_KEY);
    const prefs = allPreferences ? JSON.parse(allPreferences) : {};
    
    prefs[userId] = { ...prefs[userId], ...preferences };
    
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.error('Error saving user preferences:', error);
    return false;
  }
};

// Storage utilities
export const getStorageUsage = () => {
  try {
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length;
      }
    }
    return {
      used: totalSize,
      usedMB: (totalSize / 1024 / 1024).toFixed(2),
      available: 5 * 1024 * 1024 - totalSize, // Assuming 5MB limit
    };
  } catch (error) {
    console.error('Error calculating storage usage:', error);
    return { used: 0, usedMB: '0', available: 5 * 1024 * 1024 };
  }
};

// Clear all user data
export const clearUserData = (userId) => {
  try {
    // Remove user conversations
    const conversations = localStorage.getItem(CONVERSATIONS_KEY);
    if (conversations) {
      const allConversations = JSON.parse(conversations);
      delete allConversations[userId];
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(allConversations));
    }
    
    // Remove user preferences
    const preferences = localStorage.getItem(USER_PREFERENCES_KEY);
    if (preferences) {
      const allPreferences = JSON.parse(preferences);
      delete allPreferences[userId];
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(allPreferences));
    }
    
    return true;
  } catch (error) {
    console.error('Error clearing user data:', error);
    return false;
  }
};