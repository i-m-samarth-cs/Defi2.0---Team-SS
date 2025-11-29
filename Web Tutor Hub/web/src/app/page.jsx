import React from "react";
import { motion } from "motion/react";
import { Navigation } from "@/components/ui/navigation";
import { SplineSceneBasic } from "@/components/ui/spline";
import { SplineDemo } from "@/components/blocks/spline-demo";
import { DemoScroll } from "@/components/blocks/demo-scroll";
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
  Gamepad2,
  Coins,
  BookOpen,
  TrendingUp,
  PlayCircle,
  Users,
  Award,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
import { DownloadButton } from "@/components/ui/download-animation";

const HomePage = () => {
  const navigate = useNavigate();
  
  const exploreCards = [
    {
      title: "W3 Social",
      description:
        "Connect with the Web3 community, share insights, and engage with fellow learners in our social platform.",
      icon: MessageCircle,
      category: "Social",
      href: "/w3-social",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      stats: "Join the Community",
    },
    {
      title: "Yield Farming Simulator",
      description:
        "Learn about impermanent loss, LP rewards, and APY calculations through interactive simulations.",
      icon: TrendingUp,
      category: "Games",
      href: "/games/yield-farming",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
      stats: "95% Completion Rate",
    },
    {
      title: "DeFi Swap Simulator",
      description:
        "Practice swapping tokens with real-time price impact and slippage calculations.",
      icon: Coins,
      category: "DeFi Try-It",
      href: "/defi/swap",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
      stats: "$100M+ Volume Practiced",
    },
    {
      title: "Gas Fee Optimization",
      description:
        "Master the art of timing your transactions for optimal gas fees in dynamic market conditions.",
      icon: Gamepad2,
      category: "Games",
      href: "/games/gas-optimization",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=600&q=80",
      stats: "50K+ Transactions Optimized",
    },
    {
      title: "Video Learning Hub",
      description:
        "Expert-curated video content from top Web3 educators and blockchain professionals.",
      icon: BookOpen,
      category: "Learn",
      href: "/learn",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      stats: "200+ Video Lessons",
    },
  ];

  const stats = [
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:to-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-6"
              >
                <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-purple-900/30 dark:to-fuchsia-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold shadow-lg border border-purple-200 dark:border-purple-800">
                  🚀 Interactive Web3 Learning Platform
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm">
                    Master Web3
                  </span>
                  <br />
                  <span className="text-slate-800 dark:text-slate-100">
                    Through Practice
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-light">
                  Interactive simulations, real-time analytics, and
                  comprehensive blockchain education. Learn DeFi, smart
                  contracts, and Web3 concepts through hands-on experience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  variant="web3"
                  className="group shadow-xl hover:shadow-2xl"
                  onClick={() => navigate("/games")}
                >
                  Start Learning Now
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group shadow-md hover:shadow-lg border-2"
                  onClick={() => navigate("/learn")}
                >
                  <PlayCircle className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="group shadow-md hover:shadow-lg"
                  onClick={() => navigate("/w3-social")}
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  W3 Social
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <stat.icon className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - 3D Scene */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <SplineSceneBasic className="w-full h-[500px] rounded-2xl" />
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full blur-xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-full blur-xl opacity-50"
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Extension Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              Get the Web3 Tutor Extension
            </h2>
            <p className="text-lg text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Enhance your learning experience with our browser extension. Get
              instant access to Web3 tools, quick references, and learning
              resources right in your browser.
            </p>
            <div className="flex justify-center">
              <DownloadButton />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive 3D Showcase */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50/50 dark:from-slate-900 dark:to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SplineDemo />
          </motion.div>
        </div>
      </section>

      {/* Scroll Expansion Hero */}
      <DemoScroll />

      {/* Explore Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-800/50 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-slate-800 dark:text-slate-100">Explore </span>
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Web3 Learning
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover interactive simulations, games, and comprehensive
              tutorials designed to make Web3 learning engaging and effective.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {exploreCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SpotlightContainer className="h-full">
                  <Card
                    className="h-full border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden"
                    onClick={() => navigate(card.href)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-full text-xs font-medium text-slate-700 dark:text-slate-200 shadow-sm">
                          {card.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="w-11 h-11 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                          <card.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-slate-800 dark:text-slate-100">
                        {card.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">{card.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                          {card.stats}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
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

export default HomePage;
