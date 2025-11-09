
import { NextResponse } from 'next/server'
import { auth } from '@/app/api/auth/[...nextauth]/route'
import MissionSubmission from '@/models/missionSubmission'
import User from '@/models/user'
import Mission from '@/models/mission'
import dbConnect from '@/lib/mongodb'
import { revalidatePath } from 'next/cache'

/**
 * Rank thresholds - defines the points required for each rank.
 * Users automatically progress through ranks as they accumulate points.
 * TODO: Consider moving these to environment variables or database for easier management.
 */
const ranks = [
  { name: 'Rookie', points: 0 },
  { name: 'Bronze', points: 500 },
  { name: 'Silver', points: 1000 },
  { name: 'Gold', points: 5000 },
  { name: 'Platinum', points: 10000 },
  { name: 'Diamond', points: 20000 },
]

/**
 * Updates a user's rank based on their current points.
 * Checks against the ranks array and assigns the highest rank the user qualifies for.
 */
async function updateUserRank(user: any) {
  let newRank = user.rank
  
  // Find the highest rank the user qualifies for
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (user.points >= ranks[i].points) {
      newRank = ranks[i].name
      break
    }
  }

  // Only save if rank actually changed
  if (newRank !== user.rank) {
    user.rank = newRank
    await user.save()
  }
}

/**
 * PATCH /api/admin/submissions/verify
 * Admin endpoint to approve or reject mission submissions.
 * On approval, awards points to the user and updates their rank.
 * Requires admin role in the session.
 */
export async function PATCH(req: Request) {
  const session = await auth()

  // Verify admin authentication
  if (!session || !session.user.roles.includes('admin')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  await dbConnect()

  try {
    const { submissionId, status } = await req.json()

    // Validate status value
    if (!['approved', 'rejected'].includes(status)) {
      return new NextResponse('Invalid status', { status: 400 })
    }

    // Find the submission
    const submission = await MissionSubmission.findById(submissionId)

    if (!submission) {
      return new NextResponse('Submission not found', { status: 404 })
    }

    // Update submission status
    submission.status = status
    await submission.save()

    // If approved, award points to the user
    if (status === 'approved') {
      const user = await User.findById(submission.user)
      const mission = await Mission.findById(submission.mission)

      if (user && mission) {
        // Add mission points to user's total
        user.points += mission.points
        
        // Check and update user's rank based on new points
        await updateUserRank(user)
        
        await user.save()
      }
    }

    // Revalidate the leaderboard page to show updated data
    revalidatePath('/ze-club/leaderboard')

    return NextResponse.json({ message: 'Submission status updated successfully' })
  } catch (error) {
    console.error('Error updating submission status:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
