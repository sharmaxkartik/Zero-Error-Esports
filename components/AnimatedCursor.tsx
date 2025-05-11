"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });

  // Check if the device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkIsMobile();

    // Check when window resizes
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Only add event listeners and styles if not mobile
  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, isMobile]);

  // Check if cursor is hovering over clickable elements
  useEffect(() => {
    if (isMobile) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.onclick !== null ||
        target.closest('a, button, [role="button"]') !== null ||
        getComputedStyle(target).cursor === "pointer";

      setIsHovering(isClickable);
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, [isMobile]);

  // Add an effect to inject a global style to hide the default cursor
  useEffect(() => {
    if (isMobile) return;

    // Create a style element to hide the default cursor on the entire page
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    // Cleanup when component unmounts
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [isMobile]);

  // Don't render the custom cursor on mobile
  if (isMobile) return null;

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 z-50 pointer-events-none"
      style={{
        translateX: springX,
        translateY: springY,
      }}
    >
      <img
        src={
          isHovering
            ? "/cursor/clickable-cursor.png"
            : "/cursor/electric-cursor.png"
        }
        alt="cursor"
        className={`pointer-events-none w-10 h-10 ${
          isHovering ? "animate-bounce" : "animate-pulse"
        }`}
      />
    </motion.div>
  );
}
