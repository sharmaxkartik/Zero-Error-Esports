import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import dbConnect from "@/lib/mongodb"
import User from "@/models/user"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

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