"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Trophy,
  Calendar,
  Users,
  ArrowRight,
  Gamepad2,
  Zap,
  Star,
  Award,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";

// Refined particle system with smoother animations
const ParticlesBackground = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    // Reduce particle count for better performance
    const newParticles = Array.from({ length: 30 }, (_, i) => {
      const isRed = Math.random() > 0.6;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.5, // Slightly smaller particles
        color: isRed
          ? `rgba(${220 + Math.random() * 35}, ${20 + Math.random() * 30}, ${
              20 + Math.random() * 30
            }, ${0.1 + Math.random() * 0.2})`
          : `rgba(255, 255, 255, ${0.05 + Math.random() * 0.1})`,
        speed: 30 + Math.random() * 30, // Slightly faster for more dynamic feel
        opacity: 0.1 + Math.random() * 0.2,
      };
    });

    setParticles(newParticles);
  }, []);

  return (
    <div className="particles-container absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animation: `float-${particle.id % 5} ${
              particle.speed
            }s infinite alternate ease-in-out`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float-0 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(
              ${Math.random() * 80 - 40}px,
              ${Math.random() * 80 - 40}px
            );
          }
        }
        @keyframes float-1 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(
              ${Math.random() * 80 - 40}px,
              ${Math.random() * 80 - 40}px
            );
          }
        }
        @keyframes float-2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(
              ${Math.random() * 80 - 40}px,
              ${Math.random() * 80 - 40}px
            );
          }
        }
        @keyframes float-3 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(
              ${Math.random() * 80 - 40}px,
              ${Math.random() * 80 - 40}px
            );
          }
        }
        @keyframes float-4 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(
              ${Math.random() * 80 - 40}px,
              ${Math.random() * 80 - 40}px
            );
          }
        }
      `}</style>
    </div>
  );
};

// Refined loading screen with smoother animations and optimized performance
interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen = ({
  isLoading,
  onLoadingComplete,
}: LoadingScreenProps) => {
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

    // Use sessionStorage to remember if we've shown the loader before
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedSite");

    // If we've loaded before, make the progress faster (1.5s instead of 4s)
    const startTime = Date.now();
    const duration = hasLoadedBefore ? 1500 : 4000;

    // Easing function for smoother progress
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(rawProgress) * 100;
      setProgress(easedProgress);

      // Change loading text at different progress points
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
          // Save that we've loaded the site before
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
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            {/* Logo with smooth animation */}
            <div className="mb-12 relative">
              <motion.h1
                className="text-6xl md:text-7xl font-black uppercase text-shadow-lg"
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                  transition: { duration: 1.5, ease: "easeOut" },
                }}
              >
                <motion.span
                  className="text-red-600 relative inline-block"
                  animate={{
                    textShadow: "0 0 10px rgba(220, 38, 38, 0.6)",
                  }}
                >
                  ZERO
                </motion.span>{" "}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  ERROR
                </motion.span>
              </motion.h1>
              <motion.div
                className="absolute -bottom-4 left-0 right-0 text-center text-sm text-red-600 uppercase tracking-widest font-bold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                ESPORTS
              </motion.div>
            </div>

            {/* Smoother progress bar with pulsing effect */}
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
                  background: {
                    repeat: Infinity,
                    duration: 2,
                  },
                  boxShadow: {
                    repeat: Infinity,
                    duration: 1.5,
                  },
                }}
              />
            </div>

            {/* Loading text with subtle animation */}
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

            {/* Animated corner elements with subtle effects */}
            <motion.div
              className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-red-600/50"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
            />
            <motion.div
              className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-red-600/50"
              animate={{
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-red-600/50"
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: 1,
              }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-red-600/50"
              animate={{
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: 1.5,
              }}
            />

            {/* Subtle scan lines effect */}
            <div className="absolute inset-0 scan-lines opacity-10"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Refined background with subtle 3D effect
const AnimatedBackground = ({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Dynamic gradient background that moves with mouse */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-red-950/20 to-black/80 z-0"
        style={{
          backgroundPosition: `${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%`,
          transition: "background-position 0.8s ease-out",
        }}
      />

      {/* New: Dynamic content blur under text for improved readability */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          backdropFilter: "blur(2px)",
          opacity: scrollYProgress.get() > 0.05 ? 0.2 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Subtle scan lines */}
      <div className="absolute inset-0 scan-lines opacity-20 z-0"></div>

      {/* Dynamic vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient z-0"></div>

      {/* Animated particles */}
      <ParticlesBackground />
    </div>
  );
};

// Refined animated counter with smooth animation
const AnimatedCounter = ({
  value,
  label,
  icon,
  delay = 0,
}: {
  value: number;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startValue = 0;
          const duration = 2000; // 2 seconds
          const startTime = Date.now();

          const timer = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Easing function for smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            startValue = Math.floor(easedProgress * value);
            setCount(startValue);

            if (progress === 1) {
              clearInterval(timer);
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [value]);

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay }}
    >
      <div className="bg-red-600/10 p-4 rounded-full mb-4">{icon}</div>
      <span ref={countRef} className="text-4xl font-bold text-white">
        {count}
        <span className="text-red-500">+</span>
      </span>
      <span className="text-zinc-400 mt-2 text-sm uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
};

