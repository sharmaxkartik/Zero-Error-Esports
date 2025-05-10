"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ChevronRight,
  MapPin,
  Users,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function EventsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden pt-24">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.5)_2px,transparent_2px)] bg-[size:40px_40px] opacity-30 z-10"></div>

        {/* Red glowing orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-red-600/10 filter blur-[120px] z-10"></div>
        <div className="absolute bottom-[-30%] left-[-20%] w-[500px] h-[500px] rounded-full bg-red-600/5 filter blur-[100px] z-10"></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Events Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 z-10 scan-lines opacity-20"></div>

        {/* Hero content */}
        <div className="container mx-auto relative z-20 h-full flex flex-col justify-center px-6">
          <motion.h1
            className="text-4xl md:text-6xl font-black uppercase leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            UPCOMING{" "}
            <motion.span
              className="text-red-600 inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              EVENTS
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-lg text-zinc-300 mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Join us at our tournaments, exhibitions, and community gatherings
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="#featured">
              <motion.button
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-md flex items-center shadow-[0_0_15px_rgba(150,0,0,0.3)] relative overflow-hidden group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(220,0,0,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center font-bold">
                  EXPLORE EVENTS
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 2,
                      duration: 1,
                    }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Event */}
      <section id="featured" className="py-16 bg-zinc-950 relative">
        {/* Subtle diagonal pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            className="flex flex-col md:flex-row gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Event image */}
            <Link
              href="/events/fasterui-championship-2025"
              className="md:w-1/2 block"
            >
              <motion.div
                className="md:w-full"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  className="relative h-[400px] overflow-hidden rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)] cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Featured Event"
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 uppercase text-sm font-bold shadow-[0_0_10px_rgba(200,0,0,0.4)]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Featured
                  </motion.div>
                </motion.div>
              </motion.div>
            </Link>

            {/* Event details */}
            <motion.div
              className="md:w-1/2 flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.h2
                className="text-3xl font-bold uppercase mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                FasterUI Championship Series 2025
              </motion.h2>

              <motion.div
                className="flex items-center gap-2 text-zinc-400 mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ x: 5 }}
              >
                <Calendar className="h-5 w-5 text-red-500" />
                <span>June 15-20, 2025</span>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 text-zinc-400 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-5 w-5 text-red-500" />
                <span>Los Angeles Convention Center, CA</span>
              </motion.div>

              <motion.p
                className="text-zinc-300 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                The premier esports event of the year returns with an expanded
                format, featuring competitions across multiple game titles,
                meet-and-greets with pro players, exclusive merchandise, and
                more. Don't miss the biggest FasterUI event of the year!
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "FPS Tournament",
                  "MOBA Championship",
                  "Fighting Games",
                  "Fan Activities",
                ].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full text-sm"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(220,38,38,0.2)",
                      borderColor: "rgba(220,38,38,0.5)",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link href="/events/fasterui-championship-2025">
                  <motion.div
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 uppercase font-bold text-sm w-fit flex items-center relative overflow-hidden group shadow-[0_0_15px_rgba(150,0,0,0.2)]"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(220,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center">
                      Register Now
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 2,
                          duration: 1,
                        }}
                      >
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </motion.span>
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 relative">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.3)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>

        <div className="container mx-auto px-6 relative">
          <motion.h2
            className="text-3xl font-bold uppercase mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            UPCOMING <span className="text-red-600">EVENTS</span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Event cards */}
            {[
              {
                id: "fasterui-open-tournament",
                title: "FasterUI Open Tournament",
                date: "July 8-10, 2025",
                location: "New York, NY",
                participants: "32 Teams",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                id: "community-meetup-day",
                title: "Community Meetup Day",
                date: "August 15, 2025",
                location: "Chicago, IL",
                participants: "Open Registration",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                id: "pro-player-bootcamp",
                title: "Pro Player Bootcamp",
                date: "September 5-12, 2025",
                location: "Seattle, WA",
                participants: "Invitation Only",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                id: "college-invitational",
                title: "College Invitational",
                date: "October 22-24, 2025",
                location: "Austin, TX",
                participants: "16 College Teams",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                id: "winter-showdown",
                title: "Winter Showdown",
                date: "December 12-14, 2025",
                location: "Denver, CO",
                participants: "24 Teams",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                id: "new-years-gaming-festival",
                title: "New Year's Gaming Festival",
                date: "December 30-31, 2025",
                location: "Las Vegas, NV",
                participants: "Open Registration",
                image: "/placeholder.svg?height=250&width=400",
              },
            ].map((event, index) => (
              <Link href={`/events/${event.id}`} key={index} className="block">
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
                      Learn More
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

      {/* Past Events */}
      <section className="py-16 bg-zinc-950 relative">
        {/* Subtle diagonal pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

        <div className="container mx-auto px-6 relative">
          <motion.h2
            className="text-3xl font-bold uppercase mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            PAST <span className="text-red-600">EVENTS</span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Past event cards */}
            {[1, 2, 3, 4].map((item) => (
              <Link
                href={`/events/past-event-${item}`}
                key={item}
                className="block"
              >
                <motion.div
                  className="relative h-[250px] overflow-hidden rounded-lg group shadow-lg cursor-pointer"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(150,0,0,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Image
                    src={`/placeholder.svg?height=250&width=300`}
                    alt={`Past Event ${item}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-3 rounded-md font-bold flex items-center space-x-2 shadow-[0_0_15px_rgba(150,0,0,0.3)]"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Gallery</span>
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 border-t border-red-900/30"
                    initial={{ y: 0 }}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-sm font-bold">
                      FasterUI Tournament {2024 - item}
                    </h3>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <Link href="/events/past">
              <motion.div
                className="bg-zinc-900 border-2 border-zinc-700 hover:border-red-600 text-white px-6 py-3 rounded-md uppercase tracking-wider font-medium inline-flex items-center"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(220,38,38,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                View All Past Events
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                    duration: 1,
                  }}
                >
                  <ChevronRight className="ml-2 h-4 w-4" />
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
