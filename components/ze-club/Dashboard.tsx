"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { TrendingUp, Award, Star, Zap, Target, Clock, Trophy, Medal } from "lucide-react"
import { Card } from "@/components/ui/card"

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
        <motion.div 
          className="text-xl text-gray-400 flex items-center gap-3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Zap className="h-6 w-6 text-red-500" />
          Loading your stats...
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div 
        className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-red-400 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          <span>Error: {error}</span>
        </div>
      </motion.div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
        <div className="text-gray-400">No data available.</div>
      </div>
    )
  }

  const achievements = [
    { icon: Trophy, label: "Total Points", value: dashboardData.totalPoints, gradient: "from-yellow-500 to-orange-600" },
    { icon: Medal, label: "Current Rank", value: dashboardData.rank, gradient: "from-purple-500 to-pink-600" },
    { icon: Star, label: "Badge", value: dashboardData.badge, gradient: "from-blue-500 to-cyan-600" },
  ]

  return (
    <motion.div 
      className="relative z-10 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
          Welcome Back, Champion! 🎮
        </h1>
        <p className="text-gray-400 text-lg">Here's your gaming performance overview</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {achievements.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative group"
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-xl p-6 shadow-2xl hover:shadow-red-500/20 transition-all duration-300">
                {/* Gradient overlay */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-400 mb-2">{stat.label}</h3>
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {typeof stat.value === 'number' ? (
                      <SimpleCounter value={stat.value} />
                    ) : (
                      stat.value
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Progress Section */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {/* Rank Progress */}
        <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-orange-600">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Progress to Next Rank</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Current: {dashboardData.rank}</span>
              <span className="text-red-400 font-semibold">{dashboardData.progress}%</span>
            </div>
            
            <div className="relative">
              <Progress 
                value={dashboardData.progress} 
                className="h-4 bg-gray-700/50"
              />
              <motion.div
                className="absolute inset-0 h-4 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-red-600 opacity-50 blur-sm"
                initial={{ width: "0%" }}
                animate={{ width: `${dashboardData.progress}%` }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              Keep completing missions to level up! 🚀
            </p>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 transition-colors">
              <div className="p-2 rounded-full bg-green-500/20">
                <Zap className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">Mission Completed</p>
                <p className="text-xs text-gray-400">+50 points earned</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 transition-colors">
              <div className="p-2 rounded-full bg-blue-500/20">
                <Award className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">Rank Updated</p>
                <p className="text-xs text-gray-400">You're climbing!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 transition-colors">
              <div className="p-2 rounded-full bg-yellow-500/20">
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">New Rewards Available</p>
                <p className="text-xs text-gray-400">Check rewards tab</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard