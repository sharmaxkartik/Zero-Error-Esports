"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Users,
  ChevronRight,
  MessageSquare,
  Map,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.5)_2px,transparent_2px)] bg-[size:40px_40px] opacity-30 z-10"></div>

        {/* Red glowing orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-red-600/10 filter blur-[150px] z-10"></div>
        <div className="absolute bottom-[-30%] left-[-20%] w-[700px] h-[700px] rounded-full bg-red-600/5 filter blur-[120px] z-10"></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80 z-10"></div>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner.jpg?height=600&width=1200"
            alt="About Us Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 z-10 scan-lines opacity-20"></div>

        {/* Hero content */}
        <div className="container mx-auto relative z-20 h-full flex flex-col justify-center px-6">
          <motion.h1
            className="text-5xl md:text-7xl font-black uppercase leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ABOUT{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 glow-text"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Zero Error
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-zinc-300 mt-6 max-w-2xl font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            The premier esports organization dedicated to excellence and
            innovation in competitive gaming
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-8"
          >
            <motion.a
              href="#our-story"
              className="inline-flex items-center text-red-500 font-semibold text-lg group"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Discover our journey
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 1, duration: 1 }}
              >
                <ChevronRight className="ml-2 h-5 w-5 group-hover:text-red-400" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-24 relative">
        {/* Subtle diagonal pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-bold uppercase mb-8">
                OUR{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                  STORY
                </span>
              </h2>
              <div className="space-y-6 text-zinc-300 text-lg">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Founded in 2013, Zero Error Esports has grown from a small
                  group of passionate gamers to one of the most recognized names
                  in esports. Our journey began with a simple mission: to create
                  a platform where talented players could showcase their skills
                  and compete at the highest level.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Over the years, we've expanded our reach across multiple game
                  titles, built state-of-the-art training facilities, and
                  developed a comprehensive support system for our athletes. Our
                  teams have competed in major tournaments worldwide, bringing
                  home numerous championships and establishing Zero Error as a
                  dominant force in competitive gaming.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Today, we continue to push the boundaries of what's possible
                  in esports, investing in emerging talent, innovative
                  technologies, and community engagement initiatives that bring
                  fans closer to the action than ever before.
                </motion.p>
              </div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/teams">
                  <motion.div
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-md inline-flex items-center font-semibold text-sm uppercase relative overflow-hidden group shadow-[0_0_15px_rgba(150,0,0,0.2)]"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(220,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center">
                      Meet Our Team
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative h-[500px] overflow-hidden rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.3)] border border-zinc-800/50"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src="/images/story.jpg?height=500&width=600"
                alt="Our Story"
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center space-x-2 text-red-500 mb-3">
                  <Trophy className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase">
                    Est. 2013
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  From Passion to Champions
                </h3>
                <p className="text-zinc-300 text-sm">
                  Our journey through the competitive gaming landscape
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-zinc-950/70 relative">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.8)_2px,transparent_2px)] bg-[size:40px_40px] opacity-20"></div>

        <div className="container mx-auto px-6 relative">
          <motion.h2
            className="text-4xl font-bold uppercase mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            OUR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              VALUES
            </span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Excellence */}
            <motion.div
              className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border border-zinc-800/50 shadow-lg hover:shadow-red-900/20 transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(220, 38, 38, 0.04)",
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Trophy className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">EXCELLENCE</h3>
              <p className="text-zinc-400 leading-relaxed">
                We strive for excellence in everything we do, from competition
                and training to content creation and fan engagement. Our
                commitment to perfection is what separates us from the
                competition.
              </p>
            </motion.div>

            {/* Innovation */}
            <motion.div
              className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border border-zinc-800/50 shadow-lg hover:shadow-red-900/20 transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(220, 38, 38, 0.04)",
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <TrendingUp className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">INNOVATION</h3>
              <p className="text-zinc-400 leading-relaxed">
                We embrace new technologies and approaches, constantly seeking
                better ways to train, compete, and connect with our community.
                Innovation is at the heart of everything we do.
              </p>
            </motion.div>

            {/* Community */}
            <motion.div
              className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border border-zinc-800/50 shadow-lg hover:shadow-red-900/20 transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(220, 38, 38, 0.04)",
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">COMMUNITY</h3>
              <p className="text-zinc-400 leading-relaxed">
                We believe in the power of community and work to create
                inclusive spaces where all gamers feel welcome and valued. Our
                fans are the foundation of everything we build.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Leadership Section */}
      <section className="py-24 relative">
        {/* Subtle diagonal pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

        <div className="container mx-auto px-6 relative">
          <motion.h2
            className="text-4xl font-bold uppercase mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            OUR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              LEADERSHIP
            </span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Team members */}
            {[
              {
                name: "Alex Johnson",
                role: "Founder & CEO",
                icon: <Zap className="w-4 h-4" />,
                bio: "Former pro gamer turned entrepreneur with a vision to revolutionize esports",
              },
              {
                name: "Sarah Chen",
                role: "Chief Operating Officer",
                icon: <TrendingUp className="w-4 h-4" />,
                bio: "Strategic leader with experience scaling esports organizations globally",
              },
              {
                name: "Marcus Williams",
                role: "Head Coach",
                icon: <Trophy className="w-4 h-4" />,
                bio: "Championship-winning coach with expertise in multiple game titles",
              },
              {
                name: "Elena Rodriguez",
                role: "Technical Director",
                icon: <MessageSquare className="w-4 h-4" />,
                bio: "Tech innovator dedicated to giving our players the competitive edge",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-[350px] w-full mb-5 overflow-hidden rounded-xl border border-zinc-800 shadow-lg">
                  <Image
                    src={`/images/story.jpg?height=350&width=300`}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="flex items-center mb-3">
                      <span className="bg-red-600 p-1.5 rounded-md mr-2 flex items-center justify-center">
                        {member.icon}
                      </span>
                      <span className="text-xs uppercase text-white font-bold tracking-wider">
                        {member.role}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-zinc-400 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.bio}
                    </p>
                  </div>

                  {/* Overlay effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <Link href="/teams">
              <motion.button
                className="bg-transparent border-2 border-zinc-700 hover:border-red-600 text-white px-8 py-4 rounded-md uppercase tracking-wider font-medium"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(220,38,38,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Meet The Full Team
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
