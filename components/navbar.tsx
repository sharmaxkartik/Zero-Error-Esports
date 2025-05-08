"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Navigation links data
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Teams", path: "/teams" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50 pt-6 px-4">
      <header
        className={`rounded-full backdrop-blur-md shadow-lg py-3 px-6 w-auto max-w-4xl transition-all duration-500 ${
          scrolled
            ? "bg-black/90 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
            : "bg-black/40 border border-purple-500/10"
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DXgshYlxQfx725QpTWbB89j5xicbzE.png"
                alt="Zero Error Esports"
                width={80}
                height={40}
                className="rounded-full"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="group relative"
              >
                <Link
                  href={link.path}
                  className={`relative px-1 py-1 text-sm font-medium transition-colors hover:text-purple-400 ${
                    pathname === link.path ? "text-purple-400" : "text-gray-300"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transform origin-left transition-transform duration-300 ease-out ${
                      pathname === link.path
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:block transition-transform duration-300 hover:scale-105"
            >
              <Link
                href="/login"
                className="px-5 py-2 rounded-full bg-transparent border border-purple-500/50 text-purple-400 text-sm font-medium hover:bg-purple-500/10 hover:border-purple-400 transition-all"
              >
                Login
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden md:block transition-transform duration-300 hover:scale-105"
            >
              <Link
                href="/signup"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                Sign Up
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden flex items-center text-purple-400 transition-transform duration-300 active:scale-90"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pt-4 border-t border-purple-500/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Link
                    href={link.path}
                    className={`block px-3 py-2 rounded-md text-sm font-medium hover:text-purple-400 hover:bg-purple-500/10 transition-colors ${
                      pathname === link.path
                        ? "text-purple-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2">
                <Link
                  href="/login"
                  className="block w-full text-center px-3 py-2 rounded-full bg-transparent border border-purple-500/50 text-purple-400 text-sm font-medium hover:bg-purple-500/10 hover:border-purple-400 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
              <div>
                <Link
                  href="/signup"
                  className="block w-full text-center px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </header>
    </div>
  );
}
