"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Trophy, Calendar, Users } from "lucide-react";

const UpcomingEventsSection = () => {
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

  const events = [
    {
      title: "Zero Error Championship",
      date: "June 15-20, 2025",
      location: "Mumbai, India",
      image: "/images/valorant.png?height=280&width=400",
      category: "Tournament",
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      title: "Gaming Bootcamp",
      date: "July 8-10, 2025",
      location: "Delhi, India",
      image: "/images/valorant.png?height=280&width=400",
      category: "Training",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      title: "Community Meetup",
      date: "August 15, 2025",
      location: "Bangalore, India",
      image: "/images/valorant.png?height=280&width=400",
      category: "Community",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <section className="py-24 relative bg-transparent">
      {/* Subtle diagonal pattern background */}
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#333,#333_1px,transparent_1px,transparent_10px)]"></div>

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Section header with navigation */}
        <motion.div
          className="flex flex-wrap justify-between items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-0.5 bg-gradient-to-r from-red-600 to-transparent mb-4 max-w-[200px]"
            />
            <h2 className="text-3xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              UPCOMING EVENTS
            </h2>
            <p className="text-zinc-500 mt-2">
              Don't miss our exciting upcoming tournaments and events
            </p>
          </div>

          <Link href="/events">
            <motion.div
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-5 py-3 mt-4 sm:mt-0 text-sm uppercase font-bold rounded-md transition-colors flex items-center group"
              whileHover={{
                scale: 1.05,
                borderColor: "rgb(220, 38, 38)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              View All
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1,
                }}
              >
                <ChevronRight className="ml-1 h-4 w-4 group-hover:text-red-500" />
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Events cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <div className="relative h-[280px] overflow-hidden bg-zinc-900 rounded-xl mb-5 border border-zinc-800 shadow-lg group-hover:border-red-600/50 transition-colors duration-300">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <div className="flex items-center mb-3">
                    <motion.span
                      className="bg-red-600 p-1.5 rounded-md mr-2 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      {event.icon}
                    </motion.span>
                    <span className="text-xs uppercase text-white font-bold tracking-wider">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <div className="flex flex-col text-zinc-400 text-sm space-y-1">
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      className="flex items-center"
                    >
                      <Calendar className="w-3 h-3 mr-2 text-zinc-500" />{" "}
                      {event.date}
                    </motion.span>
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      className="flex items-center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3 h-3 mr-2 text-zinc-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {event.location}
                    </motion.span>
                  </div>
                </div>

                {/* Overlay button that appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    className="bg-red-600/90 backdrop-blur-sm text-white px-5 py-3 rounded-lg font-bold flex items-center space-x-2"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(220,38,38,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
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
          <Link href="/events">
            <motion.button
              className="bg-transparent border-2 border-zinc-700 hover:border-red-600 text-white px-8 py-4 rounded-md uppercase tracking-wider font-medium relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(220,38,38,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View All Events</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
