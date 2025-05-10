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
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useParams } from "next/navigation";

// Game O Con sub-events data
const gameOConEvents = [
  {
    id: "valorant-championship",
    title: "Valorant Championship",
    date: "June 15-17, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "Main Stage, Los Angeles Convention Center",
    participants: "32 Teams",
    image: "/placeholder.svg?height=300&width=500",
    category: "Tournament",
    description:
      "The premier Valorant tournament featuring the top 32 teams from around the world competing for a $200,000 prize pool.",
    prizePool: "$200,000",
  },
  {
    id: "cs2-invitational",
    title: "Counter-Strike 2 Invitational",
    date: "June 16-18, 2025",
    time: "11:00 AM - 9:00 PM",
    location: "West Hall, Los Angeles Convention Center",
    participants: "16 Teams",
    image: "/placeholder.svg?height=300&width=500",
    category: "Tournament",
    description:
      "Sixteen of the world's best CS2 teams battle it out in this high-stakes tournament with a $150,000 prize pool.",
    prizePool: "$150,000",
  },
  {
    id: "league-of-legends-cup",
    title: "League of Legends Cup",
    date: "June 18-20, 2025",
    time: "12:00 PM - 10:00 PM",
    location: "South Hall, Los Angeles Convention Center",
    participants: "12 Teams",
    image: "/placeholder.svg?height=300&width=500",
    category: "Tournament",
    description:
      "The most prestigious LoL tournament of the year featuring the top teams from all major regions.",
    prizePool: "$175,000",
  },
  {
    id: "fighting-games-showdown",
    title: "Fighting Games Showdown",
    date: "June 17-19, 2025",
    time: "10:00 AM - 7:00 PM",
    location: "East Hall, Los Angeles Convention Center",
    participants: "Open Registration",
    image: "/placeholder.svg?height=300&width=500",
    category: "Tournament",
    description:
      "Multiple fighting game tournaments including Street Fighter 6, Tekken 8, and Mortal Kombat 1.",
    prizePool: "$100,000",
  },
  {
    id: "cosplay-competition",
    title: "Cosplay Championship",
    date: "June 19, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "Center Stage, Los Angeles Convention Center",
    participants: "Open Registration",
    image: "/placeholder.svg?height=300&width=500",
    category: "Competition",
    description:
      "Show off your best gaming-inspired cosplay and compete for prizes in multiple categories.",
    prizePool: "$10,000",
  },
  {
    id: "indie-showcase",
    title: "Indie Games Showcase",
    date: "June 15-20, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Innovation Hall, Los Angeles Convention Center",
    participants: "50+ Developers",
    image: "/placeholder.svg?height=300&width=500",
    category: "Exhibition",
    description:
      "Discover the next big indie games and meet the developers behind them in this week-long showcase.",
    prizePool: "N/A",
  },
  {
    id: "pro-player-meet-greet",
    title: "Pro Player Meet & Greet",
    date: "June 16-19, 2025",
    time: "1:00 PM - 4:00 PM",
    location: "Fan Zone, Los Angeles Convention Center",
    participants: "30+ Pro Players",
    image: "/placeholder.svg?height=300&width=500",
    category: "Fan Event",
    description:
      "Meet your favorite pro players, get autographs, and take photos in this special fan event.",
    prizePool: "N/A",
  },
  {
    id: "hardware-expo",
    title: "Gaming Hardware Expo",
    date: "June 15-20, 2025",
    time: "10:00 AM - 7:00 PM",
    location: "Tech Pavilion, Los Angeles Convention Center",
    participants: "20+ Vendors",
    image: "/placeholder.svg?height=300&width=500",
    category: "Exhibition",
    description:
      "Check out the latest gaming hardware, peripherals, and tech from leading manufacturers.",
    prizePool: "N/A",
  },
  {
    id: "championship-finals",
    title: "Championship Finals",
    date: "June 20, 2025",
    time: "4:00 PM - 10:00 PM",
    location: "Main Arena, Los Angeles Convention Center",
    participants: "Finalist Teams",
    image: "/placeholder.svg?height=300&width=500",
    category: "Tournament",
    description:
      "The epic conclusion to Game O Con featuring the finals of all major tournaments and a special closing ceremony.",
    prizePool: "Grand Finals",
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
              <span className="text-red-600 glow-text">GAME O CON</span>
            </h1>
            <p className="text-xl text-zinc-300 mb-6">
              The premier gaming event of the FasterUI Championship Series 2025
            </p>
            <div className="flex items-center justify-center gap-6 text-zinc-400 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-red-500" />
                <span>June 15-20, 2025</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-red-500" />
                <span>Los Angeles Convention Center</span>
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
                  className="bg-zinc-900/80 rounded-lg overflow-hidden group border border-zinc-800 shadow-lg hover:shadow-[0_0_20px_rgba(150,0,0,0.2)] h-full cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -10, borderColor: "rgba(220,38,38,0.5)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <motion.h3 className="text-xl font-bold mb-4 group-hover:text-red-500 transition-colors duration-300">
                      {event.title}
                    </motion.h3>

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
                      <span className="text-sm">{event.location}</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-2 text-zinc-400 mb-4"
                      whileHover={{ x: 3 }}
                    >
                      <Users className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{event.participants}</span>
                    </motion.div>

                    <motion.div
                      className="text-red-600 flex items-center text-sm uppercase font-bold hover:text-red-500 transition-colors"
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
            className="bg-zinc-900/80 backdrop-blur-md rounded-xl p-8 border border-zinc-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Day 1 */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-red-500" />
                  Day 1 (June 15)
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-red-600 pl-4 py-1">
                    <span className="text-red-500 font-medium">10:00 AM</span>
                    <p className="font-bold">Opening Ceremony</p>
                    <p className="text-sm text-zinc-400">Main Stage</p>
                  </li>
                  <li className="border-l-2 border-zinc-700 pl-4 py-1">
                    <span className="text-red-500 font-medium">12:00 PM</span>
                    <p className="font-bold">Valorant Tournament Begins</p>
                    <p className="text-sm text-zinc-400">Main Stage</p>
                  </li>
                  <li className="border-l-2 border-zinc-700 pl-4 py-1">
                    <span className="text-red-500 font-medium">2:00 PM</span>
                    <p className="font-bold">Indie Games Showcase Opens</p>
                    <p className="text-sm text-zinc-400">Innovation Hall</p>
                  </li>
                </ul>
              </div>

              {/* Day 3 */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-red-500" />
                  Day 3 (June 17)
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-zinc-700 pl-4 py-1">
                    <span className="text-red-500 font-medium">10:00 AM</span>
                    <p className="font-bold">Fighting Games Showdown Begins</p>
                    <p className="text-sm text-zinc-400">East Hall</p>
                  </li>
                  <li className="border-l-2 border-zinc-700 pl-4 py-1">
                    <span className="text-red-500 font-medium">1:00 PM</span>
                    <p className="font-bold">Pro Player Meet & Greet</p>
                    <p className="text-sm text-zinc-400">Fan Zone</p>
                  </li>
                  <li className="border-l-2 border-zinc-700 pl-4 py-1">
                    <span className="text-red-500 font-medium">4:00 PM</span>
                    <p className="font-bold">CS2 Semifinals</p>
                    <p className="text-sm text-zinc-400">West Hall</p>
                  </li>
                </ul>
              </div>

              {/* Day 6 */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-red-500" />
                  Day 6 (June 20)
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-zinc-700 pl-4 py-1">
                    <span className="text-red-500 font-medium">12:00 PM</span>
                    <p className="font-bold">League of Legends Finals</p>
                    <p className="text-sm text-zinc-400">South Hall</p>
                  </li>
                  <li className="border-l-2 border-zinc-700 pl-4 py-1">
                    <span className="text-red-500 font-medium">4:00 PM</span>
                    <p className="font-bold">Championship Finals</p>
                    <p className="text-sm text-zinc-400">Main Arena</p>
                  </li>
                  <li className="border-l-2 border-red-600 pl-4 py-1">
                    <span className="text-red-500 font-medium">9:00 PM</span>
                    <p className="font-bold">Closing Ceremony</p>
                    <p className="text-sm text-zinc-400">Main Arena</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/events/gameocon/schedule">
                <motion.button
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-md inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

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
