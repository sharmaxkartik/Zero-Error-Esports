"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  MapPin,
  Users,
  ArrowRight,
  ArrowLeft,
  Clock,
  Trophy,
} from "lucide-react";
import { useParams } from "next/navigation";

// Game O Con sub-events data
const gameOConEvents = [
  {
    id: "bgmi-tournament",
    title: "BGMI Tournament",
    date: "May 24, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "Main Arena, ITM Gwalior",
    participants: "128 Teams",
    image: "/images/bgmi.avif?height=300&width=500",
    category: "Tournament",
    description:
      "Central India's biggest BGMI tournament featuring 128 teams competing for glory and impressive prize pool.",
    prizePool: "₹2,00,000",
  },
  {
    id: "valorant-championship",
    title: "Valorant Championship",
    date: "May 24-25, 2025",
    time: "11:00 AM - 6:00 PM",
    location: "Esports Arena, ITM Gwalior",
    participants: "32 Teams",
    image: "/placeholder.svg?height=300&width=500",
    category: "Tournament",
    description:
      "Two-day Valorant tournament featuring the top 32 teams from Central India competing for an impressive prize pool.",
    prizePool: "₹1,00,000",
  },
  {
    id: "cosplay-competition",
    title: "Cosplay Competition",
    date: "May 24, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Center Stage, ITM Gwalior",
    participants: "50+ Cosplayers",
    image: "/placeholder.svg?height=300&width=500",
    category: "Competition",
    description:
      "Showcase your best gaming character cosplay and compete for amazing prizes and recognition.",
    prizePool: "₹50,000",
  },
  {
    id: "gaming-expo",
    title: "Gaming Expo & Marketplace",
    date: "May 24, 2025",
    time: "9:00 AM - 8:00 PM",
    location: "Exhibition Hall, ITM Gwalior",
    participants: "30+ Exhibitors",
    image: "/placeholder.svg?height=300&width=500",
    category: "Expo",
    description:
      "Explore the latest gaming gear, merchandise, and innovations from top brands and local creators.",
    prizePool: "N/A",
  },
];

