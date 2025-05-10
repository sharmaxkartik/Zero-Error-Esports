// components/TeamMemberCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  stats: { label: string; value: string }[];
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  image,
  stats,
  index,
}) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 p-5 w-full">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-red-500 text-sm uppercase tracking-wider">
            {role}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-zinc-800/50 p-2 rounded">
              <p className="text-xs text-zinc-500">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <motion.button
          className="w-full py-2 mt-2 bg-red-600/10 border border-red-600/30 rounded text-red-500 text-sm font-medium transition-colors hover:bg-red-600/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Profile
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
