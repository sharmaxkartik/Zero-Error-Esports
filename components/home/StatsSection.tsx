"use client";

import { Trophy, Gamepad2, Zap, Users } from "lucide-react";
import AnimatedCounter from "../AnimatedCounter";

const StatsSection = () => {
  return (
    <section className="relative py-16 bg-black/50 backdrop-blur-sm border-t border-b border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter
            value={50}
            label="Tournaments Won"
            icon={<Trophy className="w-6 h-6 text-red-500" />}
            delay={0}
          />
          <AnimatedCounter
            value={120}
            label="Active Players"
            icon={<Gamepad2 className="w-6 h-6 text-red-500" />}
            delay={0.1}
          />
          <AnimatedCounter
            value={35}
            label="Global Events"
            icon={<Zap className="w-6 h-6 text-red-500" />}
            delay={0.2}
          />
          <AnimatedCounter
            value={10000}
            label="Community Members"
            icon={<Users className="w-6 h-6 text-red-500" />}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
