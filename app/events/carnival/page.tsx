"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  MapPin,
  Users,
  ArrowRight,
  ArrowLeft,
  Clock,
  Trophy,
  Star,
  Zap,
  Shield,
  PieChart,
} from "lucide-react";

// Team data
const featuredTeams = [
  {
    name: "Velocity Vipers",
    logo: "/placeholder.svg?height=100&width=100",
    players: 5,
    region: "North India",
    achievements: "3x Regional Champions",
  },
  {
    name: "Nexus Titans",
    logo: "/placeholder.svg?height=100&width=100",
    players: 5,
    region: "Central India",
    achievements: "BGMI Pro Series Winner",
  },
  {
    name: "Phoenix Squadron",
    logo: "/placeholder.svg?height=100&width=100",
    players: 5,
    region: "South India",
    achievements: "Rising Stars Cup Winner",
  },
  {
    name: "Eclipse Gaming",
    logo: "/placeholder.svg?height=100&width=100",
    players: 5,
    region: "East India",
    achievements: "2x Finalists",
  },
];

// Tournament phases
const tournamentPhases = [
  {
    name: "Registration",
    date: "April 15 - May 15, 2025",
    description:
      "Open registration for all teams that meet the eligibility criteria.",
    icon: <Shield className="h-8 w-8" />,
  },
  {
    name: "Qualifiers",
    date: "May 16 - May 20, 2025",
    description:
      "Online qualifiers to determine the top 64 teams advancing to the Group Stage.",
    icon: <PieChart className="h-8 w-8" />,
  },
  {
    name: "Group Stage",
    date: "May 24, 2025 (Morning)",
    description:
      "128 teams compete in 8 groups of 16 teams each. Top 4 teams from each group advance.",
    icon: <Users className="h-8 w-8" />,
  },
  {
    name: "Finals",
    date: "May 24, 2025 (Evening)",
    description:
      "The top 32 teams battle in an intense finale to determine the champion.",
    icon: <Trophy className="h-8 w-8" />,
  },
];

// Prize distribution
const prizeDistribution = [
  {
    position: "1st Place",
    prize: "₹1,00,000",
    color: "from-amber-500 to-yellow-500",
  },
  {
    position: "2nd Place",
    prize: "₹50,000",
    color: "from-slate-300 to-slate-400",
  },
  {
    position: "3rd Place",
    prize: "₹25,000",
    color: "from-amber-700 to-amber-800",
  },
  {
    position: "4th Place",
    prize: "₹10,000",
    color: "from-zinc-600 to-zinc-700",
  },
  { position: "5th-10th", prize: "₹3,000", color: "from-zinc-700 to-zinc-800" },
];

