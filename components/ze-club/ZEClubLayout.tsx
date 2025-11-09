"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AnimatePresence } from "framer-motion"
import PageTransition from "@/components/page-transition"

function ZEClubLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { href: "/ze-club", label: "Dashboard" },
    { href: "/ze-club/leaderboard", label: "Leaderboard" },
    { href: "/ze-club/rewards", label: "Rewards" },
    { href: "/ze-club/missions", label: "Missions" },
    { href: "/ze-club/support", label: "Support" },
  ]

  return (
    <div className="relative flex min-h-screen z-10 pt-16">
      <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900/95 backdrop-blur-sm text-white p-4 border-r border-red-900/20 overflow-y-auto z-20">
        <h2 className="text-2xl font-bold mb-4 text-red-500">ZE Club</h2>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
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
      <main className="flex-1 ml-64 p-8 relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>{children}</PageTransition>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default ZEClubLayout