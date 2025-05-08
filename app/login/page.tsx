"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Eye, EyeOff, ArrowRight, User } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formState);
  };

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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DXgshYlxQfx725QpTWbB89j5xicbzE.png"
              alt="Zero Error Esports"
              width={100}
              height={50}
              className="hover-glow"
            />
          </motion.div>

          {/* Form */}
          <div className="p-6">
            <motion.h1
              className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-red-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              LOGIN
            </motion.h1>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative"
              >
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-1 transition-all duration-200 ${
                    focusedField === "email" ? "text-red-500" : "text-zinc-400"
                  }`}
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                  <User
                    size={16}
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                      focusedField === "email"
                        ? "text-red-500"
                        : "text-zinc-500"
                    }`}
                  />

                  {/* Animation bar */}
                  <AnimatePresence>
                    {focusedField === "email" && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full origin-left"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative"
              >
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-1 transition-all duration-200 ${
                    focusedField === "password"
                      ? "text-red-500"
                      : "text-zinc-400"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                  />
                  <motion.div
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    initial={{ rotate: 0 }}
                    animate={{
                      rotate:
                        focusedField === "password"
                          ? [0, -10, 10, -5, 5, 0]
                          : 0,
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={
                        focusedField === "password" ? "#ef4444" : "#71717a"
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        width="18"
                        height="11"
                        x="3"
                        y="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </motion.div>

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.div>
                  </button>

                  {/* Animation bar */}
                  <AnimatePresence>
                    {focusedField === "password" && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full origin-left"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="relative inline-flex items-center">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      checked={formState.remember}
                      onChange={handleChange}
                      className="opacity-0 absolute h-5 w-5 cursor-pointer"
                    />
                    <div
                      className={`border ${
                        formState.remember
                          ? "bg-red-600 border-red-600"
                          : "bg-zinc-800 border-zinc-600"
                      } rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 transition-colors duration-200 ease-in-out`}
                    >
                      <svg
                        className={`fill-current w-3 h-3 text-white pointer-events-none ${
                          formState.remember ? "opacity-100" : "opacity-0"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-1 block text-sm text-zinc-400 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <motion.a
                  href="#"
                  className="text-sm text-red-600 hover:text-red-500 transition-colors duration-200"
                  whileHover={{ x: 3 }}
                >
                  Forgot password?
                </motion.a>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-bold uppercase hover:from-red-700 hover:to-red-800 relative overflow-hidden group shadow-[0_0_10px_rgba(150,0,0,0.3)]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center">
                  LOGIN
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
            </form>

            <motion.div
              className="mt-6 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="text-zinc-400">Don't have an account?</span>{" "}
              <Link
                href="/signup"
                className="text-red-600 hover:text-red-500 font-medium relative inline-block"
                tabIndex={0}
              >
                <span className="relative z-10">Sign up</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
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
