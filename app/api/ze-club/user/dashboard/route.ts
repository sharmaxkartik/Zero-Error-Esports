import { NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import dbConnect from "@/lib/mongodb"
import User from "@/models/user"

/**
 * GET /api/ze-club/user/dashboard
 * Fetches the user's ZE Club dashboard data including points, rank, badge, and progress.
 * Requires authentication via NextAuth session.
 */
export async function GET() {
  const session = await auth()

  // Verify user authentication
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    
    // Fetch user from database
    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Prepare dashboard data
    const dashboardData = {
      totalPoints: user.points,
      rank: user.rank,
      badge: user.badge,
      progress: user.progress,
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Error fetching user dashboard data:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}