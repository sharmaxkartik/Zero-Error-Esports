"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useTransform } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  scrollYProgress: any;
  mousePosition: { x: number; y: number };
  cursorX: any;
  cursorY: any;
}

const HeroSection = ({ scrollYProgress, mousePosition }: HeroSectionProps) => {
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const translateY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const contentTranslateY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial render
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background layer with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          scale,
          opacity,
          y: translateY,
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Conditional rendering based on device type */}
        {isMobile ? (
          // Static image for mobile
          <div className="absolute inset-0">
            <Image
              src="/images/hero-background.jpg" // Add your mobile background image path here
              alt="Zero Error Esports"
              fill
              className="object-cover opacity-70"
              priority
            />
          </div>
        ) : (
          // Video for desktop/laptop
          <iframe
            className="absolute inset-0 w-full h-full opacity-70"
            src="https://www.youtube.com/embed/e_E9W2vsRbQ?autoplay=1&mute=1&loop=1&playlist=e_E9W2vsRbQ&controls=0&showinfo=0&rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        )}
      </motion.div>

      {/* Content with opposite parallax movement */}
      <motion.div
        className="container max-w-5xl mx-auto relative z-30 h-full flex flex-col justify-center px-6"
        style={{
          y: contentTranslateY,
          opacity: contentOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-8xl font-black uppercase leading-tight max-w-2xl text-shadow-lg">
            <motion.span
              className="text-red-600 inline-block"
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              THE
            </motion.span>{" "}
            <span>HOME OF</span>
            <br />
            <motion.span
              className="text-red-600 inline-block"
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              RISING GAMERS!
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-white mt-6 max-w-xl font-light text-shadow"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          Zero Error Esports: Gwalior’s first esports hub, nurturing talent and
          pro gaming in MP.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="/teams">
            <motion.div
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 uppercase font-bold text-sm rounded-md flex items-center shadow-[0_0_15px_rgba(150,0,0,0.3)] relative overflow-hidden group"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 25px rgba(220,0,0,0.4)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  x: ["-100%", "100%"],
                  opacity: [0.4, 0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                  ease: "linear",
                }}
              />
              <span className="relative z-10 flex items-center">
                Meet Our Team
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronRight className="ml-2 h-4 w-4" />
                </motion.span>
              </span>
            </motion.div>
          </Link>

          <Link href="/signup">
            <motion.div
              className="border-2 border-zinc-700 hover:border-red-600 text-white bg-zinc-900/50 backdrop-blur-sm px-8 py-4 uppercase font-bold text-sm rounded-md flex items-center transition-colors duration-300 relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(30,30,30,0.8)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
            >
              <motion.span
                className="absolute inset-0 w-full h-full"
                style={{
                  background: `radial-gradient(circle at ${
                    mousePosition.x * 100
                  }% ${
                    mousePosition.y * 100
                  }%, rgba(255,0,0,0.5) 0%, transparent 70%)`,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                whileHover={{ opacity: 0.3 }}
              />
              <span className="relative z-10">
                Join Now
                <ArrowRight className="ml-2 h-4 w-4 inline-block" />
              </span>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
