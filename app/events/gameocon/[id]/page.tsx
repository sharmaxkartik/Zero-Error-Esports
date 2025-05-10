"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Trophy,
  ArrowLeft,
  ArrowRight,
  Share2,
  Heart,
} from "lucide-react";
import Navbar from "@/components/navbar";

// Game O Con sub-events data
const gameOConEvents = [
  {
    id: "valorant-championship",
    title: "Valorant Championship",
    date: "June 15-17, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "Main Stage, Los Angeles Convention Center",
    participants: "32 Teams",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Tournament",
    featured: true,
    description: `The premier Valorant tournament featuring the top 32 teams from around the world competing for a $200,000 prize pool.

This three-day event will showcase the highest level of Valorant gameplay, with teams from North America, Europe, Asia, and more battling it out for glory. Matches will be played on the Main Stage with full production value, including professional commentary, player cams, and real-time statistics.

Tournament format:
- Group stage (Day 1): 8 groups of 4 teams each
- Playoffs (Day 2): Top 16 teams in single elimination bracket
- Finals (Day 3): Semifinals and Grand Finals

Special features:
- Meet and greet sessions with pro players
- Exclusive in-game items for attendees
- Live post-match analysis desk
- Valorant developer panel on game balance and future updates`,
    tags: ["FPS", "Esports", "Team Competition", "Pro Players"],
    prizePool: "$200,000",
    sponsors: ["Riot Games", "Logitech", "HyperX", "Red Bull"],
    ticketPrice: "$30 - $75",
    relatedEvents: [
      "cs2-invitational",
      "league-of-legends-cup",
      "championship-finals",
    ],
  },
  {
    id: "cs2-invitational",
    title: "Counter-Strike 2 Invitational",
    date: "June 16-18, 2025",
    time: "11:00 AM - 9:00 PM",
    location: "West Hall, Los Angeles Convention Center",
    participants: "16 Teams",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Tournament",
    featured: true,
    description: `Sixteen of the world's best CS2 teams battle it out in this high-stakes tournament with a $150,000 prize pool.

The CS2 Invitational brings together the elite teams from around the globe for three days of intense tactical FPS action. This tournament features a unique format designed to showcase the highest level of Counter-Strike gameplay.

Tournament format:
- Day 1: Group stage with 4 groups of 4 teams
- Day 2: Quarterfinals and semifinals
- Day 3: Bronze match and Grand Finals

Special features:
- Tactical analysis desk with former pro players
- Weapon showcase and developer insights
- Custom map reveal for the Grand Finals
- Live audience participation segments between matches`,
    tags: ["FPS", "Tactical Shooter", "Team Competition", "Invitational"],
    prizePool: "$150,000",
    sponsors: ["Valve", "SteelSeries", "Intel", "Monster Energy"],
    ticketPrice: "$25 - $65",
    relatedEvents: [
      "valorant-championship",
      "fighting-games-showdown",
      "championship-finals",
    ],
  },
  {
    id: "league-of-legends-cup",
    title: "League of Legends Cup",
    date: "June 18-20, 2025",
    time: "12:00 PM - 10:00 PM",
    location: "South Hall, Los Angeles Convention Center",
    participants: "12 Teams",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Tournament",
    featured: true,
    description: `The most prestigious LoL tournament of the year featuring the top teams from all major regions.

The League of Legends Cup brings together 12 elite teams from LCS, LEC, LCK, LPL, and wildcard regions to compete in a unique tournament format designed to showcase the highest level of League of Legends gameplay.

Tournament format:
- Day 1: Play-in stage for wildcard teams
- Day 2: Group stage with 3 groups of 4 teams
- Day 3: Semifinals and Grand Finals (Best of 5)

Special features:
- Live orchestra performing LoL theme music
- Cosplay showcase featuring champion designs
- Pro player panel on meta strategies
- Exclusive in-game rewards for attendees
- Champion reveal for upcoming season`,
    tags: ["MOBA", "Team Competition", "International", "Pro Teams"],
    prizePool: "$175,000",
    sponsors: ["Riot Games", "Alienware", "Mastercard", "Secretlab"],
    ticketPrice: "$30 - $80",
    relatedEvents: [
      "valorant-championship",
      "championship-finals",
      "cosplay-competition",
    ],
  },
  {
    id: "fighting-games-showdown",
    title: "Fighting Games Showdown",
    date: "June 17-19, 2025",
    time: "10:00 AM - 7:00 PM",
    location: "East Hall, Los Angeles Convention Center",
    participants: "Open Registration",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Tournament",
    featured: false,
    description: `Multiple fighting game tournaments including Street Fighter 6, Tekken 8, and Mortal Kombat 1.

The Fighting Games Showdown is a celebration of the FGC (Fighting Game Community) featuring tournaments across multiple titles. This event welcomes players of all skill levels, from casual fans to professional competitors.

Tournaments include:
- Street Fighter 6 Championship
- Tekken 8 World Cup
- Mortal Kombat 1 Masters
- Super Smash Bros. Ultimate Open
- Guilty Gear -Strive- Invitational

Special features:
- Open casual play stations
- Exhibition matches with legendary players
- Fighting game developer panels
- Arcade cabinet showcase with classic titles
- Combo challenge competitions with prizes`,
    tags: ["Fighting Games", "FGC", "Multiple Titles", "Open Registration"],
    prizePool: "$100,000 (across all tournaments)",
    sponsors: ["Capcom", "Bandai Namco", "Warner Bros. Games", "Razer"],
    ticketPrice: "$20 - $50",
    relatedEvents: [
      "cosplay-competition",
      "championship-finals",
      "pro-player-meet-greet",
    ],
  },
  {
    id: "cosplay-competition",
    title: "Cosplay Championship",
    date: "June 19, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "Center Stage, Los Angeles Convention Center",
    participants: "Open Registration",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Competition",
    featured: false,
    description: `Show off your best gaming-inspired cosplay and compete for prizes in multiple categories.

The Cosplay Championship is the premier cosplay event of Game O Con, featuring incredible craftsmanship, creativity, and performance. Cosplayers from around the world will showcase their gaming-inspired costumes and compete for prizes in various categories.

Competition categories:
- Master Division (professional/experienced)
- Novice Division (beginners)
- Group Performance
- Prop Making Excellence
- Character Accuracy
- Best Performance

Special features:
- Professional cosplay judges
- Cosplay repair station
- Photography area with professional lighting
- Cosplay workshops and panels
- Meet and greet with celebrity cosplayers`,
    tags: ["Cosplay", "Competition", "Creative", "Performance"],
    prizePool: "$10,000",
    sponsors: ["Adobe", "Worbla", "Cosplay Supplies Co.", "EVA Foam Inc."],
    ticketPrice:
      "$15 (competitor entry fee), Free for spectators with Game O Con pass",
    relatedEvents: [
      "indie-showcase",
      "pro-player-meet-greet",
      "championship-finals",
    ],
  },
  {
    id: "indie-showcase",
    title: "Indie Games Showcase",
    date: "June 15-20, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Innovation Hall, Los Angeles Convention Center",
    participants: "50+ Developers",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Exhibition",
    featured: false,
    description: `Discover the next big indie games and meet the developers behind them in this week-long showcase.

The Indie Games Showcase is a celebration of independent game development, featuring over 50 studios and their upcoming projects. Attendees can play demos, meet developers, and get a first look at some of the most innovative games on the horizon.

Showcase features:
- Playable demos of unreleased indie games
- Developer meet and greets
- Daily indie dev panels and talks
- Indie Awards ceremony (June 19)
- Funding and publishing opportunities for developers

Special events:
- Indie Pitch Competition (June 16)
- Game Design Workshop (June 17)
- Indie Dev Networking Mixer (June 18)
- Pixel Art Showcase (All week)
- Retro Indie Game Museum (All week)`,
    tags: ["Indie Games", "Developers", "Demos", "Innovation"],
    prizePool: "N/A",
    sponsors: ["Unity", "Epic Games", "itch.io", "Game Developers Association"],
    ticketPrice: "Free with Game O Con pass",
    relatedEvents: [
      "hardware-expo",
      "pro-player-meet-greet",
      "championship-finals",
    ],
  },
  {
    id: "pro-player-meet-greet",
    title: "Pro Player Meet & Greet",
    date: "June 16-19, 2025",
    time: "1:00 PM - 4:00 PM",
    location: "Fan Zone, Los Angeles Convention Center",
    participants: "30+ Pro Players",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Fan Event",
    featured: false,
    description: `Meet your favorite pro players, get autographs, and take photos in this special fan event.

The Pro Player Meet & Greet gives fans the opportunity to meet their gaming heroes face-to-face. Over 30 professional players from various games will be available for autographs, photos, and casual conversation throughout the event.

Featured players include:
- Top Valorant pros from major teams
- CS2 legends and current champions
- League of Legends superstars
- Fighting game community icons
- Battle royale specialists

Schedule:
- June 16: FPS pros (Valorant, CS2)
- June 17: MOBA pros (League of Legends, Dota 2)
- June 18: Fighting game pros
- June 19: Battle royale and variety gamers

Each session includes autograph opportunities, photo booths, and Q&A segments with the players.`,
    tags: ["Pro Players", "Meet and Greet", "Autographs", "Fan Event"],
    prizePool: "N/A",
    sponsors: [
      "Major Esports Teams",
      "Twitch",
      "Discord",
      "Gaming Energy Drinks",
    ],
    ticketPrice:
      "Free with Game O Con pass (limited capacity, first come first served)",
    relatedEvents: [
      "valorant-championship",
      "cs2-invitational",
      "league-of-legends-cup",
    ],
  },
  {
    id: "hardware-expo",
    title: "Gaming Hardware Expo",
    date: "June 15-20, 2025",
    time: "10:00 AM - 7:00 PM",
    location: "Tech Pavilion, Los Angeles Convention Center",
    participants: "20+ Vendors",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Exhibition",
    featured: false,
    description: `Check out the latest gaming hardware, peripherals, and tech from leading manufacturers.

The Gaming Hardware Expo brings together the biggest names in gaming technology to showcase their latest products. From cutting-edge graphics cards to ergonomic peripherals, this is the place to see, try, and buy the newest gaming gear.

Exhibition highlights:
- Hands-on demos with next-gen hardware
- Custom PC building showcases
- Peripheral testing stations
- VR and AR technology demonstrations
- Gaming chair comfort zone
- Daily tech talks and product reveals

Special events:
- Hardware Overclocking Competition (June 16)
- PC Building Challenge (June 17)
- Tech Influencer Meet & Greets (Daily)
- Flash Sales and Exclusive Discounts (Daily)
- Raffle for High-End Gaming Setup (June 20)`,
    tags: ["Hardware", "Technology", "Peripherals", "Exhibition"],
    prizePool: "N/A",
    sponsors: ["NVIDIA", "AMD", "Corsair", "Logitech", "ASUS ROG"],
    ticketPrice: "Free with Game O Con pass",
    relatedEvents: ["indie-showcase", "championship-finals"],
  },
  {
    id: "championship-finals",
    title: "Championship Finals",
    date: "June 20, 2025",
    time: "4:00 PM - 10:00 PM",
    location: "Main Arena, Los Angeles Convention Center",
    participants: "Finalist Teams",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Tournament",
    featured: true,
    description: `The epic conclusion to Game O Con featuring the finals of all major tournaments and a special closing ceremony.

The Championship Finals is the culminating event of Game O Con, bringing together the finalists from all major tournaments for an unforgettable evening of esports excellence. This premier event will crown champions across multiple games and conclude with a spectacular closing ceremony.

Event schedule:
- 4:00 PM: Pre-show and recap of the week's events
- 4:30 PM: Fighting Games Showdown Finals
- 5:30 PM: League of Legends Cup Grand Finals
- 7:30 PM: Valorant Championship Grand Finals
- 9:30 PM: Awards Ceremony and Closing Show

Special features:
- Live musical performance
- Esports Hall of Fame induction ceremony
- Exclusive game announcement and trailer reveal
- Spectacular light show and special effects
- Celebrity guest appearances
- Fireworks finale`,
    tags: ["Finals", "Grand Finale", "Multiple Games", "Closing Ceremony"],
    prizePool: "Grand Finals for all tournaments",
    sponsors: ["All major Game O Con sponsors"],
    ticketPrice: "$50 - $120",
    relatedEvents: [
      "valorant-championship",
      "cs2-invitational",
      "league-of-legends-cup",
    ],
  },
];

