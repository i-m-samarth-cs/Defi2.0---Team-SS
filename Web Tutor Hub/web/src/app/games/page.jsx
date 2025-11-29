import React from "react";
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
  TrendingUp,
  Zap,
  Shield,
  Target,
  Clock,
  Trophy,
  Users,
  ChevronRight,
  Gamepad2,
} from "lucide-react";

const GamesPage = () => {
  const games = [
    {
      id: "yield-farming",
      title: "Yield Farming Simulator",
      description:
        "Master DeFi yield farming by learning about impermanent loss, LP rewards, APY calculations, and PnL analysis through realistic simulations.",
      icon: TrendingUp,
      difficulty: "Advanced",
      duration: "15-20 min",
      players: "8.5K+",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
      features: [
        "Real-time impermanent loss calculations",
        "Multiple liquidity pair scenarios",
        "APY and rewards tracking",
        "Portfolio PnL analysis",
      ],
      href: "/games/yield-farming",
    },
    {
      id: "gas-optimization",
      title: "Gas Fee Optimization Game",
      description:
        "Perfect your transaction timing skills with dynamic gas fee simulation. Learn to read mempool congestion and optimize your transaction costs.",
      icon: Zap,
      difficulty: "Intermediate",
      duration: "10-15 min",
      players: "12.3K+",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=600&q=80",
      features: [
        "Live mempool simulation",
        "Dynamic gas price updates",
        "Optimal timing challenges",
        "Success/failure scoring",
      ],
      href: "/games/gas-optimization",
    },
    {
      id: "wallet-safety",
      title: "Wallet Safety Quiz",
      description:
        "Test your Web3 security knowledge with interactive scenarios. Learn to identify phishing attempts, secure seed phrases, and practice safe DeFi.",
      icon: Shield,
      difficulty: "Beginner",
      duration: "8-12 min",
      players: "15.7K+",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
      features: [
        "10 interactive questions",
        "Real-world scenarios",
        "Security best practices",
        "Instant feedback and tips",
      ],
      href: "/games/wallet-safety",
    },
  ];

  const stats = [
   
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
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
              <Gamepad2 className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                Interactive Learning Games
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Web3 </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gaming Hub
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Learn blockchain concepts through engaging, interactive games.
              Master DeFi protocols, optimize gas fees, and enhance your Web3
              security knowledge.
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

      {/* Games Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightContainer className="h-full">
                  <Card
                    className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => (window.location.href = game.href)}
                  >
                    <div className="md:flex">
                      {/* Image */}
                      <div className="md:w-1/3 relative overflow-hidden">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <game.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(game.difficulty)}`}
                          >
                            {game.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:w-2/3 p-8">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {game.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {game.description}
                          </CardDescription>
                        </CardHeader>

                        {/* Meta Info */}
                        <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {game.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {game.players}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {game.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                              >
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA */}
                        <Button
                          variant="web3"
                          className="group/btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = game.href;
                          }}
                        >
                          Play Now
                          <ChevronRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </SpotlightContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Message Dock */}
      <DemoMessageDock />
    </div>
  );
};

export default GamesPage;
