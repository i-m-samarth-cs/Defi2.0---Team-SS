import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './auth-context';
import {
  getUserConversations,
  saveUserConversation,
  deleteUserConversation,
  addMessageToConversation,
  createConversation,
  importConversation,
  getUserPreferences,
  saveUserPreferences,
} from '@/lib/auth';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState('ethereum');
  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: true,
    defaultChatAvatar: 'ethereum',
    autoSaveConversations: true,
  });
  const [loading, setLoading] = useState(false);

  // Available chat avatars
  const avatars = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      avatar: '/logos/ethereum.svg',
      online: true,
      description: 'Expert in Ethereum and smart contracts',
    },
    {
      id: 'solana',
      name: 'Solana',
      avatar: '/logos/solana.svg',
      online: true,
      description: 'Specialist in Solana ecosystem and DeFi',
    },
    {
      id: 'polygon',
      name: 'Polygon',
      avatar: '/logos/polygon.svg',
      online: true,
      description: 'Layer 2 scaling and Polygon network expert',
    },
  ];

  // Load user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserData();
    } else {
      // Clear data when not authenticated
      setConversations([]);
      setCurrentConversation(null);
      setPreferences({
        theme: 'light',
        notifications: true,
        defaultChatAvatar: 'ethereum',
        autoSaveConversations: true,
      });
    }
  }, [isAuthenticated, user]);

  const loadUserData = () => {
    if (!user) return;

    try {
      // Load conversations
      const userConversations = getUserConversations(user.id);
      setConversations(userConversations);

      // Load preferences
      const userPreferences = getUserPreferences(user.id);
      setPreferences(userPreferences);
      setSelectedAvatar(userPreferences.defaultChatAvatar);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Create new conversation
  const startNewConversation = (title, avatar = selectedAvatar) => {
    if (!isAuthenticated || !user) {
      console.warn('User must be authenticated to create conversations');
      return null;
    }

    try {
      const conversation = createConversation(user.id, title);
      if (conversation) {
        conversation.avatar = avatar;
        saveUserConversation(user.id, conversation);
        setConversations(prev => [conversation, ...prev]);
        setCurrentConversation(conversation);
        return conversation;
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
    return null;
  };

  // Send message
  const sendMessage = async (content, conversationId = null) => {
    if (!isAuthenticated || !user) {
      console.warn('User must be authenticated to send messages');
      return null;
    }

    try {
      let conversation = currentConversation;
      
      // Create new conversation if none exists
      if (!conversation && !conversationId) {
        conversation = startNewConversation(`Chat with ${avatars.find(a => a.id === selectedAvatar)?.name}`);
        if (!conversation) return null;
      } else if (conversationId) {
        conversation = conversations.find(c => c.id === conversationId);
      }

      if (!conversation) return null;

      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
        avatar: selectedAvatar,
      };

      // Generate AI response (simulated)
      const aiResponse = generateAIResponse(content, selectedAvatar);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
        avatar: selectedAvatar,
      };

      // Update conversation
      const updatedConversation = {
        ...conversation,
        messages: [...conversation.messages, userMessage, aiMessage],
        updatedAt: new Date().toISOString(),
      };

      // Save to localStorage
      if (preferences.autoSaveConversations) {
        saveUserConversation(user.id, updatedConversation);
      }

      // Update state
      setConversations(prev => 
        prev.map(c => c.id === updatedConversation.id ? updatedConversation : c)
      );
      setCurrentConversation(updatedConversation);

      return { userMessage, aiMessage };
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  };

  // Generate AI response (simulated)
  const generateAIResponse = (userMessage, avatar) => {
    const responses = {
      ethereum: [
        "Great question about Ethereum! Let me explain how smart contracts work...",
        "Ethereum's proof-of-stake consensus mechanism is fascinating. Here's how it works...",
        "Gas fees on Ethereum depend on network congestion. Let me break this down...",
        "DeFi protocols on Ethereum offer many opportunities. Here's what you should know...",
      ],
      solana: [
        "Solana's high throughput makes it perfect for DeFi applications. Here's why...",
        "The Solana ecosystem has grown tremendously. Let me share some insights...",
        "Proof of History is Solana's unique innovation. Here's how it works...",
        "Building on Solana offers several advantages over other blockchains...",
      ],
      polygon: [
        "Polygon's Layer 2 solution significantly reduces transaction costs. Here's how...",
        "The Polygon ecosystem bridges Ethereum seamlessly. Let me explain...",
        "Scaling solutions like Polygon are crucial for blockchain adoption...",
        "Polygon's architecture offers the best of both worlds. Here's why...",
      ],
    };

    const avatarResponses = responses[avatar] || responses.ethereum;
    return avatarResponses[Math.floor(Math.random() * avatarResponses.length)];
  };

  // Delete conversation
  const deleteConversation = (conversationId) => {
    if (!isAuthenticated || !user) return false;

    try {
      deleteUserConversation(user.id, conversationId);
      setConversations(prev => prev.filter(c => c.id !== conversationId));
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }
  };

  // Import conversation from file
  const importConversationFromFile = (fileContent, title) => {
    if (!isAuthenticated || !user) {
      console.warn('User must be authenticated to import conversations');
      return null;
    }

    try {
      const conversation = importConversation(user.id, fileContent, title);
      if (conversation) {
        setConversations(prev => [conversation, ...prev]);
        return conversation;
      }
    } catch (error) {
      console.error('Error importing conversation:', error);
    }
    return null;
  };

  // Update preferences
  const updatePreferences = (newPreferences) => {
    if (!isAuthenticated || !user) return false;

    try {
      const updated = { ...preferences, ...newPreferences };
      setPreferences(updated);
      saveUserPreferences(user.id, updated);
      
      if (newPreferences.defaultChatAvatar) {
        setSelectedAvatar(newPreferences.defaultChatAvatar);
      }
      
      return true;
    } catch (error) {
      console.error('Error updating preferences:', error);
      return false;
    }
  };

  // Select conversation
  const selectConversation = (conversationId) => {
    const conversation = conversations.find(c => c.id === conversationId);
    setCurrentConversation(conversation || null);
  };

  // Update conversation title
  const updateConversationTitle = (conversationId, newTitle) => {
    if (!isAuthenticated || !user) return false;

    try {
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        const updated = { ...conversation, title: newTitle, updatedAt: new Date().toISOString() };
        saveUserConversation(user.id, updated);
        setConversations(prev => prev.map(c => c.id === conversationId ? updated : c));
        
        if (currentConversation?.id === conversationId) {
          setCurrentConversation(updated);
        }
        
        return true;
      }
    } catch (error) {
      console.error('Error updating conversation title:', error);
    }
    return false;
  };

  const value = {
    // State
    conversations,
    currentConversation,
    selectedAvatar,
    preferences,
    avatars,
    loading,
    
    // Actions
    startNewConversation,
    sendMessage,
    deleteConversation,
    importConversationFromFile,
    updatePreferences,
    selectConversation,
    updateConversationTitle,
    setSelectedAvatar,
    loadUserData,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};