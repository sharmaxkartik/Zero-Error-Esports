"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function JoinUsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-20 overflow-hidden relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.8)_2px,transparent_2px)] bg-[size:40px_40px] opacity-30"></div>

      {/* Red glowing orb in corner */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-red-600/20 filter blur-[100px]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-red-600/10 filter blur-[100px]"></div>

      <div className="max-w-md w-full mx-auto px-6 relative z-10">
        <motion.div
          className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.3),0_0_5px_rgba(255,0,0,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Header */}
          <motion.div
            className="p-6 border-b border-zinc-800 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Image
              src="/images/favicon.png"
              alt="Zero Error Esports"
              width={100}
              height={50}
              className="hover-glow"
            />
          </motion.div>

          {/* Content */}
          <div className="p-8 text-center">
            <motion.h1
              className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Join the ZE Club
            </motion.h1>
            <motion.p
              className="text-zinc-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Become a part of the Zero Error Esports community. Get access to
              exclusive events, track your stats, and climb the ranks!
            </motion.p>

            <motion.button
              onClick={() => signIn("discord", { callbackUrl: "/ze-club" })}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-bold uppercase hover:from-blue-600 hover:to-indigo-700 relative overflow-hidden group shadow-[0_0_10px_rgba(80,80,200,0.3)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative flex items-center justify-center">
                Join with Discord
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 2,
                    duration: 1,
                  }}
                >
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="flex items-center text-sm text-zinc-400 hover:text-white group transition-colors duration-200"
          >
            <motion.span whileHover={{ x: -3 }} className="flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              Back to home
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
