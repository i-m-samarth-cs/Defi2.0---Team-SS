import React, { useState } from "react";
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
import { SpotlightContainer } from "@/components/ui/spotlight";
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Filter,
  Search,
  ChevronRight,
  Youtube,
  TrendingUp,
  Shield,
  Coins,
  Code,
  Zap,
  Target,
} from "lucide-react";

const LearnPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "All", icon: BookOpen, count: 200 },
    { name: "DeFi Basics", icon: Coins, count: 45 },
    { name: "Smart Contracts", icon: Code, count: 38 },
    { name: "Security", icon: Shield, count: 32 },
    { name: "Trading", icon: TrendingUp, count: 28 },
    { name: "Gas Optimization", icon: Zap, count: 22 },
    { name: "Advanced", icon: Target, count: 35 },
  ];

  const featuredVideos = [
    {
      id: 1,
      title: "Complete DeFi Guide: From Beginner to Advanced",
      creator: "Coin Bureau",
      thumbnail: "https://img.youtube.com/vi/k9HYC0EJU6E/maxresdefault.jpg",
      videoId: "k9HYC0EJU6E",
      duration: "45:32",
      views: "2.1M",
      rating: 4.9,
      category: "DeFi Basics",
      description: "Comprehensive guide covering liquidity pools, yield farming, impermanent loss, and advanced DeFi strategies.",
      level: "Beginner to Advanced",
    },
    {
      id: 2,
      title: "Smart Contract Security: Common Vulnerabilities",
      creator: "Smart Contract Programmer",
      thumbnail: "https://img.youtube.com/vi/4Mm3BCyHtDY/maxresdefault.jpg",
      videoId: "4Mm3BCyHtDY",
      duration: "32:18",
      views: "890K",
      rating: 4.8,
      category: "Security",
      description: "Learn about reentrancy attacks, overflow/underflow, and how to write secure smart contracts.",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Gas Optimization Techniques for Ethereum",
      creator: "Eat The Blocks",
      thumbnail: "https://img.youtube.com/vi/PYilP2bjtwc/maxresdefault.jpg",
      videoId: "PYilP2bjtwc",
      duration: "28:45",
      views: "654K",
      rating: 4.7,
      category: "Gas Optimization",
      description: "Advanced techniques to reduce gas costs in your smart contracts and transactions.",
      level: "Advanced",
    },
    {
      id: 4,
      title: "Solidity Tutorial: Build Your First DApp",
      creator: "Dapp University",
      thumbnail: "https://img.youtube.com/vi/M576WGiDBdQ/maxresdefault.jpg",
      videoId: "M576WGiDBdQ",
      duration: "2:15:30",
      views: "1.8M",
      rating: 4.9,
      category: "Smart Contracts",
      description: "Complete tutorial building a decentralized application from scratch using Solidity and React.",
      level: "Beginner",
    },
    {
      id: 5,
      title: "MEV and Flashloans Explained",
      creator: "Finematics",
      thumbnail: "https://img.youtube.com/vi/mCJUhnXQ76s/maxresdefault.jpg",
      videoId: "mCJUhnXQ76s",
      duration: "18:22",
      views: "743K",
      rating: 4.6,
      category: "Advanced",
      description: "Understanding Maximum Extractable Value and how flashloans work in DeFi protocols.",
      level: "Advanced",
    },
    {
      id: 6,
      title: "Trading Strategies for DeFi Protocols",
      creator: "InvestAnswers",
      thumbnail: "https://img.youtube.com/vi/VH-dLzVgRd0/maxresdefault.jpg",
      videoId: "VH-dLzVgRd0",
      duration: "41:15",
      views: "567K",
      rating: 4.5,
      category: "Trading",
      description: "Advanced trading strategies using Uniswap, Aave, and other DeFi protocols.",
      level: "Intermediate",
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos = featuredVideos.filter((video) => {
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { label: "Video Lessons", value: "200+", icon: Play },
    { label: "Expert Creators", value: "50+", icon: Users },
    { label: "Watch Hours", value: "10K+", icon: Clock },
    { label: "Avg Rating", value: "4.8", icon: Star },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Youtube className="w-12 h-12 text-red-600 mr-4" />
              <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold">
                Expert-Curated Content
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Video </span>
              <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                Learning Hub
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Master Web3 and blockchain technology through carefully selected video content from top educators and industry experts.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search videos or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "web3" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className="flex items-center space-x-2"
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="text-xs opacity-70">({category.count})</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightContainer className="h-full">
                  <Card
                    className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
                    onClick={() => setSelectedVideo(video)}
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelColor(video.level)}`}>
                          {video.level}
                        </span>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                        {video.title}
                      </CardTitle>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{video.creator}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {video.rating}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <CardDescription className="mb-4 line-clamp-2">
                        {video.description}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Users className="w-4 h-4 mr-1" />
                          {video.views} views
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </SpotlightContainer>
              </motion.div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No videos found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or category filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedVideo.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    by {selectedVideo.creator}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </Button>
              </div>

              <div className="aspect-video mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  title={selectedVideo.title}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedVideo.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {selectedVideo.views} views
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {selectedVideo.rating}
                  </div>
                </div>
                <div className="flex justify-end">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(selectedVideo.level)}`}>
                    {selectedVideo.level}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {selectedVideo.description}
              </p>

              <Button
                variant="web3"
                className="w-full"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo.videoId}`, '_blank')}
              >
                <Youtube className="w-4 h-4 mr-2" />
                Watch on YouTube
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Message Dock */}
      <DemoMessageDock />
    </div>
  );
};

export default LearnPage;