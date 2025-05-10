"use client";

import { motion } from "framer-motion";
import { useAnimation } from "@/contexts/AnimationContext";

interface CursorFollowerProps {
  cursorX: any;
  cursorY: any;
}

const CursorFollower = ({ cursorX, cursorY }: CursorFollowerProps) => {
  const { animationEnabled } = useAnimation();

  // Don't render if animations are disabled
  if (!animationEnabled) return null;

  return (
    <motion.div
      className="hidden md:block fixed z-50 pointer-events-none"
      style={{
        x: cursorX,
        y: cursorY,
        width: 0,
        height: 0,
      }}
    >
      <motion.div
        className="absolute w-12 h-12 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(255,0,0,0.2) 0%, transparent 70%)",
          filter: "blur(5px)",
        }}
      />
      <motion.div className="absolute w-1 h-1 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
};

export default CursorFollower;
