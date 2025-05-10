"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";

// Import components
import ParticlesBackground from "@/components/home/ParticlesBackground";
import LoadingScreen from "@/components/home/LoadingScreen";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedGamesSection from "@/components/home/FeaturedGamesSection";
import SponsorsSection from "@/components/home/SponsorsSection";
import UpcomingEventsSection from "@/components/home/UpcomingEventsSection";
import CursorFollower from "@/components/home/CursorFollower";

export default function Home() {
  // Add a state for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  // For dynamic background color effect
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // For cursor trailer effect
  const cursorX = useSpring(0, { stiffness: 100, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    // Check user's motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Track mouse movement for dynamic effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });

      // Update cursor trailer position
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-transparent text-white overflow-hidden relative">
      {/* Loading Screen */}
      <LoadingScreen
        isLoading={loading}
        onLoadingComplete={handleLoadingComplete}
      />

      {/* Main Content */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            {/* Background layers */}
            <div className="absolute inset-0 z-0">
              {/* Animated gradient background */}
              <AnimatedBackground mousePosition={mousePosition} />

              {/* Particle effects layer */}
              <ParticlesBackground
                reducedMotion={prefersReducedMotion}
                mousePosition={mousePosition}
              />
            </div>
            w{/* Hero Section with Video Background */}
            <HeroSection
              scrollYProgress={scrollYProgress}
              mousePosition={mousePosition}
              cursorX={cursorX}
              cursorY={cursorY}
            />
            {/* Stats Section */}
            <StatsSection />
            {/* Featured Games Section */}
            <FeaturedGamesSection />
            {/* Sponsors Section */}
            <SponsorsSection />
            {/* Upcoming Events Section */}
            <UpcomingEventsSection />
            {/* Cursor Follower */}
            <CursorFollower cursorX={cursorX} cursorY={cursorY} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
