"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Trophy, ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function TeamsPage() {
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
      <section className="relative h-[400px] overflow-hidden">
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
            src="/banner.jpg?height=400&width=1200"
            alt="Teams Background"
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
            OUR{" "}
            <motion.span
              className="text-red-600 inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              TEAMS
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-lg text-zinc-300 mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Meet the elite players who represent Zero Error Esports in
            competitions worldwide
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
                  MEET OUR PLAYERS
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
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

      {/* Featured Team */}
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
            {/* Team image */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="relative h-[400px] overflow-hidden rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Featured Team"
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

            {/* Team details */}
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
                Zero Error Apex
              </motion.h2>

              <motion.p
                className="text-zinc-300 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Our flagship team competing in the world's most prestigious FPS
                tournaments. With multiple championship titles and a reputation
                for innovative strategies, Team Apex continues to dominate the
                competitive scene.
              </motion.p>

              <motion.div
                className="flex items-center gap-2 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ x: 5 }}
              >
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-zinc-300">3x World Champions</span>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-4 mb-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { label: "Founded", value: "2018" },
                  { label: "Game", value: "Tactical Shooter" },
                  { label: "Region", value: "North America" },
                  { label: "Coach", value: "Marcus Williams" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="bg-zinc-900 p-4 rounded-lg border border-zinc-800"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(220,38,38,0.1)",
                      borderColor: "rgba(220,38,38,0.3)",
                    }}
                  >
                    <p className="text-sm text-zinc-400">{item.label}</p>
                    <p className="font-bold">{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link href="#">
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
                      Team Profile
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Infinity,
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

      {/* All Teams */}
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
            OUR <span className="text-red-600">TEAMS</span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Team cards */}
            {[
              {
                name: "Zero Error Apex",
                game: "Tactical Shooter",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                name: "Zero Error Legends",
                game: "MOBA",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                name: "Zero Error Royale",
                game: "Battle Royale",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                name: "Zero Error Fighters",
                game: "Fighting Games",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                name: "Zero Error Strategy",
                game: "RTS",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                name: "Zero Error Academy",
                game: "Multi-Game",
                image: "/placeholder.svg?height=250&width=400",
              },
            ].map((team, index) => (
              <motion.div
                key={index}
                className="bg-zinc-900/80 rounded-lg overflow-hidden group border border-zinc-800 shadow-lg hover:shadow-[0_0_20px_rgba(150,0,0,0.2)]"
                variants={itemVariants}
                whileHover={{ y: -10, borderColor: "rgba(220,38,38,0.5)" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={team.image || "/placeholder.svg"}
                    alt={team.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <motion.h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors duration-300">
                    {team.name}
                  </motion.h3>

                  <motion.p className="text-zinc-400 mb-4">
                    {team.game}
                  </motion.p>

                  <motion.div
                    className="grid grid-cols-5 gap-2 mb-6"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[1, 2, 3, 4, 5].map((player) => (
                      <motion.div
                        key={player}
                        className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-transparent hover:border-red-600 transition-colors duration-300"
                        whileHover={{ scale: 1.15, y: -3 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <Image
                          src={`/placeholder.svg?height=48&width=48`}
                          alt={`Player ${player}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  <Link href="#">
                    <motion.div
                      className="text-red-600 flex items-center text-sm uppercase font-bold hover:text-red-500 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      Team Details
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          repeat: Infinity,
                          repeatDelay: 1,
                          duration: 1,
                        }}
                      >
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </motion.span>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Our Teams */}
      <section className="py-16 bg-zinc-950 relative">
        {/* Subtle diagonal pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

        {/* Red glowing orb */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-red-600/10 filter blur-[120px] opacity-50"></div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              className="text-3xl font-bold uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              JOIN OUR <span className="text-red-600">TEAMS</span>
            </motion.h2>

            <motion.p
              className="text-zinc-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Zero Error Esports is always looking for talented players to join
              our competitive teams. If you have what it takes to compete at the
              highest level, we want to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Link href="/signup">
                <motion.div
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-md uppercase font-bold text-sm inline-flex items-center relative overflow-hidden group shadow-[0_0_15px_rgba(150,0,0,0.3)]"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(220,0,0,0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center">
                    Apply Now
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        repeat: Infinity,
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
        </div>
      </section>
    </div>
  );
}
