"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Updated navigation links data to include Games
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Games", path: "/games" },
  { name: "Teams", path: "/teams" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect with smoother detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const headerVariants = {
    expanded: {
      maxWidth: "90%",
      padding: "0.75rem 3rem",
      background:
        "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(75,0,0,0.8) 50%, rgba(0,0,0,0.8) 100%)",
      boxShadow: "0 8px 32px rgba(255, 0, 0, 0.25)",
      borderColor: "rgba(255, 0, 0, 0.25)",
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
    },
    collapsed: {
      maxWidth: "80%",
      padding: "0.75rem 1.5rem",
      background:
        "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(75,0,0,0.9) 50%, rgba(0,0,0,0.95) 100%)",
      boxShadow: "0 4px 20px rgba(255, 0, 0, 0.35)",
      borderColor: "rgba(255, 0, 0, 0.4)",
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
    },
  };

  const navItemVariants = {
    expanded: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.05 * i,
        ease: "easeOut",
      },
    }),
    collapsed: {
      opacity: 0.95,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-[100] pt-6 px-4">
      <motion.header
        className="rounded-full backdrop-blur-md border w-auto"
        variants={headerVariants}
        animate={scrolled ? "collapsed" : "expanded"}
        initial="expanded"
      >
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: scrolled ? 1 : 1.1,
                transition: { duration: 0.5 },
              }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DXgshYlxQfx725QpTWbB89j5xicbzE.png"
                alt="Zero Error Esports"
                width={60}
                height={30}
                className="rounded-full"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center"
            animate={{
              gap: scrolled ? "1.5rem" : "2.5rem",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                custom={index}
                variants={navItemVariants}
                initial="collapsed"
                animate={scrolled ? "collapsed" : "expanded"}
                className="group relative"
              >
                <Link
                  href={link.path}
                  className={`relative px-1 py-1 font-medium transition-all ${
                    scrolled ? "text-sm" : "text-base"
                  } ${
                    pathname === link.path ? "text-red-500" : "text-gray-200"
                  } hover:text-red-400`}
                >
                  {link.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full transform origin-left"
                    initial={{ scaleX: pathname === link.path ? 1 : 0 }}
                    animate={{
                      scaleX: pathname === link.path ? 1 : 0,
                      transition: { duration: 0.3 },
                    }}
                    whileHover={{
                      scaleX: 1,
                      transition: { duration: 0.2 },
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Auth Buttons */}
          <motion.div
            className="flex items-center"
            animate={{
              gap: scrolled ? "0.75rem" : "1.25rem",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:block"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Link
                href="/login"
                className={`px-5 py-2 rounded-full bg-transparent border border-red-500/50 text-red-400 font-medium hover:bg-red-500/10 hover:border-red-400 transition-all ${
                  scrolled ? "text-xs" : "text-sm"
                }`}
              >
                Login
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden md:block"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(255, 0, 0, 0.5)",
                transition: { duration: 0.2 },
              }}
            >
              <Link
                href="/signup"
                className={`px-5 py-2 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-medium transition-all ${
                  scrolled ? "text-xs" : "text-sm"
                }`}
              >
                Sign Up
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden flex items-center text-red-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pt-4 border-t border-red-500/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * index }}
                  >
                    <Link
                      href={link.path}
                      className={`block px-3 py-2 rounded-md text-sm font-medium hover:text-red-400 hover:bg-red-500/10 transition-colors ${
                        pathname === link.path
                          ? "text-red-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Link
                    href="/login"
                    className="block w-full text-center px-3 py-2 rounded-full bg-transparent border border-red-500/50 text-red-400 text-sm font-medium hover:bg-red-500/10 hover:border-red-400 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Link
                    href="/signup"
                    className="block w-full text-center px-3 py-2 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-red-500/20 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
