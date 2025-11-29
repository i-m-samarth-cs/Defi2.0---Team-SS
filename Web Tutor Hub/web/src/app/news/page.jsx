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
  Newspaper,
  TrendingUp,
  Clock,
  ExternalLink,
  Filter,
  Search,
  ChevronRight,
  Bitcoin,
  Coins,
  Shield,
  Code,
  Zap,
  Globe,
  Calendar,
  Eye,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "All", icon: Newspaper, count: 150 },
    { name: "Bitcoin", icon: Bitcoin, count: 32 },
    { name: "DeFi", icon: Coins, count: 28 },
    { name: "Regulation", icon: Shield, count: 24 },
    { name: "Technology", icon: Code, count: 22 },
    { name: "Market", icon: TrendingUp, count: 26 },
    { name: "Global", icon: Globe, count: 18 },
  ];

  const featuredNews = [
    {
      id: 1,
      title: "Ethereum 2.0 Staking Rewards Hit All-Time High as Network Activity Surges",
      summary: "Ethereum validators are seeing unprecedented returns as network usage and fee revenue continue to climb following the successful Shanghai upgrade.",
      category: "Technology",
      source: "CoinDesk",
      author: "Sarah Chen",
      publishedAt: "2024-11-25T10:30:00Z",
      readTime: "4 min read",
      views: "12.5K",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      trending: true,
      priceChange: "+5.2%",
      url: "https://coindesk.com/ethereum-staking-rewards",
    },
    {
      id: 2,
      title: "Major Bank Announces $500M Bitcoin Treasury Allocation",
      summary: "Following MicroStrategy's lead, another Fortune 500 company adds Bitcoin to its balance sheet as institutional adoption accelerates.",
      category: "Bitcoin",
      source: "The Block",
      author: "Michael Rodriguez",
      publishedAt: "2024-11-25T08:15:00Z",
      readTime: "3 min read",
      views: "18.2K",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80",
      trending: true,
      priceChange: "+2.8%",
      url: "https://theblock.co/bitcoin-treasury-allocation",
    },
    {
      id: 3,
      title: "DeFi Protocol Launches Revolutionary Cross-Chain Yield Farming",
      summary: "New protocol enables seamless yield farming across multiple blockchains with automated rebalancing and risk management features.",
      category: "DeFi",
      source: "DeFi Pulse",
      author: "Alex Thompson",
      publishedAt: "2024-11-25T06:45:00Z",
      readTime: "5 min read",
      views: "9.8K",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      trending: false,
      priceChange: "+12.4%",
      url: "https://defipulse.com/cross-chain-yield",
    },
    {
      id: 4,
      title: "EU Finalizes Comprehensive Crypto Regulation Framework",
      summary: "Markets in Crypto-Assets (MiCA) regulation comes into effect, setting new standards for crypto operations across European Union.",
      category: "Regulation",
      source: "Reuters",
      author: "Emma Wilson",
      publishedAt: "2024-11-24T16:20:00Z",
      readTime: "6 min read",
      views: "15.7K",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
      trending: false,
      priceChange: "-1.2%",
      url: "https://reuters.com/eu-crypto-regulation",
    },
    {
      id: 5,
      title: "Layer 2 Solutions See Record Transaction Volume",
      summary: "Arbitrum and Optimism process over 10M transactions daily as Ethereum scaling solutions gain mainstream adoption.",
      category: "Technology",
      source: "Decrypt",
      author: "James Park",
      publishedAt: "2024-11-24T14:10:00Z",
      readTime: "4 min read",
      views: "7.3K",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80",
      trending: true,
      priceChange: "+8.7%",
      url: "https://decrypt.co/layer2-volume",
    },
    {
      id: 6,
      title: "Central Bank Digital Currencies Gain Momentum Globally",
      summary: "Over 100 countries now exploring or piloting CBDCs as digital payment infrastructure becomes critical for economic competitiveness.",
      category: "Global",
      source: "Financial Times",
      author: "David Kumar",
      publishedAt: "2024-11-24T12:30:00Z",
      readTime: "7 min read",
      views: "11.4K",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      trending: false,
      priceChange: "+0.5%",
      url: "https://ft.com/cbdc-momentum",
    },
  ];

  const marketData = [
    { symbol: "BTC", price: "$94,250", change: "+2.8%", positive: true },
    { symbol: "ETH", price: "$3,420", change: "+5.2%", positive: true },
    { symbol: "SOL", price: "$245", change: "-1.4%", positive: false },
    { symbol: "ADA", price: "$1.12", change: "+3.1%", positive: true },
  ];

  const filteredNews = featuredNews.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { label: "Daily Articles", value: "50+", icon: Newspaper },
    { label: "News Sources", value: "25+", icon: Globe },
    { label: "Daily Readers", value: "100K+", icon: Eye },
    { label: "Categories", value: "7", icon: Filter },
  ];

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
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
              <Newspaper className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                Real-Time Updates
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Web3 </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                News Hub
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Stay updated with the latest developments in blockchain, cryptocurrency, and decentralized finance from trusted sources worldwide.
            </p>

            {/* Market Ticker */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Live Prices</span>
                <div className="flex space-x-6">
                  {marketData.map((coin) => (
                    <div key={coin.symbol} className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{coin.symbol}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{coin.price}</span>
                      <span className={`text-sm flex items-center ${coin.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {coin.positive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                        {coin.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
                    <stat.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
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
              placeholder="Search news articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      {/* News Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightContainer className="h-full">
                  <Card
                    className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
                    onClick={() => window.open(article.url, '_blank')}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {article.trending && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 dark:text-white">
                          {article.category}
                        </span>
                      </div>
                      {article.priceChange && (
                        <div className="absolute bottom-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${
                            article.priceChange.startsWith('+') 
                              ? 'bg-green-500/90 text-white' 
                              : 'bg-red-500/90 text-white'
                          }`}>
                            {article.priceChange.startsWith('+') ? 
                              <ArrowUp className="w-3 h-3 mr-1" /> : 
                              <ArrowDown className="w-3 h-3 mr-1" />
                            }
                            {article.priceChange}
                          </span>
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{article.source}</span>
                        <span>{formatTimeAgo(article.publishedAt)}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <CardDescription className="mb-4 line-clamp-3">
                        {article.summary}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.readTime}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </SpotlightContainer>
              </motion.div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or category filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Message Dock */}
      <DemoMessageDock />
    </div>
  );
};

export default NewsPage;