export default function GameOConPage() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Get unique categories
  const categories = Array.from(
    new Set(gameOConEvents.map((event) => event.category))
  );

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

  // Filter events by category
  const filteredEvents = activeCategory
    ? gameOConEvents.filter((event) => event.category === activeCategory)
    : gameOConEvents;

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Global dynamic background elements - removed or made transparent */}
      <div className="fixed inset-0 z-0">
        {/* Dynamic gradient background made transparent */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-red-950/10 to-transparent z-0"
          style={{
            backgroundPosition: `${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%`,
            transition: "background-position 0.5s ease-out",
          }}
        />

        {/* Animated scan lines with reduced opacity */}
        <div className="absolute inset-0 scan-lines opacity-10 z-0"></div>

        {/* Dynamic vignette effect made more transparent */}
        <div className="absolute inset-0 bg-radial-gradient opacity-50 z-0"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.5)_2px,transparent_2px)] bg-[size:40px_40px] opacity-30 z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/events">
              <motion.button
                className="flex items-center text-zinc-400 hover:text-white transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.97 }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Back to Events</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Event header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-orbitron">
              <span className="text-red-600 glow-text">GAME'O'CON 25</span>
            </h1>
            <p className="text-xl text-zinc-300 mb-6">
              Central India's Biggest Gaming & Esports Carnival
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400 mb-8">
              <div className="flex items-center bg-zinc-900/80 px-4 py-2 rounded-full backdrop-blur-sm">
                <Calendar className="h-5 w-5 mr-2 text-red-500" />
                <span>24th May, 2025</span>
              </div>
              <div className="flex items-center bg-zinc-900/80 px-4 py-2 rounded-full backdrop-blur-sm">
                <MapPin className="h-5 w-5 mr-2 text-red-500" />
                <span>ITM Gwalior</span>
              </div>
              <div className="flex items-center bg-zinc-900/80 px-4 py-2 rounded-full backdrop-blur-sm">
                <Users className="h-5 w-5 mr-2 text-red-500" />
                <span>8,000+ Attendees</span>
              </div>
            </div>
          </motion.div>

          {/* Event banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-16"
          ></motion.div>
        </div>
      </section>

      {/* BGMI Tournament Spotlight */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="bg-gradient-to-r from-red-900/20 via-zinc-900/80 to-red-900/20 rounded-xl overflow-hidden border border-red-900/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="inline-flex items-center bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-sm font-medium mb-6">
                  <Trophy className="h-4 w-4 mr-2" />
                  Flagship Tournament
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">
                  CARNIVAL <span className="text-red-600">SHOW</span>
                </h2>

                <p className="text-lg text-zinc-300 mb-6">
                  Central India's biggest BGMI tournament featuring 128 teams
                  competing for glory and an impressive prize pool of ₹2,00,000.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-900/30 p-2 rounded-full">
                      <Users className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">128 Teams</p>
                      <p className="text-sm text-zinc-400">
                        From across Central India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-red-900/30 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">May 24, 2025</p>
                      <p className="text-sm text-zinc-400">
                        Group stage starts at 11:00 AM
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/events/carnival">
                  <motion.button
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg inline-flex items-center"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(220,38,38,0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Carnival Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </Link>
              </div>

              <div className="relative h-[400px] lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 lg:bg-gradient-to-l"></div>
                <Image
                  src="/images/carnival.webp?height=600&width=800"
                  alt="BGMI Tournament"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section id="events" className="py-16 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            className="text-3xl font-bold uppercase mb-12 font-orbitron"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {activeCategory ? (
              <>
                <span className="text-red-600">{activeCategory}</span> EVENTS
              </>
            ) : (
              <>
                ALL <span className="text-red-600">EVENTS</span>
              </>
            )}
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredEvents.map((event, index) => (
              <Link
                href={`/events/gameocon/${event.id}`}
                key={event.id}
                className="block"
              >
                <motion.div
                  className="bg-zinc-900/80 rounded-xl overflow-hidden group border border-zinc-800 shadow-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] h-full cursor-pointer relative"
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    borderColor: "rgba(220,38,38,0.5)",
                    boxShadow: "0 0 30px rgba(220,38,38,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="relative h-[220px] overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                        {event.category}
                      </span>
                    </div>

                    {/* Prize pool badge for tournaments */}
                    {event.prizePool !== "N/A" && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-amber-500/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                          {event.prizePool}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <motion.h3 className="text-xl font-bold mb-4 group-hover:text-red-500 transition-colors duration-300">
                      {event.title}
                    </motion.h3>

                    <div className="mb-4 text-sm text-zinc-400 line-clamp-2">
                      {event.description}
                    </div>

                    <motion.div
                      className="flex items-center gap-2 text-zinc-400 mb-2"
                      whileHover={{ x: 3 }}
                    >
                      <Calendar className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{event.date}</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-2 text-zinc-400 mb-2"
                      whileHover={{ x: 3 }}
                    >
                      <Clock className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{event.time}</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-2 text-zinc-400 mb-2"
                      whileHover={{ x: 3 }}
                    >
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-sm truncate">{event.location}</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-2 text-zinc-400 mb-4"
                      whileHover={{ x: 3 }}
                    >
                      <Users className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{event.participants}</span>
                    </motion.div>

                    <motion.div
                      className="text-red-600 flex items-center text-sm uppercase font-bold hover:text-red-500 transition-colors mt-4 pt-3 border-t border-zinc-800"
                      whileHover={{ x: 5 }}
                    >
                      View Details
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 1,
                          duration: 1,
                        }}
                      >
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Schedule Overview */}
      <section className="py-16 relative bg-zinc-950/50">
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            className="text-3xl font-bold uppercase mb-12 font-orbitron text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            EVENT <span className="text-red-600">SCHEDULE</span>
          </motion.h2>

          <motion.div
            className="bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 backdrop-blur-md rounded-xl p-8 border border-zinc-800 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Morning Schedule */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center text-red-500">
                  <Calendar className="mr-2 h-5 w-5" />
                  Morning (May 24)
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-red-600 pl-4 py-1 hover:bg-zinc-800/30 rounded-r-lg transition-colors">
                    <span className="text-red-500 font-medium">9:00 AM</span>
                    <p className="font-bold">Registration Opens</p>
                    <p className="text-sm text-zinc-400">Main Entrance</p>
                  </li>
                  <li className="border-l-2 border-zinc-700 pl-4 py-1 hover:bg-zinc-800/30 rounded-r-lg transition-colors hover:border-l-red-600">
                    <span className="text-red-500 font-medium">10:00 AM</span>
                    <p className="font-bold">Opening Ceremony</p>
                    <p className="text-sm text-zinc-400">Main Stage</p>
                  </li>
                  <li className="border-l-2 border-zinc-700 pl-4 py-1 hover:bg-zinc-800/30 rounded-r-lg transition-colors hover:border-l-red-600">
                    <span className="text-red-500 font-medium">11:00 AM</span>
                    <p className="font-bold">BGMI Tournament Group Stage</p>
                    <p className="text-sm text-zinc-400">Main Arena</p>
                  </li>
                </ul>
              </motion.div>

              {/* Afternoon Schedule */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center text-red-500">
                  <Calendar className="mr-2 h-5 w-5" />
                  Afternoon (May 24)
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-zinc-700 pl-4 py-1 hover:bg-zinc-800/30 rounded-r-lg transition-colors hover:border-l-red-600">
                    <span className="text-red-500 font-medium">1:00 PM</span>
                    <p className="font-bold">Valorant Tournament Begins</p>
                    <p className="text-sm text-zinc-400">Esports Arena</p>
                  </li>
                  <li className="border-l-2 border-zinc-700 pl-4 py-1 hover:bg-zinc-800/30 rounded-r-lg transition-colors hover:border-l-red-600">
                    <span className="text-red-500 font-medium">2:00 PM</span>
                    <p className="font-bold">Cosplay Competition</p>
                    <p className="text-sm text-zinc-400">Center Stage</p>
                  </li>
                  <li className="border-l-2 border-zinc-700 pl-4 py-1 hover:bg-zinc-800/30 rounded-r-lg transition-colors hover:border-l-red-600">
                    <span className="text-red-500 font-medium">3:30 PM</span>
                    <p className="font-bold">Gaming Industry Panel</p>
                    <p className="text-sm text-zinc-400">Conference Hall</p>
                  </li>
                </ul>
              </motion.div>

              {/* Evening Schedule */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center text-red-500">
                  <Calendar className="mr-2 h-5 w-5" />
                  Evening (May 24)
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-zinc-700 pl-4 py-1 hover:bg-zinc-800/30 rounded-r-lg transition-colors hover:border-l-red-600">
                    <span className="text-red-500 font-medium">5:00 PM</span>
                    <p className="font-bold">BGMI Tournament Quarterfinals</p>
                    <p className="text-sm text-zinc-400">Main Arena</p>
                  </li>
                  <li className="border-l-2 border-zinc-700 pl-4 py-1 hover:bg-zinc-800/30 rounded-r-lg transition-colors hover:border-l-red-600">
                    <span className="text-red-500 font-medium">6:30 PM</span>
                    <p className="font-bold">BGMI Tournament Finals</p>
                    <p className="text-sm text-zinc-400">Main Arena</p>
                  </li>
                  <li className="border-l-2 border-red-600 pl-4 py-1 hover:bg-zinc-800/30 rounded-r-lg transition-colors">
                    <span className="text-red-500 font-medium">8:00 PM</span>
                    <p className="font-bold">Award Ceremony & Closing</p>
                    <p className="text-sm text-zinc-400">Main Stage</p>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="mt-10 text-center">
              <Link href="/events/gameocon/schedule">
                <motion.button
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md inline-flex items-center shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(220,38,38,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Full Schedule
                  <ChevronRight className="ml-2 h-4 w-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="bg-gradient-to-r from-red-900/20 via-black to-red-900/20 rounded-xl p-12 border border-red-900/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">
                GET YOUR <span className="text-red-600">TICKETS</span> NOW
              </h2>
              <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                Don't miss out on the gaming event of the year. Secure your spot
                at Game O Con before tickets sell out!
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
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<{
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    participants: string;
    image: string;
    category: string;
    description: string;
    prizePool: string;
  } | null>(null);

  useEffect(() => {
    const foundEvent = gameOConEvents.find((e) => e.id === id);
    setEvent(foundEvent);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <Link href="/events/gameocon">
          <motion.button
            className="flex items-center text-zinc-400 hover:text-white transition-colors mb-8"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Events</span>
          </motion.button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="relative h-[400px] overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-zinc-300 mb-6">{event.description}</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-500" />
                <span>{event.participants}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