export default function SubEventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<(typeof gameOConEvents)[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Track mouse movement for dynamic effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Find the event by ID
    const foundEvent = gameOConEvents.find((e) => e.id === params.id);

    // Simulate loading
    setTimeout(() => {
      setEvent(foundEvent || null);
      setLoading(false);
    }, 800);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [params.id]);

  // Handle event not found
  useEffect(() => {
    if (!loading && !event) {
      router.push("/events/gameocon");
    }
  }, [event, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) {
    return null; // Will redirect in the useEffect
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
            <Link href="/events/gameocon">
              <motion.button
                className="flex items-center text-zinc-400 hover:text-white transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.97 }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Back to Game O Con</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Event header */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Event image */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-[400px] overflow-hidden rounded-xl border border-zinc-800 shadow-[0_0_25px_rgba(0,0,0,0.3)]">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <motion.span
                    className="bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full font-medium flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {event.category === "Tournament" && (
                      <Trophy className="w-3 h-3 mr-1" />
                    )}
                    {event.category === "Competition" && (
                      <Trophy className="w-3 h-3 mr-1" />
                    )}
                    {event.category === "Exhibition" && (
                      <Users className="w-3 h-3 mr-1" />
                    )}
                    {event.category === "Fan Event" && (
                      <Users className="w-3 h-3 mr-1" />
                    )}
                    {event.category}
                  </motion.span>
                </div>

                {/* Featured badge */}
                {event.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <motion.span
                      className="bg-zinc-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full font-medium flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
                      Featured
                    </motion.span>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
            </motion.div>

            {/* Event details */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-6 font-orbitron">
                <span className="text-red-600 glow-text">{event.title}</span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <motion.div
                  className="flex items-center gap-3 text-zinc-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="h-5 w-5 text-red-500" />
                  <span>{event.date}</span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 text-zinc-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="h-5 w-5 text-red-500" />
                  <span>{event.time}</span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 text-zinc-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span>{event.location}</span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 text-zinc-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Users className="h-5 w-5 text-red-500" />
                  <span>{event.participants}</span>
                </motion.div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {event.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(220,38,38,0.2)",
                      borderColor: "rgba(220,38,38,0.5)",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/signup">
                  <motion.div
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 uppercase font-bold text-sm rounded-md flex items-center shadow-[0_0_15px_rgba(150,0,0,0.3)] relative overflow-hidden group"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(220,0,0,0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
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
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </motion.div>
                </Link>

                <motion.button
                  className="border-2 border-zinc-700 hover:border-red-600 text-white bg-zinc-900/50 backdrop-blur-sm px-4 py-4 rounded-md flex items-center transition-colors duration-300 relative overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(30,30,30,0.8)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
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
                  <Share2 className="h-5 w-5" />
                </motion.button>

                <motion.button
                  className="border-2 border-zinc-700 hover:border-red-600 text-white bg-zinc-900/50 backdrop-blur-sm px-4 py-4 rounded-md flex items-center transition-colors duration-300 relative overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(30,30,30,0.8)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
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
                  <Heart className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 relative bg-zinc-950/50">
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.h2
                className="text-2xl font-bold mb-6 font-orbitron"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-red-600">EVENT</span> DETAILS
              </motion.h2>

              <motion.div
                className="bg-zinc-900/80 backdrop-blur-md rounded-xl p-8 border border-zinc-800 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="prose prose-invert max-w-none">
                  {event.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-zinc-300">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.h2
                className="text-2xl font-bold mb-6 font-orbitron"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-red-600">EVENT</span> INFO
              </motion.h2>

              <motion.div
                className="bg-zinc-900/80 backdrop-blur-md rounded-xl p-6 border border-zinc-800 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm uppercase text-zinc-500 mb-1">
                      Prize Pool
                    </h3>
                    <p className="text-lg font-bold">{event.prizePool}</p>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase text-zinc-500 mb-1">
                      Ticket Price
                    </h3>
                    <p className="text-lg font-bold">{event.ticketPrice}</p>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase text-zinc-500 mb-1">
                      Sponsors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {event.sponsors.map((sponsor) => (
                        <span
                          key={sponsor}
                          className="bg-zinc-800 px-2 py-1 rounded text-sm"
                        >
                          {sponsor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-red-900/20 via-black to-red-900/20 rounded-xl p-6 border border-red-900/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4">Ready to join?</h3>
                <p className="text-zinc-300 mb-6">
                  Secure your spot at this event before tickets sell out. Join
                  us for an unforgettable gaming experience!
                </p>
                <Link href="/signup">
                  <motion.button
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold text-lg flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <span className="relative z-10 flex items-center">
                      Register Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
