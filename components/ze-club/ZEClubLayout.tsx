"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AnimatePresence } from "framer-motion"
import PageTransition from "@/components/page-transition"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

function ZEClubLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { href: "/ze-club", label: "Dashboard" },
    { href: "/ze-club/leaderboard", label: "Leaderboard" },
    { href: "/ze-club/rewards", label: "Rewards" },
    { href: "/ze-club/missions", label: "Missions" },
    { href: "/ze-club/support", label: "Support" },
  ]

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="relative flex min-h-screen z-10 pt-16">
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-20 z-50 bg-gray-900/80 backdrop-blur-sm text-white hover:bg-red-600 hover:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 top-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900/95 backdrop-blur-sm text-white p-4 border-r border-red-900/20 overflow-y-auto z-40 transition-transform duration-300",
          isMobile && !sidebarOpen && "-translate-x-full"
        )}
      >
        <h2 className="text-2xl font-bold mb-4 text-red-500">ZE Club</h2>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "block py-2 px-4 rounded transition-all duration-200",
                    pathname === item.href
                      ? "bg-red-600 text-white"
                      : "hover:bg-gray-800 hover:text-red-400"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 p-4 md:p-8 relative z-10 transition-all duration-300",
        !isMobile && "ml-64"
      )}>
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>{children}</PageTransition>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default ZEClubLayout