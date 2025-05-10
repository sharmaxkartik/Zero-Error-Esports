"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const SponsorsSection = () => {
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

  const sponsors = ["adidas", "nike", "puma", "reebook", "under-armour"];

  return (
    <section className="border-t border-b border-zinc-800/50 py-10 relative backdrop-blur-sm bg-black/50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h3
          className="text-center mb-8 text-zinc-400 uppercase text-sm tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Trusted by world-class brands
        </motion.h3>

        <motion.div
          className="flex justify-between items-center flex-wrap gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {sponsors.map((brand, index) => (
            <motion.div
              key={brand}
              className="opacity-40 hover:opacity-100 transition-opacity duration-500 relative group"
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                filter: "brightness(1.5)",
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <motion.div className="absolute -inset-2 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100" />
              <Image
                src={`/images/valorant.png?height=40&width=80`}
                alt={brand}
                width={80}
                height={40}
                className="grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
