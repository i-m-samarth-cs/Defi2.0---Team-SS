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
  Coins,
  ArrowUpDown,
  Droplet,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  ChevronRight,
  Calculator,
  PieChart,
} from "lucide-react";

const DeFiPage = () => {
  const simulators = [
    {
      id: "swap",
      title: "Token Swap Simulator",
      description:
        "Experience Uniswap-like token swapping with real-time price impact calculations, slippage analysis, and fee estimation.",
      icon: ArrowUpDown,
      difficulty: "Beginner",
      duration: "5-10 min",
      users: "25.2K+",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
      features: [
        "ETH, USDC, DAI trading pairs",
        "Real-time price impact calculation",
        "Slippage tolerance settings",
        "Transaction fee estimation",
      ],
      href: "/defi/swap",
      category: "Trading",
    },
    {
      id: "liquidity",
      title: "Liquidity Provision Simulator",
      description:
        "Learn AMM mechanics by providing liquidity to pools. Understand LP shares, impermanent loss, and rewards distribution.",
      icon: Droplet,
      difficulty: "Intermediate",
      duration: "10-15 min",
      users: "18.7K+",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
      features: [
        "Multiple liquidity pools",
        "LP share calculations",
        "Impermanent loss tracking",
        "Price shift impact analysis",
      ],
      href: "/defi/liquidity",
      category: "Liquidity Mining",
    },
    {
      id: "rewards",
      title: "APY Live Rewards Dashboard",
      description:
        "Monitor real-time reward accumulation with customizable APY rates. Perfect for understanding compound interest in DeFi.",
      icon: TrendingUp,
      difficulty: "Beginner",
      duration: "8-12 min",
      users: "32.1K+",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
      features: [
        "Live timer-based reward growth",
        "Customizable APY settings",
        "Multiple staking protocols",
        "Compound interest visualization",
      ],
      href: "/defi/rewards",
      category: "Yield Farming",
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
              <Coins className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                DeFi Try-It Simulators
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">DeFi </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Practice Hub
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Master decentralized finance through realistic simulations.
              Practice trading, providing liquidity, and earning rewards without
              risking real funds.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
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

      {/* Simulators Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-1 gap-8 max-w-5xl mx-auto">
            {simulators.map((simulator, index) => (
              <motion.div
                key={simulator.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightContainer className="h-full">
                  <Card
                    className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => (window.location.href = simulator.href)}
                  >
                    <div className="md:flex">
                      {/* Image */}
                      <div className="md:w-1/3 relative overflow-hidden">
                        <img
                          src={simulator.image}
                          alt={simulator.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <simulator.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(simulator.difficulty)}`}
                          >
                            {simulator.difficulty}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-purple-600/90 text-white rounded-full text-xs font-semibold">
                            {simulator.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:w-2/3 p-8">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {simulator.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {simulator.description}
                          </CardDescription>
                        </CardHeader>

                        {/* Meta Info */}
                        <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center">
                            <Target className="w-4 h-4 mr-1" />
                            {simulator.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {simulator.users} users
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {simulator.features.map((feature, featureIndex) => (
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
                            window.location.href = simulator.href;
                          }}
                        >
                          Try Simulator
                          <ChevronRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </SpotlightContainer>
              </motion.div>
            ))}
          </div>

          {/* Educational Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold mb-4">
                  Why Practice DeFi?
                </CardTitle>
                <CardDescription className="text-lg">
                  Understanding DeFi concepts before risking real funds
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-300">
                      Risk-Free Learning
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Practice complex DeFi strategies without risking your
                      actual cryptocurrency or getting liquidated.
                    </p>
                  </div>
                  <div className="text-center">
                    <Calculator className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 text-purple-800 dark:text-purple-300">
                      Master the Math
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Understand impermanent loss, slippage, APY calculations,
                      and other crucial DeFi concepts through practice.
                    </p>
                  </div>
                  <div className="text-center">
                    <Target className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 text-green-800 dark:text-green-300">
                      Build Confidence
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Gain confidence in DeFi protocols and strategies before
                      committing real funds to live markets.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Message Dock */}
      <DemoMessageDock />
    </div>
  );
};

export default DeFiPage;