// New component: Featured Game Card
const GameCard = ({
  title,
  image,
  players,
  achievements,
}: {
  title: string;
  image: string;
  players: number;
  achievements: number;
}) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-zinc-800/60 group"
      style={{
        background: "rgba(24, 24, 27, 0.7)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
      }}
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/event.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex justify-between text-sm text-zinc-400">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-red-500" />
            <span>{players} Players</span>
          </div>
          <div className="flex items-center">
            <Trophy className="w-4 h-4 mr-2 text-red-500" />
            <span>{achievements} Achievements</span>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-red-600"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      />
    </motion.div>
  );
};

// New component: Team Member Card
const TeamMemberCard = ({
  name,
  role,
  image,
  stats,
  index,
}: {
  name: string;
  role: string;
  image: string;
  stats: { label: string; value: string }[];
  index: number;
}) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 p-5 w-full">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-red-500 text-sm uppercase tracking-wider">
            {role}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-zinc-800/50 p-2 rounded">
              <p className="text-xs text-zinc-500">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <motion.button
          className="w-full py-2 mt-2 bg-red-600/10 border border-red-600/30 rounded text-red-500 text-sm font-medium transition-colors hover:bg-red-600/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Profile
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function Home() {
  // Add a state for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  // Fix: Create transform variables for all useTransform calls
  const translateY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const contentTranslateY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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

    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

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
            {/* Refined animated background */}
            <AnimatedBackground mousePosition={mousePosition} />

            {/* Hero Section with Video Background */}
            <section className="relative h-screen overflow-hidden">
              {/* Background layer with parallax effect */}
              <motion.div
                className="absolute inset-0 z-0"
                style={{
                  scale,
                  opacity,
                  y: translateY, // Fix: Use the pre-defined transform variable
                }}
              >
                <div className="absolute inset-0 bg-black/30 z-10" />
                <iframe
                  className="absolute inset-0 w-full h-full opacity-70"
                  src="https://www.youtube.com/embed/e_E9W2vsRbQ?autoplay=1&mute=1&loop=1&playlist=e_E9W2vsRbQ&controls=0&showinfo=0&rel=0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>
              </motion.div>

              {/* Content with opposite parallax movement */}
              <motion.div
                className="container max-w-5xl mx-auto relative z-30 h-full flex flex-col justify-center px-6"
                style={{
                  y: contentTranslateY, // Fix: Use the pre-defined transform variable
                  opacity: contentOpacity, // Fix: Use the pre-defined transform variable
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                  <h1 className="text-5xl md:text-8xl font-black uppercase leading-tight max-w-2xl text-shadow-lg">
                    <motion.span
                      className="text-red-600 inline-block"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      ZERO
                    </motion.span>{" "}
                    ERROR
                    <br />
                    <motion.span
                      className="text-red-600 inline-block"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      ESPORTS
                    </motion.span>
                  </h1>
                </motion.div>

                <motion.p
                  className="text-xl md:text-2xl text-white mt-6 max-w-xl font-light text-shadow"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                >
                  Where precision meets passion. Join the elite gaming team that
                  accepts nothing less than victory.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <Link href="/teams">
                    <motion.div
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 uppercase font-bold text-sm rounded-md flex items-center shadow-[0_0_15px_rgba(150,0,0,0.3)] relative overflow-hidden group"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 25px rgba(220,0,0,0.4)",
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <motion.span
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          x: ["-100%", "100%"],
                          opacity: [0.4, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 1.5,
                          ease: "linear",
                        }}
                      />
                      <span className="relative z-10 flex items-center">
                        Meet Our Team
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut",
                          }}
                        >
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </motion.span>
                      </span>
                    </motion.div>
                  </Link>

                  <Link href="/signup">
                    <motion.div
                      className="border-2 border-zinc-700 hover:border-red-600 text-white bg-zinc-900/50 backdrop-blur-sm px-8 py-4 uppercase font-bold text-sm rounded-md flex items-center transition-colors duration-300 relative overflow-hidden"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(30,30,30,0.8)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      <motion.span
                        className="absolute inset-0 w-full h-full"
                        style={{
                          background: `radial-gradient(circle at ${
                            mousePosition.x * 100
                          }% ${
                            mousePosition.y * 100
                          }%, rgba(255,0,0,0.5) 0%, transparent 70%)`,
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        }}
                        whileHover={{ opacity: 0.3 }}
                      />
                      <span className="relative z-10">
                        Join Now
                        <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Subtle cursor follower */}
              <motion.div
                className="hidden md:block fixed z-50 pointer-events-none"
                style={{
                  x: cursorX,
                  y: cursorY,
                  width: 0,
                  height: 0,
                }}
              >
                <motion.div
                  className="absolute w-12 h-12 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,0,0,0.2) 0%, transparent 70%)",
                    filter: "blur(5px)",
                  }}
                />
                <motion.div className="absolute w-1 h-1 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </motion.div>

              {/* Refined scroll indicator */}
              <motion.div
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <motion.div
                  className="w-6 h-10 border-2 border-white rounded-full flex justify-center relative overflow-hidden"
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                  }}
                >
                  <motion.div
                    className="w-1 h-2 bg-white rounded-full mt-2"
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                    }}
                  />
                </motion.div>
                <motion.p
                  className="text-xs text-center mt-2 text-zinc-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                  }}
                >
                  SCROLL DOWN
                </motion.p>
              </motion.div>
            </section>

            {/* Stats Section */}
            <section className="relative py-16 bg-black/50 backdrop-blur-sm border-t border-b border-zinc-800/50">
              <div className="max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <AnimatedCounter
                    value={50}
                    label="Tournaments Won"
                    icon={<Trophy className="w-6 h-6 text-red-500" />}
                    delay={0}
                  />
                  <AnimatedCounter
                    value={120}
                    label="Active Players"
                    icon={<Gamepad2 className="w-6 h-6 text-red-500" />}
                    delay={0.1}
                  />
                  <AnimatedCounter
                    value={35}
                    label="Global Events"
                    icon={<Zap className="w-6 h-6 text-red-500" />}
                    delay={0.2}
                  />
                  <AnimatedCounter
                    value={10000}
                    label="Community Members"
                    icon={<Users className="w-6 h-6 text-red-500" />}
                    delay={0.3}
                  />
                </div>
              </div>
            </section>

            {/* Featured Games Section - New */}
            <section className="py-24 relative">
              <div className="max-w-5xl mx-auto px-6 relative">
                <motion.div
                  className="mb-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="h-0.5 bg-red-600 mx-auto mb-4"
                  />
                  <h2 className="text-4xl font-bold uppercase mb-4">
                    FEATURED GAMES
                  </h2>
                  <p className="text-zinc-400 max-w-2xl mx-auto">
                    Our professional teams compete at the highest level across
                    multiple titles. Check out our featured games and follow our
                    journey to the top.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Valorant",
                      image: "/event.jpg?height=200&width=350",
                      players: 12,
                      achievements: 8,
                    },
                    {
                      title: "Counter-Strike 2",
                      image: "/event.jpg?height=200&width=350",
                      players: 15,
                      achievements: 12,
                    },
                    {
                      title: "League of Legends",
                      image: "/event.jpg?height=200&width=350",
                      players: 10,
                      achievements: 6,
                    },
                  ].map((game, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.1 }}
                    >
                      <GameCard
                        title={game.title}
                        image={game.image}
                        players={game.players}
                        achievements={game.achievements}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  <Link href="/games">
                    <motion.button
                      className="bg-transparent border-2 border-zinc-700 hover:border-red-600 text-white px-8 py-3 rounded-md uppercase tracking-wider font-medium relative overflow-hidden group"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(220,38,38,0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">View All Games</span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* Sponsors Section */}
            <section className="border-t border-b border-zinc-800/50 py-10 relative backdrop-blur-sm bg-black/50">
              <div className="max-w-5xl mx-auto px-6">
                <motion.h3
                  className="text-center mb-8 text-zinc-400 uppercase text-sm tracking-widest"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  Trusted by world-class brands
                </motion.h3>

                <motion.div
                  className="flex justify-between items-center flex-wrap gap-8 md:gap-12"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {["adidas", "nike", "puma", "reebook", "under-armour"].map(
                    (brand, index) => (
                      <motion.div
                        key={brand}
                        className="opacity-40 hover:opacity-100 transition-opacity duration-500 relative group"
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.15,
                          filter: "brightness(1.5)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <motion.div className="absolute -inset-2 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100" />
                        <Image
                          src={`/valorant.png?height=40&width=80`}
                          alt={brand}
                          width={80}
                          height={40}
                          className="grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10"
                        />
                      </motion.div>
                    )
                  )}
                </motion.div>
              </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-24 relative bg-transparent">
              {/* Subtle diagonal pattern background */}
              <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

              <div className="max-w-5xl mx-auto px-6 relative">
                {/* Section header with navigation */}
                <motion.div
                  className="flex flex-wrap justify-between items-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                >
                  <div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="h-0.5 bg-gradient-to-r from-red-600 to-transparent mb-4 max-w-[200px]"
                    />
                    <h2 className="text-3xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                      UPCOMING EVENTS
                    </h2>
                    <p className="text-zinc-500 mt-2">
                      Don't miss our exciting upcoming tournaments and events
                    </p>
                  </div>

                  <Link href="/events">
                    <motion.div
                      className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-5 py-3 mt-4 sm:mt-0 text-sm uppercase font-bold rounded-md transition-colors flex items-center group"
                      whileHover={{
                        scale: 1.05,
                        borderColor: "rgb(220, 38, 38)",
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      View All
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1,
                        }}
                      >
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:text-red-500" />
                      </motion.span>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Events cards grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {[
                    {
                      title: "Zero Error Championship",
                      date: "June 15-20, 2025",
                      location: "Mumbai, India",
                      image: "/valorant.png?height=280&width=400",
                      category: "Tournament",
                      icon: <Trophy className="w-4 h-4" />,
                    },
                    {
                      title: "Gaming Bootcamp",
                      date: "July 8-10, 2025",
                      location: "Delhi, India",
                      image: "/valorant.png?height=280&width=400",
                      category: "Training",
                      icon: <Calendar className="w-4 h-4" />,
                    },
                    {
                      title: "Community Meetup",
                      date: "August 15, 2025",
                      location: "Bangalore, India",
                      image: "/valorant.png?height=280&width=400",
                      category: "Community",
                      icon: <Users className="w-4 h-4" />,
                    },
                  ].map((event, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      variants={itemVariants}
                      whileHover={{ y: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <div className="relative h-[280px] overflow-hidden bg-zinc-900 rounded-xl mb-5 border border-zinc-800 shadow-lg group-hover:border-red-600/50 transition-colors duration-300">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        <motion.div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 p-5 w-full">
                          <div className="flex items-center mb-3">
                            <motion.span
                              className="bg-red-600 p-1.5 rounded-md mr-2 flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                            >
                              {event.icon}
                            </motion.span>
                            <span className="text-xs uppercase text-white font-bold tracking-wider">
                              {event.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors duration-300">
                            {event.title}
                          </h3>
                          <div className="flex flex-col text-zinc-400 text-sm space-y-1">
                            <motion.span
                              initial={{ x: 0 }}
                              whileHover={{ x: 3 }}
                              className="flex items-center"
                            >
                              <Calendar className="w-3 h-3 mr-2 text-zinc-500" />{" "}
                              {event.date}
                            </motion.span>
                            <motion.span
                              initial={{ x: 0 }}
                              whileHover={{ x: 3 }}
                              className="flex items-center"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                className="w-3 h-3 mr-2 text-zinc-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                              {event.location}
                            </motion.span>
                          </div>
                        </div>

                        {/* Overlay button that appears on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            className="bg-red-600/90 backdrop-blur-sm text-white px-5 py-3 rounded-lg font-bold flex items-center space-x-2"
                            whileHover={{
                              scale: 1.1,
                              boxShadow: "0 0 20px rgba(220,38,38,0.5)",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>Learn More</span>
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                  className="mt-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <Link href="/events">
                    <motion.button
                      className="bg-transparent border-2 border-zinc-700 hover:border-red-600 text-white px-8 py-4 rounded-md uppercase tracking-wider font-medium relative overflow-hidden group"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(220,38,38,0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">View All Events</span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global styles for animations */}
      <style jsx global>{`
        .scan-lines {
          background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 1px,
            rgba(255, 255, 255, 0.05) 1px,
            rgba(255, 255, 255, 0.05) 2px
          );
          pointer-events: none;
        }

        .bg-radial-gradient {
          background: radial-gradient(
            circle at center,
            transparent 0%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }

        .text-shadow {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .text-shadow-lg {
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
