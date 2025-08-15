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
            src="/images/banner.jpg?height=400&width=1200"
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
            ZERO ERROR{" "}
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
            <Link href="#upcoming">
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

      {/* Upcoming Events Section */}
      <section id="upcoming" className="py-16 bg-zinc-950 relative">
        {/* Subtle diagonal pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              UPCOMING EVENTS
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Stay Tuned. Many Events are lined up.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-16 bg-black relative">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.3)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              PAST EVENTS
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Check out our previously conducted tournaments and competitions
            </p>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* ZE FACEOFF Invitational */}
            <motion.div
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden group hover:border-red-500/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <iframe
                  src="https://drive.google.com/file/d/1UWUIMaUei-KCQPISlmRwN5fRUircYA1q/preview"
                  className="w-full h-full object-cover"
                  allowFullScreen
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 px-3 py-1 rounded-full text-sm font-bold z-20">
                  BGMI
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold uppercase mb-2 text-white group-hover:text-red-400 transition-colors">
                  ZE FACEOFF Invitational
                </h3>
                <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-red-500" />
                    1v1 TDM Invitational
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-red-500" />
                    Online
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-green-400 font-semibold">Winner: </span>
                  <span className="text-white">Zoldyck Playz</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
                    Battle Royale
                  </span>
                  <ChevronRight className="h-5 w-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* EAFC SHOWDOWN */}
            <motion.div
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden group hover:border-red-500/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <iframe
                  src="https://drive.google.com/file/d/1CdvzYvT56N2xC_pOZrrQzjeVKwgvv9Ez/preview"
                  className="w-full h-full object-cover"
                  allowFullScreen
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1 rounded-full text-sm font-bold z-20">
                  EAFC 25
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold uppercase mb-2 text-white group-hover:text-red-400 transition-colors">
                  EAFC SHOWDOWN
                </h3>
                <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-red-500" />
                    1v1
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-red-500" />
                    Offline LAN
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-green-400 font-semibold">Winner: </span>
                  <span className="text-white">Harshit</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
                    Football
                  </span>
                  <ChevronRight className="h-5 w-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* ZE SLAMMANIA */}
            <motion.div
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden group hover:border-red-500/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <iframe
                  src="https://drive.google.com/file/d/1yjc5k3j16EviDnng7_EeIxTjRVkjwDUe/preview"
                  className="w-full h-full object-cover"
                  allowFullScreen
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-600 to-yellow-700 px-3 py-1 rounded-full text-sm font-bold z-20">
                  WWE 2K25
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold uppercase mb-2 text-white group-hover:text-red-400 transition-colors">
                  ZE SLAMMANIA
                </h3>
                <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-red-500" />
                    1v1
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-red-500" />
                    Offline LAN
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-green-400 font-semibold">Winner: </span>
                  <span className="text-white">Aniraj</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
                    Wrestling
                  </span>
                  <ChevronRight className="h-5 w-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* ZE FFM SHOWDOWN */}
            <motion.div
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden group hover:border-red-500/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <iframe
                  src="https://drive.google.com/file/d/1bLa3pMgTrj0_LW5sfVbrAUhLbzmjF9pm/preview"
                  className="w-full h-full object-cover"
                  allowFullScreen
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-600 to-orange-700 px-3 py-1 rounded-full text-sm font-bold z-20">
                  Free Fire Max
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold uppercase mb-2 text-white group-hover:text-red-400 transition-colors">
                  ZE FFM SHOWDOWN
                </h3>
                <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-red-500" />
                    4v4 Squad Battle Royale
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-red-500" />
                    Online
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-green-400 font-semibold">Winner: </span>
                  <span className="text-white">Team Tag Elite</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
                    Battle Royale
                  </span>
                  <ChevronRight className="h-5 w-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
