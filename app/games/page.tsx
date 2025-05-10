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

// Game data
const games = [
  {
    id: 1,
    title: "Valorant",
    category: "FPS",
    image: "/images/valorantgame.jpeg?height=400&width=600",
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
    image: "/images/bgmi.avif?height=400&width=600",
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
    image: "/images/lol.avif?height=400&width=600",
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

          <div className="flex flex-wrap gap-4 text-zinc-400 text-sm mb-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-red-500" />
              <span>{game.players} Players</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-2 text-red-500" />
              <span>{game.achievements} Achievements</span>
            </div>
          </div>

          {/* View game button */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href={`/games/${game.id}`}>
              <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm flex items-center transition-all duration-300">
                View Teams <ArrowRight className="ml-1 w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
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
    <div className="min-h-screen text-white">
      {/* Global dynamic background elements */}
      <div className="fixed inset-0 z-0">
        {/* Dynamic gradient background that moves with mouse */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-red-950/10 to-black/80 z-0"
          style={{
            backgroundPosition: `${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%`,
            transition: "background-position 0.8s ease-out",
          }}
        />

        {/* Abstract cyberpunk grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:70px_70px] opacity-20 z-0"></div>

        {/* Animated scan lines */}
        <div className="absolute inset-0 scan-lines opacity-8 z-0"></div>

        {/* Particle overlay - use with a custom CSS class */}
        <div className="absolute inset-0 particle-overlay z-0"></div>

        {/* Dynamic vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient opacity-70 z-0"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.5)_2px,transparent_2px)] bg-[size:40px_40px] opacity-30 z-0"></div>

        {/* Floating orbs with blur effect */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-red-600/10 filter blur-[150px] z-0"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-[-30%] left-[-5%] w-[400px] h-[400px] rounded-full bg-red-800/10 filter blur-[100px] z-0"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-6 relative inline-block">
              <h1 className="text-5xl md:text-7xl font-bold font-orbitron relative z-10">
                <span className="text-red-600 glow-text">ZERO ERROR</span>
              </h1>
              <motion.div
                className="absolute -inset-1 bg-red-600/20 rounded-lg blur-xl z-0"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-orbitron">
              GAMES DIVISION
            </h2>

            <p className="text-xl text-zinc-300 mb-12 leading-relaxed">
              Explore our elite teams across multiple competitive titles. From
              tactical shooters to MOBAs, our professional players compete at
              the highest level with precision and passion.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/teams">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-300 flex items-center">
                      Explore Teams <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-16 h-16 border-4 border-zinc-700 border-t-red-600 rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-400 animate-pulse">Loading games...</p>
              </div>
            ) : (
              <>
                {/* Featured Games */}
                <div className="mb-16">
                  <div className="flex items-center mb-8">
                    <h2 className="text-2xl font-bold font-orbitron">
                      <span className="text-red-600">Featured</span> GAMES
                    </h2>
                    <div className="ml-4 h-px bg-gradient-to-r from-red-600 to-transparent flex-grow"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredGames
                      .filter((game) => game.featured)
                      .map((game) => (
                        <GameCard key={game.id} game={game} featured={true} />
                      ))}
                  </div>
                </div>

                {/* All Games */}
                <div>
                  <div className="flex items-center mb-8">
                    <h2 className="text-2xl font-bold font-orbitron">
                      <span className="text-red-600">All</span> GAMES
                    </h2>
                    <div className="ml-4 h-px bg-gradient-to-r from-red-600 to-transparent flex-grow"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames
                      .filter(
                        (game) => !game.featured || selectedCategory !== null
                      )
                      .map((game) => (
                        <GameCard key={game.id} game={game} featured={false} />
                      ))}
                  </div>
                </div>
              </>
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
    </div>
  );
}
