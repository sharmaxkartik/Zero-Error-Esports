"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  GamepadIcon,
} from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gamertag: "",
    terms: false,
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formState)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-20 overflow-hidden relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.8)_2px,transparent_2px)] bg-[size:40px_40px] opacity-30"></div>

      {/* Red glowing orb in corner */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-red-600/20 filter blur-[100px]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-red-600/10 filter blur-[100px]"></div>

      <div className="max-w-md w-full mx-auto px-6 relative z-10 mt-10">
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

          {/* Form */}
          <div className="p-6">
            <motion.h1
              className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-red-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              JOIN THE ZE CLUB
            </motion.h1>
            <motion.p
              className="text-zinc-400 mb-6 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Create your account and start your gaming journey
            </motion.p>

            {/* Social Login Buttons */}
            <motion.div
              className="space-y-3 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Discord Sign Up Button */}
              <motion.button
                onClick={() => signIn("discord", { callbackUrl: "/ze-club" })}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-bold uppercase hover:from-blue-600 hover:to-indigo-700 relative overflow-hidden group shadow-[0_0_10px_rgba(80,80,200,0.3)] transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Sign up with Discord
                </span>
              </motion.button>

              {/* Google Sign Up Button */}
              <motion.button
                onClick={() => signIn("google", { callbackUrl: "/ze-club" })}
                className="w-full bg-white text-black py-3 px-4 rounded-lg font-bold uppercase hover:bg-gray-100 relative overflow-hidden group shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </span>
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="flex items-center my-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex-1 border-t border-zinc-700"></div>
              <span className="px-4 text-sm text-zinc-500">OR</span>
              <div className="flex-1 border-t border-zinc-700"></div>
            </motion.div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="relative">
                  <label
                    htmlFor="firstName"
                    className={`block text-sm font-medium mb-1 transition-all duration-200 ${
                      focusedField === "firstName"
                        ? "text-red-500"
                        : "text-zinc-400"
                    }`}
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                      placeholder="John"
                    />
                    {/* Animation bar */}
                    <AnimatePresence>
                      {focusedField === "firstName" && (
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
                </div>
                <div className="relative">
                  <label
                    htmlFor="lastName"
                    className={`block text-sm font-medium mb-1 transition-all duration-200 ${
                      focusedField === "lastName"
                        ? "text-red-500"
                        : "text-zinc-400"
                    }`}
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                      placeholder="Doe"
                    />
                    {/* Animation bar */}
                    <AnimatePresence>
                      {focusedField === "lastName" && (
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
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
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
                  <Mail
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
                transition={{ delay: 0.5, duration: 0.5 }}
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
                    <Lock
                      size={16}
                      className={`transition-colors duration-200 ${
                        focusedField === "password"
                          ? "text-red-500"
                          : "text-zinc-500"
                      }`}
                    />
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="relative"
              >
                <label
                  htmlFor="gamertag"
                  className={`block text-sm font-medium mb-1 transition-all duration-200 ${
                    focusedField === "gamertag"
                      ? "text-red-500"
                      : "text-zinc-400"
                  }`}
                >
                  Gamer Tag
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="gamertag"
                    name="gamertag"
                    value={formState.gamertag}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("gamertag")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                    placeholder="ZE_Player"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={focusedField === "gamertag" ? "#ef4444" : "#71717a"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200"
                  >
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <path d="M6 12h4"></path>
                    <path d="M14 12h4"></path>
                    <path d="M6 15a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z"></path>
                    <path d="M16 16a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z"></path>
                    <path d="M14 8a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z"></path>
                    <path d="M16 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z"></path>
                  </svg>

                  {/* Animation bar */}
                  <AnimatePresence>
                    {focusedField === "gamertag" && (
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
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex items-start"
              >
                <div className="flex items-center h-5 mt-1">
                  <div className="relative inline-flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={formState.terms}
                      onChange={handleChange}
                      className="opacity-0 absolute h-5 w-5 cursor-pointer"
                    />
                    <div
                      className={`border ${
                        formState.terms
                          ? "bg-red-600 border-red-600"
                          : "bg-zinc-800 border-zinc-600"
                      } rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 transition-colors duration-200 ease-in-out`}
                    >
                      <svg
                        className={`fill-current w-3 h-3 text-white pointer-events-none ${
                          formState.terms ? "opacity-100" : "opacity-0"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="ml-2">
                  <label htmlFor="terms" className="text-sm text-zinc-400">
                    I agree to the{" "}
                    <motion.a
                      href="#"
                      className="text-red-600 hover:text-red-500 relative inline-block"
                      whileHover={{ x: 2 }}
                    >
                      <span className="relative z-10">Terms of Service</span>
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>{" "}
                    and{" "}
                    <motion.a
                      href="#"
                      className="text-red-600 hover:text-red-500 relative inline-block"
                      whileHover={{ x: 2 }}
                    >
                      <span className="relative z-10">Privacy Policy</span>
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </label>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-bold uppercase hover:from-red-700 hover:to-red-800 relative overflow-hidden group shadow-[0_0_10px_rgba(150,0,0,0.3)]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center">
                  SIGN UP
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
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <span className="text-zinc-400">Already have an account?</span>{" "}
              <Link
                href="/login"
                className="text-red-600 hover:text-red-500 font-medium relative inline-block"
                tabIndex={0}
              >
                <span className="relative z-10">Login</span>
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
          transition={{ delay: 1 }}
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
