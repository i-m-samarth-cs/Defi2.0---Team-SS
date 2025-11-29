"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const DownloadButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = () => {
    if (isDownloading) return;

    setIsDownloading(true);

    // Convert Google Drive sharing link to direct download link
    // Format: https://drive.google.com/uc?export=download&id=FILE_ID
    const fileId = "14mty3Dn2uZuQDb7PDh7t2k4Yi3ZQiY14";
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // Trigger file download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Web3-Tutor-Extension.zip"; // Suggested filename
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulated progress animation (3.5 sec)
    setTimeout(() => {
      setIsDownloading(false);
    }, 3500);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <motion.button
        onClick={handleDownloadClick}
        disabled={isDownloading}
        className={`relative flex items-center justify-center rounded-full transition-all ${
          isDownloading
            ? "cursor-wait"
            : "cursor-pointer hover:scale-110"
        }`}
        style={{ width: 56, height: 56 }}
      >
        {/* Outer Border Circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-500"
          animate={
            isDownloading
              ? { borderColor: "#3b82f6", scale: [1, 1.1, 1] }
              : { borderColor: "#3b82f6" }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {/* Spinner - orbits around the circle */}
        <AnimatePresence>
          {isDownloading && (
            <motion.div
              className="absolute w-2 h-2 bg-white rounded-full z-20"
              initial={{ opacity: 1 }}
              animate={{
                rotate: 360,
                x: [0, 27, 0, -27, 0],
                y: [0, -27, 0, 27, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            />
          )}
        </AnimatePresence>

        {/* Main Circle + Icon */}
        <motion.div
          className="h-14 w-14 rounded-full bg-blue-500 flex justify-center items-center relative shadow-lg z-10"
          animate={
            isDownloading
              ? { rotate: 180, scale: [0.95, 1, 0.95] }
              : {}
          }
          transition={{
            duration: isDownloading ? 1 : 0.4,
            times: isDownloading ? [0, 0.7, 1] : undefined,
          }}
        >
          {/* Background Fill */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-blue-800 rounded-full"
            initial={{ height: "0%" }}
            animate={isDownloading ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            style={{ zIndex: 1 }}
          />

          {/* Download Icon */}
          <motion.svg
            className="w-6 h-6 text-white z-20 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ opacity: 1 }}
            animate={{ opacity: isDownloading ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 19V5m0 14-4-4m4 4 4-4"
            />
          </motion.svg>

          {/* Loading Dot */}
          <motion.div
            className="w-4 h-4 rounded-full bg-white absolute z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isDownloading ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </motion.button>
    </div>
  );
};

