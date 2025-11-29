import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { Play, ArrowRight } from "lucide-react";

export const ScrollExpansionHero = ({
  className,
  title = "The Future of Web3 Learning",
  subtitle = "Interactive simulations, real-time analytics, and comprehensive blockchain education.",
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  imageUrl = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1920&q=80",
  children,
  ...props
}) => {
  const containerRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values based on scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [32, 8]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Background with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" />
        <img
          src={imageUrl}
          alt="Web3 Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                onClick={() => (window.location.href = "/games")}
              >
                Start Learning <ArrowRight className="inline ml-2 w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayVideo}
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="inline mr-2 w-5 h-5" fill="currentColor" />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Media Content */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className="relative overflow-hidden shadow-2xl"
              style={{ borderRadius }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {!isVideoPlaying ? (
                <>
                  <img
                    src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80"
                    alt="Web3 Learning Platform Preview"
                    className="w-full h-auto rounded-xl"
                  />
                  <motion.button
                    onClick={handlePlayVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <Play
                        className="w-8 h-8 text-gray-800 ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </motion.button>
                </>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src={`${videoUrl}?autoplay=1`}
                    title="Web3 Tutor Hub Demo"
                    className="w-full h-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-60"
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
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl opacity-60"
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

        {/* Custom children content */}
        {children && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
