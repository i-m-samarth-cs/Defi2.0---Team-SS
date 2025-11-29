import React from "react";
import { motion } from "motion/react";
import { ScrollExpansionHero } from "./scroll-expansion-hero";
import { Gamepad2, Coins, BookOpen, TrendingUp } from "lucide-react";

export const DemoScroll = () => {
  const features = [
    {
      icon: Gamepad2,
      title: "Interactive Games",
      description:
        "Learn DeFi through gamification with yield farming simulators and gas optimization challenges.",
    },
    {
      icon: Coins,
      title: "DeFi Simulators",
      description:
        "Practice trading, provide liquidity, and understand impermanent loss without real money.",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Learning",
      description:
        "Video tutorials, articles, and interactive lessons from top Web3 educators.",
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description:
        "Track your learning progress and understand complex DeFi metrics in real-time.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 min-h-screen">
      <ScrollExpansionHero
        title="Master Web3 Through Interactive Learning"
        subtitle="The most comprehensive blockchain education platform with hands-on simulations, real-time analytics, and expert-curated content."
        imageUrl="https://moondefi.org/wp-content/uploads/2024/05/navigate-defi-landscape-showcase.jpg"
        videoUrl="https://youtu.be/SZXwDhcx9uY?si=LPUxEwCpVl2CYjy9"
      >
        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 px-4 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: index * 0.08,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-7 h-full border border-white/10 hover:border-indigo-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
                  <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 mb-20 text-center px-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
            Ready to Start Your Web3 Journey?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners who are mastering blockchain technology
            through our interactive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/games")}
              className="px-9 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
            >
              Start Learning Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/learn")}
              className="px-9 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Courses
            </motion.button>
          </div>
        </motion.div>
      </ScrollExpansionHero>
    </div>
  );
};
