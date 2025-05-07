"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Video background */}
        <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/e_E9W2vsRbQ?autoplay=1&mute=1&loop=1&playlist=e_E9W2vsRbQ"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </motion.div>

        {/* Hero content */}
        <div className="container max-w-5xl mx-auto relative z-20 h-full flex flex-col justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase leading-tight max-w-2xl glitch-text">
              <span className="text-red-600 glow-text">ZERO</span> ERROR
              <br />
              <span className="text-red-600 glow-text">ESPORTS</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where precision meets passion. Join the elite gaming team that
            accepts nothing less than victory.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/teams"
              className="bg-red-600 text-white mt-8 px-6 py-3 uppercase font-bold text-sm w-fit flex items-center hover-glow"
            >
              Meet Our Team
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <motion.div
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Sponsors Section */}
      <section className="border-t border-b border-zinc-800 py-6">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="flex justify-between items-center flex-wrap gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["adidas", "nike", "puma", "reebook", "under-armour"].map(
              (brand, index) => (
                <motion.div
                  key={brand}
                  className="opacity-50 hover:opacity-100 transition-opacity"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={`/placeholder.svg?height=40&width=80`}
                    alt={brand}
                    width={80}
                    height={40}
                    className="grayscale"
                  />
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section header with navigation */}
          <motion.div
            className="flex justify-between items-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold uppercase">UPCOMING EVENTS</h2>
            <Link
              href="/events"
              className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-sm uppercase font-bold transition-colors flex items-center"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>

          {/* Events cards grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Zero Error Championship",
                date: "June 15-20, 2025",
                location: "Mumbai, India",
                image: "/placeholder.svg?height=280&width=400",
                category: "Tournament",
              },
              {
                title: "Gaming Bootcamp",
                date: "July 8-10, 2025",
                location: "Delhi, India",
                image: "/placeholder.svg?height=280&width=400",
                category: "Training",
              },
              {
                title: "Community Meetup",
                date: "August 15, 2025",
                location: "Bangalore, India",
                image: "/placeholder.svg?height=280&width=400",
                category: "Community",
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative h-[280px] overflow-hidden bg-zinc-900 mb-4 border border-zinc-800">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 bg-black/80 p-3">
                    <span className="text-xs uppercase text-red-600 font-bold">
                      {event.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors">
                  {event.title}
                </h3>
                <div className="flex flex-col text-zinc-400 text-sm mb-4">
                  <span>{event.date}</span>
                  <span>{event.location}</span>
                </div>
                <Link
                  href="#"
                  className="text-xs uppercase text-red-600 flex items-center font-bold hover:text-red-500 transition-colors"
                >
                  Learn More
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
