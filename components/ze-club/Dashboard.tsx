"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface UserDashboard {
  totalPoints: number
  rank: string
  badge: string
  progress: number
}

/**
 * SimpleCounter Component
 * Animates a number from 0 to the target value with easing.
 * Used for the points counter on the dashboard.
 */
function SimpleCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startValue = 0
    const duration = 1500 // Animation duration in milliseconds
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Cubic easing out for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      startValue = Math.floor(easedProgress * value)
      setCount(startValue)

      if (progress === 1) clearInterval(timer)
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [value])

  return <span>{count}</span>
}

/**
 * Dashboard Component
 * Displays user's ZE Club statistics including points, rank, badge, and progress.
 * Features animated counters and responsive design.
 */
function Dashboard() {
  const [dashboardData, setDashboardData] = useState<UserDashboard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/ze-club/user/dashboard")
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data")
        }
        const data = await response.json()
        setDashboardData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-400">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded p-4">
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="bg-gray-800/50 rounded p-4">
        <div className="text-gray-400">No data available.</div>
      </div>
    )
  }

  return (
    <motion.div 
      className="relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-6 text-red-500"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <motion.div 
          className="bg-gray-800/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-red-900/20 hover:border-red-500/50 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <h2 className="text-base md:text-lg font-semibold text-gray-300 mb-2">Total ZE Points</h2>
          <div className="text-3xl md:text-4xl font-bold text-red-500">
            <SimpleCounter value={dashboardData.totalPoints} />
          </div>
        </motion.div>
        <motion.div 
          className="bg-gray-800/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-red-900/20 hover:border-red-500/50 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <h2 className="text-base md:text-lg font-semibold text-gray-300 mb-2">Current Rank</h2>
          <p className="text-xl md:text-2xl font-bold text-white">{dashboardData.rank}</p>
        </motion.div>
        <motion.div 
          className="bg-gray-800/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-red-900/20 hover:border-red-500/50 transition-all sm:col-span-2 lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <h2 className="text-base md:text-lg font-semibold text-gray-300 mb-2">Badge</h2>
          <p className="text-xl md:text-2xl font-bold text-white">{dashboardData.badge}</p>
        </motion.div>
      </div>
      <motion.div 
        className="mt-6 md:mt-8 bg-gray-800/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-red-900/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-base md:text-lg font-semibold text-gray-300 mb-4">Progress to Next Rank</h2>
        <Progress value={dashboardData.progress} className="w-full h-2 md:h-3" />
        <p className="text-xs md:text-sm text-gray-400 mt-3">{dashboardData.progress}% to the next rank</p>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard