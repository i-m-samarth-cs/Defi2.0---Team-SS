'use client'
import React, { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import('@splinetool/react-spline'));

// Spline Scene Component with proper lazy loading
function SplineScene({ scene, className }) {
  return (
    <Suspense fallback={<SplineFallback />}>
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}

// Enhanced SplineSceneBasic with fallback for demo
const SplineSceneBasic = ({ className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [useRealSpline, setUseRealSpline] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Try to use real Spline, fallback to mock if needed
  if (useRealSpline) {
    return (
      <div className={cn("relative w-full h-full min-h-[400px]", className)} {...props}>
        <Suspense fallback={<SplineFallback />}>
          <Spline
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
            onError={() => setUseRealSpline(false)}
          />
        </Suspense>
      </div>
    );
  }

  // Fallback to mock 3D scene
  return (
    <div
      className={cn("relative w-full h-full min-h-[400px]", className)}
      {...props}
    >
      {!isLoaded ? (
        <SplineFallback />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full h-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
        >
          {/* Mock 3D Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Floating geometric shapes */}
            <motion.div
              animate={{
                rotate: 360,
                y: [0, -20, 0],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="w-32 h-32 relative"
            >
              {/* Hexagon */}
              <div className="absolute inset-0 border-4 border-cyan-400/60 rounded-lg transform rotate-45 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm" />
              <div className="absolute inset-2 border-2 border-purple-400/40 rounded-lg transform -rotate-45 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
            </motion.div>

            {/* Orbiting particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/60 rounded-full"
                animate={{
                  rotate: 360,
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  rotate: {
                    duration: 15 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  transformOrigin: `${80 + i * 10}px ${80 + i * 10}px`,
                  left: "50%",
                  top: "50%",
                }}
              />
            ))}
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#grid)"
                className="text-white/30"
              />
            </svg>
          </div>

          {/* Glow effects */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </motion.div>
      )}
    </div>
  );
};

const SplineFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
      />
      <p className="text-gray-600 dark:text-gray-400 font-medium">
        Loading 3D Scene...
      </p>
    </div>
  </div>
);

export { SplineScene, SplineSceneBasic, SplineFallback };
