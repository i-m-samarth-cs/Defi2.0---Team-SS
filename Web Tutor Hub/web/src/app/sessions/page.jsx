import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Navigation } from "@/components/ui/navigation";
import { DemoMessageDock } from "@/components/blocks/demo-message-dock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpotlightContainer } from "@/components/ui/spotlight";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  MessageCircle,
  Clock,
  User,
  Bot,
  Search,
  Filter,
  Calendar,
  Eye,
  Edit3,
  Save,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useChat } from "@/contexts/chat-context";

const SessionsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { 
    conversations, 
    importConversationFromFile, 
    deleteConversation,
    updateConversationTitle,
    selectConversation,
    avatars 
  } = useChat();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [editingTitle, setEditingTitle] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const fileInputRef = useRef(null);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.messages.some(msg => 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadError("");
    setUploadSuccess("");

    if (file.type !== "text/plain") {
      setUploadError("Please upload a .txt file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const title = file.name.replace('.txt', '');
        
        const conversation = importConversationFromFile(content, title);
        if (conversation) {
          setUploadSuccess(`Successfully imported "${title}"`);
          setTimeout(() => setUploadSuccess(""), 3000);
        } else {
          setUploadError("Failed to parse conversation file. Please check the format.");
        }
      } catch (error) {
        setUploadError("Error reading file: " + error.message);
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = "";
  };

  const handleDeleteConversation = (conversationId, event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      deleteConversation(conversationId);
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null);
      }
    }
  };

  const handleEditTitle = (conversation, event) => {
    event.stopPropagation();
    setEditingTitle(conversation.id);
    setNewTitle(conversation.title);
  };

  const handleSaveTitle = (conversationId) => {
    if (newTitle.trim()) {
      updateConversationTitle(conversationId, newTitle.trim());
    }
    setEditingTitle(null);
    setNewTitle("");
  };

  const handleCancelEdit = () => {
    setEditingTitle(null);
    setNewTitle("");
  };

  const exportConversation = (conversation) => {
    const content = conversation.messages.map(msg => 
      `[${msg.timestamp}] ${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}`
    ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${conversation.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAvatarInfo = (avatarId) => {
    return avatars.find(a => a.id === avatarId) || avatars[0];
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to view and manage your conversation history.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                Conversation Management
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Web3 Tutor </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Conversation History
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              View, manage, and import your conversation transcripts. All your learning sessions are saved securely in your browser.
            </p>

            {/* Upload Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="web3"
                className="flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Conversation
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Upload .txt files with format: [timestamp] Role: message
              </span>
            </div>

            {/* Upload Status */}
            {uploadError && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg max-w-md mx-auto">
                {uploadError}
              </div>
            )}
            {uploadSuccess && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg max-w-md mx-auto">
                {uploadSuccess}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Conversations Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {conversations.length === 0 ? "No conversations yet" : "No matching conversations"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {conversations.length === 0 
                  ? "Start chatting with our AI tutors or import existing conversations to see them here."
                  : "Try adjusting your search terms to find conversations."
                }
              </p>
              {conversations.length === 0 && (
                <Button
                  variant="web3"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Your First Conversation
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConversations.map((conversation, index) => {
                const avatarInfo = getAvatarInfo(conversation.avatar);
                return (
                  <motion.div
                    key={conversation.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <SpotlightContainer className="h-full">
                      <Card
                        className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {avatarInfo.name[0]}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                {editingTitle === conversation.id ? (
                                  <div className="flex items-center space-x-2">
                                    <Input
                                      value={newTitle}
                                      onChange={(e) => setNewTitle(e.target.value)}
                                      className="text-sm"
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          handleSaveTitle(conversation.id);
                                        } else if (e.key === 'Escape') {
                                          handleCancelEdit();
                                        }
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      autoFocus
                                    />
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSaveTitle(conversation.id);
                                      }}
                                    >
                                      <Save className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCancelEdit();
                                      }}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {conversation.title}
                                  </CardTitle>
                                )}
                                <CardDescription className="text-sm">
                                  with {avatarInfo.name}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => handleEditTitle(conversation, e)}
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  exportConversation(conversation);
                                }}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => handleDeleteConversation(conversation.id, e)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {/* Stats */}
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {conversation.messages.length} messages
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {formatDate(conversation.updatedAt)}
                              </div>
                            </div>

                            {/* Preview */}
                            {conversation.messages.length > 0 && (
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  Latest message:
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                  {conversation.messages[conversation.messages.length - 1].content}
                                </div>
                              </div>
                            )}

                            {conversation.imported && (
                              <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                                <Upload className="w-3 h-3 mr-1" />
                                Imported conversation
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </SpotlightContainer>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Conversation Detail Modal */}
      {selectedConversation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedConversation.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedConversation.messages.length} messages • {formatDate(selectedConversation.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportConversation(selectedConversation)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {selectedConversation.messages.map((message, index) => (
                  <div
                    key={message.id || index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {message.role === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {message.role === 'user' ? 'You' : getAvatarInfo(message.avatar || selectedConversation.avatar).name}
                        </span>
                        <span className="text-xs opacity-70">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Message Dock */}
      <DemoMessageDock />
    </div>
  );
};

export default SessionsPage;