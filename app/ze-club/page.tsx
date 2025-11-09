import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ZEClubLayout from "@/components/ze-club/ZEClubLayout"
import Dashboard from "@/components/ze-club/Dashboard"

export default async function ZEClubPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <ZEClubLayout>
      <Dashboard />
    </ZEClubLayout>
  )
}