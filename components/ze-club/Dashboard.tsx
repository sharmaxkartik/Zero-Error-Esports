"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface UserDashboard {
  totalPoints: number
  rank: string
  badge: string
  progress: number
}

// Simple animated counter without extra props
function SimpleCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startValue = 0
    const duration = 1500
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      startValue = Math.floor(easedProgress * value)
      setCount(startValue)

      if (progress === 1) clearInterval(timer)
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return <span>{count}</span>
}

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
    <div className="relative z-10">
      <h1 className="text-4xl font-bold mb-6 text-red-500">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-red-900/20 hover:border-red-500/50 transition-all">
          <h2 className="text-lg font-semibold text-gray-300 mb-2">Total ZE Points</h2>
          <div className="text-4xl font-bold text-red-500">
            <SimpleCounter value={dashboardData.totalPoints} />
          </div>
        </div>
        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-red-900/20 hover:border-red-500/50 transition-all">
          <h2 className="text-lg font-semibold text-gray-300 mb-2">Current Rank</h2>
          <p className="text-2xl font-bold text-white">{dashboardData.rank}</p>
        </div>
        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-red-900/20 hover:border-red-500/50 transition-all">
          <h2 className="text-lg font-semibold text-gray-300 mb-2">Badge</h2>
          <p className="text-2xl font-bold text-white">{dashboardData.badge}</p>
        </div>
      </div>
      <div className="mt-8 bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-red-900/20">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Progress to Next Rank</h2>
        <Progress value={dashboardData.progress} className="w-full h-3" />
        <p className="text-sm text-gray-400 mt-3">{dashboardData.progress}% to the next rank</p>
      </div>
    </div>
  )
}

export default Dashboard