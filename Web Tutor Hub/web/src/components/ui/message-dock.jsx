import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MessageCircle, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock crypto logos - in a real app these would be actual SVG icons
const CryptoLogo = ({ symbol, className }) => {
  const logos = {
    ETH: (
      <div
        className={cn(
          "w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold",
          className,
        )}
      >
        Ξ
      </div>
    ),
    SOL: (
      <div
        className={cn(
          "w-8 h-8 bg-gradient-to-br from-purple-400 to-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold",
          className,
        )}
      >
        ◎
      </div>
    ),
    MATIC: (
      <div
        className={cn(
          "w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold",
          className,
        )}
      >
        ♦
      </div>
    ),
  };
  return logos[symbol] || <User className={cn("w-8 h-8", className)} />;
};

const cryptoAvatars = [
  {
    avatar: "ETH",
    name: "Ethereum",
    online: true,
    expertise: "Smart Contracts & DeFi",
  },
  {
    avatar: "SOL",
    name: "Solana",
    online: true,
    expertise: "High-Speed Transactions",
  },
  {
    avatar: "MATIC",
    name: "Polygon",
    online: true,
    expertise: "Layer 2 Solutions",
  },
];

export const MessageDock = ({ className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedAvatar) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(
      () => {
        const aiResponse = {
          id: Date.now() + 1,
          text: generateResponse(newMessage, selectedAvatar),
          sender: "ai",
          avatar: selectedAvatar.avatar,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const generateResponse = (message, avatar) => {
    const responses = {
      ETH: [
        "Great question about Ethereum! Ethereum is a decentralized platform that enables smart contracts and DApps to run without downtime, fraud, or third-party interference.",
        "In Ethereum, gas fees are used to compensate miners for the computational energy required to process transactions. Higher gas = faster processing!",
        "DeFi on Ethereum has grown tremendously! You can lend, borrow, trade, and earn yield through various protocols like Uniswap, Aave, and Compound.",
        "Smart contracts are self-executing contracts with terms directly written into code. They automatically execute when predetermined conditions are met!",
      ],
      SOL: [
        "Solana is designed for speed! With our Proof of History consensus, we can process up to 65,000 transactions per second with minimal fees.",
        "What makes Solana unique is our innovative consensus mechanism that combines Proof of History with Proof of Stake for incredible efficiency.",
        "The Solana ecosystem is booming with DeFi, NFTs, and Web3 apps. Projects like Serum, Raydium, and Magic Eden are leading the way!",
        "Low fees and high speed make Solana perfect for micro-transactions and real-time applications. Perfect for gaming and social apps!",
      ],
      MATIC: [
        "Polygon is Ethereum's Layer 2 scaling solution! We provide faster and cheaper transactions while maintaining Ethereum's security.",
        "Layer 2 solutions like Polygon help reduce congestion on Ethereum mainnet while keeping all the benefits of decentralization.",
        "With Polygon, you can use your favorite Ethereum DApps with much lower fees and faster confirmation times. It's the best of both worlds!",
        "Polygon's commit chain architecture allows for massive scalability while ensuring your assets can always be withdrawn to Ethereum mainnet.",
      ],
    };

    const avatarResponses = responses[avatar.avatar] || responses.ETH;
    return avatarResponses[Math.floor(Math.random() * avatarResponses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)} {...props}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 w-80 max-h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Web3 Tutor Hub</h3>
                  <p className="text-blue-100 text-sm">
                    Ask your crypto questions!
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Avatar Selection */}
            {!selectedAvatar && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Choose your crypto tutor:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {cryptoAvatars.map((avatar) => (
                    <button
                      key={avatar.name}
                      onClick={() => setSelectedAvatar(avatar)}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <CryptoLogo symbol={avatar.avatar} />
                      <div className="text-left flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {avatar.name}
                          </span>
                          {avatar.online && (
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {avatar.expertise}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Avatar Header */}
            {selectedAvatar && (
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CryptoLogo symbol={selectedAvatar.avatar} />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedAvatar.name}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedAvatar.expertise}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAvatar(null);
                      setMessages([]);
                    }}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            {selectedAvatar && (
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    <CryptoLogo
                      symbol={selectedAvatar.avatar}
                      className="mx-auto mb-2 opacity-50"
                    />
                    Hi! I'm your {selectedAvatar.name} tutor. Ask me anything
                    about blockchain and Web3!
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex space-x-2",
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start",
                    )}
                  >
                    {message.sender === "ai" && (
                      <CryptoLogo
                        symbol={message.avatar}
                        className="w-6 h-6 mt-1"
                      />
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] p-3 rounded-2xl text-sm",
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm",
                      )}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center space-x-2">
                    <CryptoLogo
                      symbol={selectedAvatar.avatar}
                      className="w-6 h-6"
                    />
                    <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-2xl rounded-bl-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input */}
            {selectedAvatar && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about blockchain, DeFi, or Web3..."
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};
