// components/LoadingScreen.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  onLoadingComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingText, setLoadingText] = useState("INITIALIZING");

  const loadingTexts = [
    "INITIALIZING",
    "LOADING ASSETS",
    "PREPARING INTERFACE",
    "ESTABLISHING CONNECTION",
    "LAUNCHING",
  ];

  useEffect(() => {
    if (!isLoading) return;

    const hasLoadedBefore = sessionStorage.getItem("hasLoadedSite");
    const startTime = Date.now();
    const duration = hasLoadedBefore ? 1500 : 4000;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(rawProgress) * 100;
      setProgress(easedProgress);

      if (easedProgress > 20 && easedProgress <= 40) {
        setLoadingText(loadingTexts[1]);
      } else if (easedProgress > 40 && easedProgress <= 60) {
        setLoadingText(loadingTexts[2]);
      } else if (easedProgress > 60 && easedProgress <= 80) {
        setLoadingText(loadingTexts[3]);
      } else if (easedProgress > 80) {
        setLoadingText(loadingTexts[4]);
      }

      if (rawProgress >= 1) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(() => {
          sessionStorage.setItem("hasLoadedSite", "true");
          onLoadingComplete();
        }, 1200);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Title */}
            <div className="mb-12 relative">
              <motion.h1 className="text-6xl md:text-7xl font-black uppercase text-shadow-lg">
                <motion.span className="text-red-600 inline-block">
                  ZERO
                </motion.span>{" "}
                ERROR
              </motion.h1>
              <motion.div className="absolute -bottom-4 left-0 right-0 text-center text-sm text-red-600 uppercase tracking-widest font-bold">
                ESPORTS
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 md:w-96 h-1 bg-zinc-900 relative overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${progress}%`,
                  background: [
                    "linear-gradient(90deg, #FF0000 0%, #FF4C4C 100%)",
                    "linear-gradient(90deg, #FF4C4C 0%, #FF0000 100%)",
                    "linear-gradient(90deg, #FF0000 0%, #FF4C4C 100%)",
                  ],
                  boxShadow: [
                    "0 0 5px rgba(220, 38, 38, 0.6)",
                    "0 0 15px rgba(220, 38, 38, 0.8)",
                    "0 0 5px rgba(220, 38, 38, 0.6)",
                  ],
                }}
                transition={{
                  ease: "easeOut",
                  duration: 0.2,
                  background: { repeat: Infinity, duration: 2 },
                  boxShadow: { repeat: Infinity, duration: 1.5 },
                }}
              />
            </div>

            {/* Loading Text */}
            <div className="mt-4 text-xs text-zinc-500 font-mono">
              <motion.div className="flex items-center">
                <motion.span
                  className="mr-2 inline-block w-2 h-2 bg-red-600 rounded-full"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
                {loadingText}... {Math.round(progress)}%
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
