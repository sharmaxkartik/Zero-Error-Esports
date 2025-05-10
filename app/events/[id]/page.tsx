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
  ChevronRight,
} from "lucide-react";

// Mock event data - in a real app, you would fetch this from an API
const events = [
  {
    id: "fasterui-championship-2025",
    title: "FasterUI Championship Series 2025",
    date: "June 15-20, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "Los Angeles Convention Center, CA",
    participants: "64 Teams",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Tournament",
    featured: true,
    description: `The premier esports event of the year returns with an expanded format, featuring competitions across multiple game titles, meet-and-greets with pro players, exclusive merchandise, and more. Don't miss the biggest FasterUI event of the year!

The FasterUI Championship Series 2025 will feature competitions in Valorant, Counter-Strike 2, League of Legends, and more. With a prize pool of over $500,000, this is the most prestigious esports event of the year.

Join us for six days of non-stop gaming action, featuring:
- Professional tournaments across multiple titles
- Amateur competitions with amazing prizes
- Meet and greets with your favorite pro players
- Exclusive merchandise and collectibles
- Interactive gaming experiences
- Food trucks and entertainment`,
    tags: [
      "FPS Tournament",
      "MOBA Championship",
      "Fighting Games",
      "Fan Activities",
    ],
    prizePool: "$500,000",
    sponsors: ["Razer", "Intel", "NVIDIA", "HyperX"],
    ticketPrice: "$45 - $120",
  },
  {
    id: "fasterui-open-tournament",
    title: "FasterUI Open Tournament",
    date: "July 8-10, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "New York, NY",
    participants: "32 Teams",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Tournament",
    featured: false,
    description: `The FasterUI Open Tournament is your chance to compete against some of the best amateur teams in the country. With a more accessible format than our championship series, this event is perfect for up-and-coming teams looking to make their mark.

This three-day event will feature competitions in Valorant and Counter-Strike 2, with separate brackets for different skill levels. Whether you're a seasoned competitor or just starting out, there's a place for you at the FasterUI Open.

Event highlights include:
- Competitions for all skill levels
- Professional casting and streaming
- Networking opportunities with sponsors and teams
- Gaming peripherals and gear as prizes
- Coaching sessions with pro players`,
    tags: ["Open Competition", "Amateur Teams", "Coaching", "Networking"],
    prizePool: "$75,000",
    sponsors: ["SteelSeries", "AMD", "Logitech"],
    ticketPrice: "$25 - $60",
  },
  {
    id: "community-meetup-day",
    title: "Community Meetup Day",
    date: "August 15, 2025",
    time: "12:00 PM - 8:00 PM",
    location: "Chicago, IL",
    participants: "Open Registration",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Community",
    featured: false,
    description: `Community Meetup Day is all about bringing gamers together in a relaxed, social environment. This isn't a competitive event - it's a chance to meet fellow gamers, play casually, and build connections within the FasterUI community.

Join us for a day of casual gaming, panels, and social activities. Whether you're a competitive player looking to unwind or a casual gamer wanting to connect with others who share your passion, this event is for you.

What to expect:
- Casual gaming stations with popular titles
- Panel discussions with community leaders
- Board game area and tabletop gaming
- Community art showcase
- Local food vendors and refreshments
- Evening social mixer with live music`,
    tags: ["Social", "Casual Gaming", "Panels", "Networking"],
    prizePool: "N/A",
    sponsors: ["Discord", "Twitch", "Monster Energy"],
    ticketPrice: "$15",
  },
  {
    id: "pro-player-bootcamp",
    title: "Pro Player Bootcamp",
    date: "September 5-12, 2025",
    time: "8:00 AM - 9:00 PM",
    location: "Seattle, WA",
    participants: "Invitation Only",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Training",
    featured: false,
    description: `The Pro Player Bootcamp is an intensive training program designed for serious competitors looking to take their skills to the next level. This invitation-only event brings together top coaches, analysts, and pro players to provide personalized training and feedback.

Over the course of a week, participants will undergo rigorous training regimens, strategy sessions, and scrimmages against other top players. This is not just about improving your mechanical skills - it's about developing a professional mindset and approach to competitive gaming.

Bootcamp features:
- Personalized coaching from pro players
- Advanced strategy and meta analysis
- Mental performance training
- Team dynamics and communication workshops
- Physical fitness and wellness sessions
- Nutrition guidance for optimal gaming performance`,
    tags: [
      "Professional Training",
      "Coaching",
      "Strategy",
      "Mental Performance",
    ],
    prizePool: "N/A",
    sponsors: ["Red Bull", "Alienware", "Herman Miller"],
    ticketPrice: "$1,200",
  },
  {
    id: "college-invitational",
    title: "College Invitational",
    date: "October 22-24, 2025",
    time: "11:00 AM - 7:00 PM",
    location: "Austin, TX",
    participants: "16 College Teams",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Tournament",
    featured: false,
    description: `The College Invitational brings together the best collegiate esports teams from across the country to compete for glory and scholarships. This prestigious event showcases the next generation of esports talent and provides valuable exposure for aspiring pro players.

Sixteen top college teams will battle it out across multiple game titles, with matches streamed live and commentated by professional casters. This is a perfect opportunity for college players to gain experience in a professional tournament environment.

Event highlights:
- Competitions in multiple game titles
- $50,000 scholarship prize pool
- Professional broadcast production
- Collegiate recruitment opportunities
- Networking with esports organizations
- Campus showcase events`,
    tags: ["Collegiate", "Scholarships", "Recruitment", "Multiple Games"],
    prizePool: "$50,000 in scholarships",
    sponsors: ["Corsair", "MSI", "DXRacer"],
    ticketPrice: "$20 - $40",
  },
  {
    id: "winter-showdown",
    title: "Winter Showdown",
    date: "December 12-14, 2025",
    time: "10:00 AM - 10:00 PM",
    location: "Denver, CO",
    participants: "24 Teams",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Tournament",
    featured: false,
    description: `The Winter Showdown is our season-ending tournament featuring unique formats and special events. Set against the backdrop of the winter holiday season, this event combines competitive gaming with festive celebrations.

Twenty-four teams will compete in a variety of standard and custom game modes, with special holiday-themed maps and challenges. This is one of our most entertaining events of the year, with a focus on both competition and spectacle.

Event features:
- Standard competitive tournaments
- Custom game modes and challenges
- Holiday-themed maps and skins
- Cosplay contest with prizes
- Winter marketplace with exclusive merchandise
- Evening after-parties with live entertainment`,
    tags: ["Winter Theme", "Custom Modes", "Cosplay", "Entertainment"],
    prizePool: "$125,000",
    sponsors: ["ASUS ROG", "Western Digital", "Secretlab"],
    ticketPrice: "$35 - $80",
  },
  {
    id: "new-years-gaming-festival",
    title: "New Year's Gaming Festival",
    date: "December 30-31, 2025",
    time: "2:00 PM - 2:00 AM",
    location: "Las Vegas, NV",
    participants: "Open Registration",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Festival",
    featured: false,
    description: `Ring in the New Year with the ultimate gaming celebration! The New Year's Gaming Festival is a two-day event culminating in an epic New Year's Eve party. This is less about serious competition and more about celebrating gaming culture and the FasterUI community.

With open gaming areas, casual tournaments, and plenty of social activities, this event is the perfect way to end the year. The festival culminates in a massive New Year's Eve party featuring live music, entertainment, and a countdown to midnight on the main stage.

Festival highlights:
- Casual gaming tournaments with prizes
- Retro gaming arcade
- VR and new technology demos
- Live music and DJ sets
- New Year's Eve countdown and celebration
- Exclusive New Year's merchandise and collectibles`,
    tags: ["New Year's", "Party", "Casual Gaming", "Live Music"],
    prizePool: "Various prizes",
    sponsors: ["G FUEL", "Elgato", "ASTRO Gaming"],
    ticketPrice: "$60 - $150",
  },
];

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<(typeof events)[0] | null>(null);
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
    const foundEvent = events.find((e) => e.id === params.id);

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
      router.push("/events");
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
                    {event.category === "Community" && (
                      <Users className="w-3 h-3 mr-1" />
                    )}
                    {event.category === "Training" && (
                      <Clock className="w-3 h-3 mr-1" />
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
                      Join This Event
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </motion.div>
                </Link>
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
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 20px rgba(220, 38, 38, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5" />
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
