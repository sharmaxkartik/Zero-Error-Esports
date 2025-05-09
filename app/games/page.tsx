"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Users,
  Trophy,
  ArrowRight,
  Gamepad2,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Game data
const games = [
  {
    id: 1,
    title: "Valorant",
    category: "FPS",
    image: "/valorantgame.jpeg?height=400&width=600",
    players: 12,
    achievements: 24,
    description:
      "A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities.",
    featured: true,
  },
  {
    id: 2,
    title: "BGMI",
    category: "FPS",
    image: "/bgmi.avif?height=400&width=600",
    players: 15,
    achievements: 36,
    description:
      "The next evolution of the iconic competitive FPS with updated graphics and refined gameplay.",
    featured: true,
  },
  {
    id: 3,
    title: "League of Legends",
    category: "MOBA",
    image: "/placeholder.svg?height=400&width=600",
    players: 10,
    achievements: 18,
    description:
      "A team-based strategy game where two teams of five champions battle to destroy the enemy base.",
    featured: true,
  },
  {
    id: 4,
    title: "Dota 2",
    category: "MOBA",
    image: "/placeholder.svg?height=400&width=600",
    players: 8,
    achievements: 14,
    description:
      "A deeply complex MOBA where strategy and teamwork are essential for victory.",
    featured: false,
  },
  {
    id: 5,
    title: "Apex Legends",
    category: "Battle Royale",
    image: "/placeholder.svg?height=400&width=600",
    players: 6,
    achievements: 9,
    description:
      "A free-to-play battle royale where legendary characters with powerful abilities team up to battle for fame and fortune.",
    featured: false,
  },
  {
    id: 6,
    title: "Overwatch 2",
    category: "FPS",
    image: "/placeholder.svg?height=400&width=600",
    players: 7,
    achievements: 11,
    description:
      "A team-based action game set in an optimistic future where heroes from around the world battle for victory.",
    featured: false,
  },
  {
    id: 7,
    title: "Rocket League",
    category: "Sports",
    image: "/placeholder.svg?height=400&width=600",
    players: 5,
    achievements: 8,
    description:
      "A high-powered hybrid of arcade soccer and vehicular mayhem with easy-to-understand controls and fluid physics-driven competition.",
    featured: false,
  },
  {
    id: 8,
    title: "Fortnite",
    category: "Battle Royale",
    image: "/placeholder.svg?height=400&width=600",
    players: 4,
    achievements: 7,
    description:
      "A battle royale game with building mechanics where 100 players fight to be the last person standing.",
    featured: false,
  },
];

// Game card component
const GameCard = ({
  game,
  featured = false,
}: {
  game: (typeof games)[0];
  featured?: boolean;
}) => {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-xl ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "h-[400px]" : "h-[300px]"
        }`}
      >
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
            {game.category}
          </span>
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-zinc-900/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium flex items-center">
              <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
              Featured
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70"></div>

        {/* Animated overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-red-600/20"></div>
          <div className="absolute inset-0 scan-lines opacity-20"></div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition-colors duration-300 font-orbitron">
            {game.title}
          </h3>

          <p className="text-zinc-300 text-sm mb-4 line-clamp-2">
            {game.description}
          </p>

          <div className="flex flex-wrap gap-4 text-zinc-400 text-sm">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-red-500" />
              <span>{game.players} Players</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-2 text-red-500" />
              <span>{game.achievements} Achievements</span>
            </div>
          </div>
        </div>

        {/* View team button */}
      </div>
    </motion.div>
  );
};

export default function GamesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredGames, setFilteredGames] = useState(games);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Handle mouse movement for dynamic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Filter games based on search term and category
  useEffect(() => {
    let result = games;

    if (searchTerm) {
      result = result.filter(
        (game) =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((game) => game.category === selectedCategory);
    }

    setFilteredGames(result);
  }, [searchTerm, selectedCategory]);

  // Get unique categories
  const categories = Array.from(new Set(games.map((game) => game.category)));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
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
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.5)_2px,transparent_2px)] bg-[size:40px_40px] opacity-30 z-0"></div>

        {/* Floating circles with blur effect */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-red-600/10 filter blur-[150px] z-0"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-orbitron">
              <span className="text-red-600 glow-text">ZERO ERROR</span> GAMES
            </h1>
            <p className="text-xl text-zinc-300 mb-12">
              Explore our elite teams across multiple competitive titles. From
              tactical shooters to MOBAs, our professional players compete at
              the highest level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Games Grid Section */}
      <section className="relative py-12 pb-32">
        <div className="container mx-auto px-6 relative z-10">
          {/* All Games */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold font-orbitron">
                <span className="text-red-600">ALL</span> GAMES
              </h2>
              <div className="ml-4 h-px bg-gradient-to-r from-red-600 to-transparent flex-grow"></div>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Gamepad2 className="w-16 h-16 mx-auto text-zinc-700 mb-4" />
                <h3 className="text-2xl font-bold text-zinc-500 mb-2">
                  No Games Found
                </h3>
                <p className="text-zinc-600">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            )}
          </motion.div>

          {/* Join Team CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24 text-center bg-gradient-to-r from-red-900/20 via-black to-red-900/20 rounded-2xl p-12 border border-red-900/20"
          >
            <h2 className="text-3xl font-bold mb-4 font-orbitron">
              JOIN THE <span className="text-red-600">BATTLE!</span>
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Whether you're here to win or just for the thrill, this is your
              chance to play. Join the event — let the fun begin!
            </p>
            <Link href="/signup">
              <motion.button
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center mx-auto"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(220, 38, 38, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
