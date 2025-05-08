"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Trophy,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// Component for dynamic background particles
const ParticlesBackground = () => {
  return (
    <div className="particles-container">
      {[...Array(50)].map((_, index) => (
        <div
          key={index}
          className={`particle particle-${index % 5}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 3}px`, // Smaller size between 2-5px
            height: `${2 + Math.random() * 3}px`, // Smaller size between 2-5px
            opacity: 0.1 + Math.random() * 0.4, // Lower opacity
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${20 + Math.random() * 40}s`, // Much slower movement (20-60s)
            animation: `particle-movement-${index % 4} ${
              20 + Math.random() * 40
            }s infinite alternate ease-in-out`,
          }}
        />
      ))}

      {/* Define random movement patterns with keyframes in a style tag */}
      <style jsx>{`
        .particle {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }

        @keyframes particle-movement-0 {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(
              ${Math.random() * 100 - 50}px,
              ${Math.random() * 100 - 50}px
            );
          }
          50% {
            transform: translate(
              ${Math.random() * 100 - 50}px,
              ${Math.random() * 100 - 50}px
            );
          }
          75% {
            transform: translate(
              ${Math.random() * 100 - 50}px,
              ${Math.random() * 100 - 50}px
            );
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes particle-movement-1 {
          0% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(
              ${Math.random() * 100 - 50}px,
              ${Math.random() * 100 - 50}px
            );
          }
          66% {
            transform: translate(
              ${Math.random() * 100 - 50}px,
              ${Math.random() * 100 - 50}px
            );
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes particle-movement-2 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(
              ${Math.random() * 100 - 50}px,
              ${Math.random() * 100 - 50}px
            );
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes particle-movement-3 {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(
              ${Math.random() * 80 - 40}px,
              ${Math.random() * 80 - 40}px
            );
          }
          75% {
            transform: translate(
              ${Math.random() * 80 - 40}px,
              ${Math.random() * 80 - 40}px
            );
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .particle-0 {
          background-color: rgba(255, 30, 30, 0.2);
        }
        .particle-1 {
          background-color: rgba(255, 255, 255, 0.15);
        }
        .particle-2 {
          background-color: rgba(255, 50, 50, 0.1);
        }
        .particle-3 {
          background-color: rgba(200, 30, 30, 0.2);
        }
        .particle-4 {
          background-color: rgba(255, 100, 100, 0.15);
        }
      `}</style>
    </div>
  );
};

// Valorant-style loading screen component
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

  useEffect(() => {
    if (!isLoading) return;

    let startTime = Date.now();
    const duration = 3500; // Extending animation duration for smoother effect

    // Easing function for smoother progress
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Apply easing for smoother animation
      const easedProgress = easeOutQuart(rawProgress) * 100;
      setProgress(easedProgress);

      if (rawProgress >= 1) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 1200); // Slightly longer fade out for smoother transition
      }
    }, 16); // 60fps update rate for smoother animation

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
            ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth fade
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
            {/* Logo */}
            <div className="mb-12 relative">
              <h1 className="text-6xl md:text-7xl font-black uppercase glitch-text text-shadow-lg">
                <motion.span
                  className="text-red-600 glow-text"
                  animate={{
                    textShadow: [
                      "0 0 8px rgba(220, 38, 38, 0.6)",
                      "0 0 16px rgba(220, 38, 38, 0.8)",
                      "0 0 8px rgba(220, 38, 38, 0.6)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ZERO
                </motion.span>{" "}
                ERROR
              </h1>
              <div className="absolute -bottom-4 left-0 right-0 text-center text-sm text-red-600 uppercase tracking-widest font-bold">
                ESPORTS
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-64 md:w-96 h-0.5 bg-zinc-800 relative overflow-hidden">
              <motion.div
                className="h-full bg-red-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                  ease: "easeOut",
                  duration: 0.2, // Shorter duration for more responsive updates
                }}
              />
            </div>

            {/* Loading text */}
            <div className="mt-4 text-xs text-zinc-500 font-mono">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                LOADING GAME ASSETS... {Math.round(progress)}%
              </motion.span>
            </div>

            {/* Agent silhouette - just an example */}
            <div className="absolute bottom-0 right-0 opacity-20 h-96 w-64">
              <div className="w-full h-full bg-gradient-to-t from-red-600/20 to-transparent" />
            </div>

            {/* Animated corner elements - Valorant UI style */}
            <motion.div
              className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-red-600"
              animate={{
                opacity: [0.7, 1, 0.7],
                borderColor: [
                  "rgb(220, 38, 38)",
                  "rgb(239, 68, 68)",
                  "rgb(220, 38, 38)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-red-600"
              animate={{
                opacity: [0.7, 1, 0.7],
                borderColor: [
                  "rgb(220, 38, 38)",
                  "rgb(239, 68, 68)",
                  "rgb(220, 38, 38)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-red-600"
              animate={{
                opacity: [0.7, 1, 0.7],
                borderColor: [
                  "rgb(220, 38, 38)",
                  "rgb(239, 68, 68)",
                  "rgb(220, 38, 38)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-red-600"
              animate={{
                opacity: [0.7, 1, 0.7],
                borderColor: [
                  "rgb(220, 38, 38)",
                  "rgb(239, 68, 68)",
                  "rgb(220, 38, 38)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
            />

            {/* Scan lines effect */}
            <div className="absolute inset-0 scan-lines opacity-10"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);
  // For dynamic background color effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }

    // Track mouse movement for dynamic effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
            {/* Global dynamic background elements */}
            <div className="fixed inset-0 z-0">
              {/* Dynamic gradient background that moves with mouse */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-black/50 via-red-950/10 to-black/50 z-0"
                style={{
                  backgroundPosition: `${mousePosition.x * 100}% ${
                    mousePosition.y * 100
                  }%`,
                  transition: "background-position 0.5s ease-out",
                }}
              />

              {/* Animated scan lines */}
              <div className="absolute inset-0 scan-lines opacity-20 z-0"></div>

              {/* Dynamic vignette effect */}
              <div className="absolute inset-0 bg-radial-gradient z-0"></div>

              {/* Animated particles */}
              <ParticlesBackground />
            </div>

            {/* Hero Section with Video Background */}
            <section className="relative h-screen overflow-hidden">
              {/* Background grid effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.5)_2px,transparent_2px)] bg-[size:40px_40px] opacity-30 z-10"></div>

              {/* Floating circles with blur effect */}
              <motion.div
                className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-red-600/10 filter blur-[150px] z-10"
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-[-30%] left-[-20%] w-[700px] h-[700px] rounded-full bg-red-600/5 filter blur-[120px] z-10"
                animate={{
                  x: [0, -50, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-[40%] left-[10%] w-[300px] h-[300px] rounded-full bg-blue-600/5 filter blur-[80px] z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Video background */}
              <motion.div
                className="absolute inset-0 z-0"
                style={{ opacity, scale }}
              >
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                <iframe
                  className="absolute inset-0 w-full h-full opacity-70"
                  src="https://www.youtube.com/embed/e_E9W2vsRbQ?autoplay=1&mute=1&loop=1&playlist=e_E9W2vsRbQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>
              </motion.div>

              {/* Semi-transparent overlay for content readability */}
              <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] z-10"></div>

              {/* Scan lines effect */}
              <div className="absolute inset-0 z-10 scan-lines opacity-20"></div>

              {/* Dynamic interactive grid */}
              <div className="absolute inset-0 z-10 opacity-30">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="smallGrid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgba(255,0,0,0.2)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                    <pattern
                      id="grid"
                      width="100"
                      height="100"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect width="100" height="100" fill="url(#smallGrid)" />
                      <path
                        d="M 100 0 L 0 0 0 100"
                        fill="none"
                        stroke="rgba(255,50,50,0.3)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Hero content */}
              <motion.div
                className="container max-w-5xl mx-auto relative z-30 h-full flex flex-col justify-center px-6"
                style={{ opacity: heroTextOpacity, y: heroTextY }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                  <h1 className="text-5xl md:text-8xl font-black uppercase leading-tight max-w-2xl glitch-text text-shadow-lg">
                    <motion.span
                      className="text-red-600 glow-text inline-block"
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
                      className="text-red-600 glow-text inline-block"
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
                        scale: 1.05,
                        boxShadow: "0 0 25px rgba(220,0,0,0.4)",
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
                          }%, rgba(255,50,50,0.7) 0%, transparent 70%)`,
                          opacity: 0.2,
                        }}
                      />
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 flex items-center">
                        Meet Our Team
                        <motion.span
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            repeat: Infinity,
                            repeatDelay: 2,
                            duration: 1,
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

              {/* Animated cursor follower */}
              <motion.div
                className="hidden md:block w-16 h-16 rounded-full pointer-events-none fixed z-50"
                style={{
                  x: mousePosition.x * window.innerWidth - 32,
                  y: mousePosition.y * window.innerHeight - 32,
                  background:
                    "radial-gradient(circle, rgba(255,0,0,0.2) 0%, transparent 70%)",
                  filter: "blur(5px)",
                  opacity: 0.5,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Scroll indicator */}
              <motion.div
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <motion.div
                  className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
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
              </motion.div>
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
                        className="opacity-40 hover:opacity-100 transition-opacity duration-500"
                        variants={itemVariants}
                        whileHover={{ scale: 1.15, filter: "brightness(1.5)" }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <Image
                          src={`/valorant.png?height=40&width=80`}
                          alt={brand}
                          width={80}
                          height={40}
                          className="grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </motion.div>
                    )
                  )}
                </motion.div>
              </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-24 relative">
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      View All
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: 3 }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 0.6,
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
                      image: "/event.jpg?height=280&width=400",
                      category: "Tournament",
                      icon: <Trophy className="w-4 h-4" />,
                    },
                    {
                      title: "Gaming Bootcamp",
                      date: "July 8-10, 2025",
                      location: "Delhi, India",
                      image: "/event.jpg?height=280&width=400",
                      category: "Training",
                      icon: <Calendar className="w-4 h-4" />,
                    },
                    {
                      title: "Community Meetup",
                      date: "August 15, 2025",
                      location: "Bangalore, India",
                      image: "/event.jpg?height=280&width=400",
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
                      <div className="relative h-[280px] overflow-hidden bg-zinc-900 rounded-xl mb-5 border border-zinc-800 shadow-lg">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 p-5 w-full">
                          <div className="flex items-center mb-3">
                            <span className="bg-red-600 p-1.5 rounded-md mr-2 flex items-center justify-center">
                              {event.icon}
                            </span>
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
                            whileHover={{ scale: 1.1 }}
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
                      className="bg-transparent border-2 border-zinc-700 hover:border-red-600 text-white px-8 py-4 rounded-md uppercase tracking-wider font-medium"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(220,38,38,0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View All Events
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