export default function CarnivalShowPage() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effect references
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Track mouse movement for dynamic effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Animation variants
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
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const shimmerVariants = {
    initial: { x: "-100%", opacity: 0.3 },
    animate: {
      x: "100%",
      opacity: 1,
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear",
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 relative"
        >
          <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-red-600 font-bold text-lg">
            BGMI
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Global dynamic background elements */}
      <div className="fixed inset-0 z-0">
        {/* Dynamic gradient background that moves with mouse */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/80 via-red-950/10 to-black/80 z-0"
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
      </div>

      {/* Hero Section */}
      <section ref={ref} className="relative h-screen overflow-hidden">
        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          <Image
            src="/images/carnival.webp?height=1200&width=1800"
            alt="BGMI Tournament"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </motion.div>

        {/* Hero content */}
        <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
          <motion.div className="max-w-4xl" style={{ y: textY, opacity }}>
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link href="/events/gameocon">
                <motion.button
                  className="flex items-center text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-lg"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>Back to Game'O'Con</span>
                </motion.button>
              </Link>
            </motion.div>

            <div className="mb-4 inline-flex items-center gap-2 bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-md border border-red-600/30">
              <Trophy className="h-4 w-4" />
              <span>FLAGSHIP TOURNAMENT</span>
            </div>

            <motion.h1
              className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
                CARNIVAL
              </span>
              <br />
              <span className="text-white glow-text-white">SHOW</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Central India's most prestigious BGMI tournament featuring 128
              elite teams competing for glory and a ₹2,00,000 prize pool.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 bg-zinc-900/70 backdrop-blur-md px-4 py-2 rounded-lg border border-zinc-800/50">
                <Calendar className="h-5 w-5 text-red-500" />
                <span>May 24, 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/70 backdrop-blur-md px-4 py-2 rounded-lg border border-zinc-800/50">
                <MapPin className="h-5 w-5 text-red-500" />
                <span>Main Arena, ITM Gwalior</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/70 backdrop-blur-md px-4 py-2 rounded-lg border border-zinc-800/50">
                <Users className="h-5 w-5 text-red-500" />
                <span>128 Teams</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/70 backdrop-blur-md px-4 py-2 rounded-lg border border-zinc-800/50">
                <Zap className="h-5 w-5 text-amber-500" />
                <span>₹2,00,000 Prize Pool</span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link href="/signup">
                <motion.div
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 text-lg uppercase font-bold rounded-md flex items-center shadow-[0_0_15px_rgba(220,38,38,0.3)] relative overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(220,38,38,0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
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

                  {/* Shimmer effect */}
                  <motion.span
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />

                  <span className="relative z-10 flex items-center">
                    Register Your Team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </motion.div>
              </Link>

              <Link href="#tournament-format">
                <motion.button
                  className="border-2 border-zinc-700 hover:border-red-600 text-white bg-zinc-900/50 backdrop-blur-sm px-6 py-4 text-lg rounded-md flex items-center transition-colors duration-300"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(30,30,30,0.8)",
                    borderColor: "rgba(220,38,38,0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Tournament Details
                  <ChevronRight className="ml-2 h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 1.5,
              duration: 1,
            },
          }}
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
              transition: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              },
            }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-zinc-500 mb-2">
              Scroll to explore
            </span>
            <div className="h-10 w-6 border-2 border-zinc-500 rounded-full flex justify-center pt-2">
              <motion.div
                className="h-2 w-2 bg-red-500 rounded-full"
                animate={{
                  y: [0, 12, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.2,
                  },
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Tournament Format Section */}
      <section id="tournament-format" className="py-24 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="mb-4 inline-flex items-center gap-2 bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md border border-red-600/30">
              <Star className="h-4 w-4" />
              <span>TOURNAMENT FORMAT</span>
            </div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 font-orbitron"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              THE <span className="text-red-600">BATTLEFIELD</span> AWAITS
            </motion.h2>

            <motion.p
              className="text-lg text-zinc-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Experience the most competitive BGMI tournament structure designed
              to identify the truly elite teams through multiple challenging
              phases.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tournamentPhases.map((phase, index) => (
              <motion.div
                key={phase.name}
                variants={itemVariants}
                className="bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 rounded-xl p-6 border border-zinc-800/50 backdrop-blur-sm hover:border-red-600/50 transition-colors duration-300 relative overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-red-600/5 filter blur-xl group-hover:bg-red-600/10 transition-colors duration-300"></div>

                <div className="mb-4 bg-zinc-800/50 text-red-500 p-4 rounded-lg inline-flex items-center justify-center">
                  {phase.icon}
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-red-500 transition-colors duration-300">
                  {phase.name}
                </h3>

                <div className="text-sm text-red-500 font-medium mb-3">
                  {phase.date}
                </div>

                <p className="text-zinc-400 text-sm">{phase.description}</p>

                <div className="absolute bottom-3 right-3 opacity-10 text-4xl font-bold group-hover:opacity-15 transition-opacity duration-300">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Prize Pool Section */}
      <section className="py-24 relative bg-zinc-950">
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="mb-4 inline-flex items-center gap-2 bg-amber-600/20 text-amber-500 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md border border-amber-600/30">
              <Trophy className="h-4 w-4" />
              <span>PRIZE POOL</span>
            </div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 font-orbitron"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              ₹<span className="text-amber-500">2,00,000</span> PRIZE POOL
            </motion.h2>

            <motion.p
              className="text-lg text-zinc-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Compete for glory and substantial rewards at Central India's
              richest BGMI tournament.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {prizeDistribution.map((prize, index) => (
              <motion.div
                key={prize.position}
                variants={itemVariants}
                className={`bg-gradient-to-b ${prize.color} rounded-xl p-6 text-center backdrop-blur-sm border border-zinc-800/50 relative overflow-hidden group`}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  className="text-6xl md:text-8xl font-bold text-white/10 absolute -top-2 -left-2"
                  initial={{ opacity: 0.1 }}
                  whileInView={{ opacity: 0.1 }}
                  whileHover={{ scale: 1.2, opacity: 0.15 }}
                >
                  {index + 1}
                </motion.div>

                <h3 className="text-xl font-bold mb-2 relative z-10">
                  {prize.position}
                </h3>
                <p className="text-2xl md:text-3xl font-bold relative z-10">
                  {prize.prize}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Teams Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="mb-4 inline-flex items-center gap-2 bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md border border-red-600/30">
              <Shield className="h-4 w-4" />
              <span>ELITE CONTENDERS</span>
            </div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 font-orbitron"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              FEATURED <span className="text-red-600">TEAMS</span>
            </motion.h2>

            <motion.p
              className="text-lg text-zinc-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Some of the top contenders ready to compete for the championship
              title.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredTeams.map((team) => (
              <motion.div
                key={team.name}
                variants={itemVariants}
                className="bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 rounded-xl overflow-hidden border border-zinc-800/50 backdrop-blur-sm hover:border-red-600/50 transition-colors duration-300 group"
                whileHover={{
                  y: -5,
                  boxShadow: "0 0 20px rgba(220,38,38,0.2)",
                }}
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 mb-4 rounded-full bg-red-900/20 p-1 relative">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-1 group-hover:text-red-500 transition-colors duration-300">
                    {team.name}
                  </h3>

                  <p className="text-red-500 text-sm font-medium mb-4">
                    {team.achievements}
                  </p>

                  <div className="w-full grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-zinc-800/50 py-2 px-3 rounded-lg">
                      <p className="text-zinc-500">Players</p>
                      <p className="font-medium">{team.players}</p>
                    </div>
                    <div className="bg-zinc-800/50 py-2 px-3 rounded-lg">
                      <p className="text-zinc-500">Region</p>
                      <p className="font-medium">{team.region}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="py-24 relative bg-gradient-to-b from-zinc-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

          {/* Floating red orbs */}
          <div className="absolute top-20 left-20 w-60 h-60 rounded-full bg-red-600/5 filter blur-[80px]"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-red-600/5 filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6 font-orbitron"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              READY TO <span className="text-red-600">BATTLE?</span>
            </motion.h2>

            <motion.p
              className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Registration closes on May 15, 2025. Secure your team's spot in
              Central India's most prestigious BGMI tournament before it's too
              late.
            </motion.p>

            <Link href="/signup">
              <motion.div
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-5 text-xl uppercase font-bold rounded-md inline-flex items-center shadow-[0_0_20px_rgba(220,38,38,0.3)] relative overflow-hidden group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(220,38,38,0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
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

                {/* Shimmer effect */}
                <motion.span
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />

                <span className="relative z-10 flex items-center">
                  Register Now
                  <ArrowRight className="ml-2 h-6 w-6" />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
