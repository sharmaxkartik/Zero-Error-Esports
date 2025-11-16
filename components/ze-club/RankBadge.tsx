"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RankBadgeProps {
  rank: string
  rankIcon: string
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  animated?: boolean
}

/**
 * RankBadge Component
 * Displays a rank badge with icon and optional label
 * Features smooth animations and tooltips for enhanced UX
 */
function RankBadge({ 
  rank, 
  rankIcon, 
  size = "md", 
  showLabel = true,
  animated = true 
}: RankBadgeProps) {
  const sizeClasses = {
    sm: { container: "w-12 h-12", text: "text-xs", image: 48 },
    md: { container: "w-20 h-20", text: "text-sm", image: 80 },
    lg: { container: "w-32 h-32", text: "text-lg", image: 128 },
  }

  const { container, text, image } = sizeClasses[size]

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Rookie":
        return "from-amber-800 to-amber-950"
      case "Bronze":
        return "from-orange-700 to-amber-900"
      case "Silver":
        return "from-gray-300 to-gray-500"
      case "Gold":
        return "from-yellow-400 to-orange-500"
      case "Platinum":
        return "from-cyan-400 to-blue-500"
      case "Diamond":
        return "from-blue-400 to-purple-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  const getRankGlow = (rank: string) => {
    const glows = {
      Rookie: "shadow-amber-800/50",
      Bronze: "shadow-orange-600/50",
      Silver: "shadow-gray-400/50",
      Gold: "shadow-yellow-500/70",
      Platinum: "shadow-cyan-500/70",
      Diamond: "shadow-blue-500/80",
    }
    return glows[rank as keyof typeof glows] || "shadow-gray-500/50"
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
            animate={animated ? { scale: 1, opacity: 1 } : undefined}
            whileHover={animated ? { scale: 1.1, rotate: [0, -5, 5, 0] } : undefined}
            transition={animated ? {
              type: "spring",
              stiffness: 200,
              damping: 15
            } : undefined}
          >
            {/* Rank Icon */}
            <div className={`relative ${container}`}>
              {/* Glow effect for higher ranks */}
              {["Gold", "Platinum", "Diamond"].includes(rank) && (
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${getRankColor(rank)} opacity-40 blur-xl ${getRankGlow(rank)}`}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              
              <div className="relative w-full h-full">
                <Image
                  src={rankIcon}
                  alt={`${rank} rank badge`}
                  width={image}
                  height={image}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Rank Label */}
            {showLabel && (
              <motion.div
                className={`font-bold ${text} bg-gradient-to-r ${getRankColor(rank)} bg-clip-text text-transparent`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {rank}
              </motion.div>
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-900 border-gray-700">
          <p className="font-semibold">{rank} Rank</p>
          <p className="text-xs text-gray-400">Keep grinding to level up!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default RankBadge
