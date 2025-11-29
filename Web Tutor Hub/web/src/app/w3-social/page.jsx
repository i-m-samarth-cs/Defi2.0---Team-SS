import React from "react";
import { motion } from "motion/react";
import { Navigation } from "@/components/ui/navigation";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const W3SocialPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      {/* Header with back button */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </motion.button>
        </div>
      </div>

      {/* Embedded W3 Social Application */}
      <div className="w-full h-[calc(100vh-120px)]">
        <motion.iframe
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src="https://arena-quake-99095255.figma.site"
          className="w-full h-full border-0"
          title="W3 Social"
          allow="fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default W3SocialPage;

