"use client";

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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* ZE FACEOFF Invitational */}
            <motion.div
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden group hover:border-red-500/50 transition-all duration-300 shadow-2xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Event Cover Image */}
              <div className="relative w-full aspect-square overflow-hidden max-h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <Image
                  src="/images/ZE_faceoff.png"
                  alt="ZE FACEOFF Invitational"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 px-2 py-1 rounded-full text-xs font-bold z-20 shadow-lg">
                  BGMI
                </div>
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <h3 className="text-lg font-black uppercase text-white mb-1 drop-shadow-lg leading-tight">
                    ZE FACEOFF Invitational
                  </h3>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-red-500" />
                    1v1 TDM Invitational
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-500" />
                    Online
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-3">
                  <span className="text-green-400 font-semibold text-sm">
                    Winner:{" "}
                  </span>
                  <span className="text-white font-bold text-sm">
                    Zoldyck Playz
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-800 px-2 py-1 rounded-full text-xs text-zinc-300">
                    Battle Royale
                  </span>
                  <ChevronRight className="h-4 w-4 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* EAFC SHOWDOWN */}
            <motion.div
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden group hover:border-red-500/50 transition-all duration-300 shadow-2xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Event Cover Image */}
              <div className="relative w-full aspect-square overflow-hidden max-h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <Image
                  src="/images/EAFC_showdown.png"
                  alt="EAFC SHOWDOWN"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 px-2 py-1 rounded-full text-xs font-bold z-20 shadow-lg">
                  EAFC 25
                </div>
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <h3 className="text-lg font-black uppercase text-white mb-1 drop-shadow-lg leading-tight">
                    EAFC SHOWDOWN
                  </h3>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-red-500" />
                    1v1
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-500" />
                    Offline LAN
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-3">
                  <span className="text-green-400 font-semibold text-sm">
                    Winner:{" "}
                  </span>
                  <span className="text-white font-bold text-sm">Harshit</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-800 px-2 py-1 rounded-full text-xs text-zinc-300">
                    Football
                  </span>
                  <ChevronRight className="h-4 w-4 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* ZE SLAMMANIA */}
            <motion.div
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden group hover:border-red-500/50 transition-all duration-300 shadow-2xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Event Cover Image */}
              <div className="relative w-full aspect-square overflow-hidden max-h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <Image
                  src="/images/ZE_slammania.png"
                  alt="ZE SLAMMANIA"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-600 to-yellow-700 px-2 py-1 rounded-full text-xs font-bold z-20 shadow-lg">
                  WWE 2K25
                </div>
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <h3 className="text-lg font-black uppercase text-white mb-1 drop-shadow-lg leading-tight">
                    ZE SLAMMANIA
                  </h3>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-red-500" />
                    1v1
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-500" />
                    Offline LAN
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-3">
                  <span className="text-green-400 font-semibold text-sm">
                    Winner:{" "}
                  </span>
                  <span className="text-white font-bold text-sm">Aniraj</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-800 px-2 py-1 rounded-full text-xs text-zinc-300">
                    Wrestling
                  </span>
                  <ChevronRight className="h-4 w-4 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* ZE FFM SHOWDOWN */}
            <motion.div
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden group hover:border-red-500/50 transition-all duration-300 shadow-2xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Event Cover Image */}
              <div className="relative w-full aspect-square overflow-hidden max-h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <Image
                  src="/images/ZE_FFM_Showdown.png"
                  alt="ZE FFM SHOWDOWN"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-600 to-orange-700 px-2 py-1 rounded-full text-xs font-bold z-20 shadow-lg">
                  Free Fire Max
                </div>
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <h3 className="text-lg font-black uppercase text-white mb-1 drop-shadow-lg leading-tight">
                    ZE FFM SHOWDOWN
                  </h3>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-red-500" />
                    4v4 Squad Battle Royale
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-500" />
                    Online
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-3">
                  <span className="text-green-400 font-semibold text-sm">
                    Winner:{" "}
                  </span>
                  <span className="text-white font-bold text-sm">
                    Team Tag Elite
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-800 px-2 py-1 rounded-full text-xs text-zinc-300">
                    Battle Royale
                  </span>
                  <ChevronRight className="h-4 w-4 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
