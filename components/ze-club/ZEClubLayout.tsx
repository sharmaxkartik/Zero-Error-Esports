"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import PageTransition from "@/components/page-transition"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Menu, X, LayoutDashboard, Trophy, Gift, Target, HeadphonesIcon, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

function ZEClubLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: session } = useSession()
  const [userPoints, setUserPoints] = useState(0)

  useEffect(() => {
    async function fetchUserPoints() {
      try {
        const response = await fetch("/api/ze-club/user/dashboard")
        if (response.ok) {
          const data = await response.json()
          setUserPoints(data.totalPoints || 0)
        }
      } catch (error) {
        console.error("Failed to fetch user points:", error)
      }
    }
    fetchUserPoints()
  }, [])

  const navItems = [
    { href: "/ze-club", label: "Dashboard", icon: LayoutDashboard },
    { href: "/ze-club/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/ze-club/rewards", label: "Rewards", icon: Gift },
    { href: "/ze-club/missions", label: "Missions", icon: Target },
    { href: "/ze-club/support", label: "Support", icon: HeadphonesIcon },
  ]

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="relative flex min-h-screen z-10">
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-14 z-50 bg-gradient-to-r from-red-600 to-red-700 backdrop-blur-sm text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 top-14"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-72 backdrop-blur-xl text-white p-6 border-r border-red-500/30 overflow-y-auto z-40 transition-all duration-300",
          isMobile && !sidebarOpen && "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-red-500 to-red-700 p-2 rounded-lg shadow-lg shadow-red-500/50">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
              ZE Club
            </h2>
          </div>
          <p className="text-xs text-gray-400 ml-14">Your Gaming Hub</p>
        </div>

        {/* User Profile Card */}
        {session?.user && (
          <motion.div 
            className="mb-6 p-4 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-red-500/30 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-red-500 to-orange-600 p-2 rounded-full">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{session.user.name}</p>
                <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
              <span className="text-xs text-gray-400">Total Points</span>
              <span className="text-lg font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {userPoints}
              </span>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <motion.li 
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 relative overflow-hidden",
                      isActive
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/50"
                        : "hover:bg-gray-800/60 hover:text-red-400 text-gray-300"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className={cn(
                      "h-5 w-5 relative z-10 transition-transform duration-200",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"
                    )} />
                    <span className="relative z-10 font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="ml-auto relative z-10"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </Link>
                </motion.li>
              )
            })}
          </ul>
        </nav>

        {/* Footer Info */}
        <div className="mt-auto pt-6 border-t border-gray-800/50">
          <div className="text-xs text-gray-500 space-y-1">
            <p>💡 Complete missions to earn points</p>
            <p>🏆 Climb the leaderboard</p>
            <p>🎁 Redeem exclusive rewards</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 p-4 md:p-8 relative z-10 transition-all duration-300 min-h-screen",
        !isMobile && "ml-72"
      )}>
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>{children}</PageTransition>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default ZEClubLayout