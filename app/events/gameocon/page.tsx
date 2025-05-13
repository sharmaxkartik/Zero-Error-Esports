"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  MapPin,
  Users,
  ArrowRight,
  ArrowLeft,
  Clock,
  X,
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
    coordinator: "Sarah Chen",
    coordinatorRole: "Tournament Director",
    bulletPoints: [
      "128 teams from across Central India",
      "One-day tournament with group stages and playoffs",
      "Professional commentary and production",
      "Meet and greet with pro players",
    ],
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
    coordinator: "Sarah Chen",
    coordinatorRole: "Tournament Director",
    bulletPoints: [
      "32 teams from around the region",
      "Two-day tournament with group stages and playoffs",
      "Professional commentary and production",
      "Meet and greet with pro players",
    ],
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
    coordinator: "Mia Johnson",
    coordinatorRole: "Cosplay Director",
    bulletPoints: [
      "50+ cosplayers showcasing their creativity",
      "Multiple categories for all skill levels",
      "Professional cosplay judges",
      "Photography area with professional lighting",
    ],
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
    coordinator: "Alex Rivera",
    coordinatorRole: "Expo Manager",
    bulletPoints: [
      "30+ exhibitors showcasing gaming gear",
      "Exclusive discounts on gaming merchandise",
      "Hands-on demos with the latest tech",
      "Networking opportunities with industry leaders",
    ],
  },
];

export default function GameOConPage() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof gameOConEvents)[0] | null
  >(null);

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
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2, ease: "easeIn" },
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
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-zinc-900/80 rounded-lg overflow-hidden group border border-zinc-800 shadow-lg hover:shadow-[0_0_20px_rgba(220,0,0,0.2)] h-full cursor-pointer relative"
                onClick={() => setSelectedEvent(event)}
              >
                {/* Event Image */}
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                      {event.category}
                    </span>
                  </div>

                  {/* Prize Pool Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-yellow-500/90 backdrop-blur-sm text-black text-xs px-3 py-1 rounded-full font-medium">
                      {event.prizePool}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {event.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6">
                    {event.description}
                  </p>

                  {/* Event Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-red-500" />
                      <span className="text-sm text-zinc-400">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-red-500" />
                      <span className="text-sm text-zinc-400">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-500" />
                      <span className="text-sm text-zinc-400">
                        {event.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-red-500" />
                      <span className="text-sm text-zinc-400">
                        {event.participants}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="mt-6">
                    <motion.div
                      className="text-red-600 flex items-center text-sm uppercase font-bold hover:text-red-500 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      View Details
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event Schedule Section */}
      <section id="schedule" className="py-16 relative bg-zinc-950">
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
        </div>
      </section>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-zinc-900 to-black border border-red-900/30 rounded-xl shadow-[0_0_25px_rgba(220,0,0,0.2)]"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Image */}
              <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden">
                <Image
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                <button
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-red-900/50 transition-colors z-10"
                  onClick={() => setSelectedEvent(null)}
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h2 className="text-3xl md:text-4xl font-bold font-orbitron">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-red-500 uppercase tracking-wider">
                    {selectedEvent.date}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* Coordinator Section */}
                <div className="bg-black/50 border border-red-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold uppercase text-center mb-4 text-red-500">
                    COORDINATOR
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-zinc-800 border-2 border-red-600 mb-4 overflow-hidden relative">
                      <Image
                        src="/placeholder.svg?height=128&width=128"
                        alt={selectedEvent.coordinator}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xl font-bold text-center">
                      {selectedEvent.coordinator}
                    </h4>
                    <p className="text-zinc-400 text-center">
                      {selectedEvent.coordinatorRole}
                    </p>
                  </div>
                </div>

                {/* Event Details Section */}
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold uppercase mb-4 text-red-500">
                    EVENT DETAILS
                  </h3>

                  <div className="flex items-start gap-2 mb-4">
                    <Trophy className="text-yellow-500 h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-lg">
                        {selectedEvent.title} | ZERO ERROR 2025
                      </p>
                      <p className="text-zinc-300">
                        {selectedEvent.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 mt-6">
                    {selectedEvent.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex items-center gap-2">
                    <div className="bg-red-900/30 p-2 rounded-full">
                      <Users className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-red-400">Limited slots available!</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
