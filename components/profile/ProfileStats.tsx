'use client'

import { Trophy, Target, Gift, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface ProfileStatsProps {
  stats: {
    completedMissions: number
    pendingMissions: number
    totalPoints: number
    leaderboardPosition: number
  }
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    {
      icon: Trophy,
      label: 'Leaderboard Rank',
      value: `#${stats.leaderboardPosition}`,
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-500/10 to-yellow-600/5',
      borderColor: 'border-yellow-500/30',
      iconBg: 'bg-yellow-500/10',
    },
    {
      icon: Target,
      label: 'Completed Missions',
      value: stats.completedMissions,
      color: 'text-emerald-400',
      bgGradient: 'from-emerald-500/10 to-emerald-600/5',
      borderColor: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500/10',
    },
    {
      icon: TrendingUp,
      label: 'Pending Missions',
      value: stats.pendingMissions,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/30',
      iconBg: 'bg-blue-500/10',
    },
    {
      icon: Gift,
      label: 'Total Points',
      value: stats.totalPoints.toLocaleString(),
      color: 'text-red-400',
      bgGradient: 'from-red-500/10 to-red-600/5',
      borderColor: 'border-red-500/30',
      iconBg: 'bg-red-500/10',
    },
  ]

  return (
    <Card className="border-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Performance Statistics</CardTitle>
        <p className="text-sm text-gray-400 mt-1">Your ZE Club achievements and progress</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`bg-gradient-to-br ${item.bgGradient} rounded-xl p-5 border ${item.borderColor} hover:border-opacity-50 transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`${item.iconBg} p-3 rounded-lg`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
