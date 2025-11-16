import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongodb'
import Mission from '@/models/mission'

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user || !session.user.roles?.includes('admin')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    const data = await req.json()
    const { missionId, ...updates } = data
    
    if (!missionId) {
      return NextResponse.json(
        { error: 'Mission ID required' },
        { status: 400 }
      )
    }

    // Calculate endDate if daysAvailable is provided
    if (updates.isTimeLimited && updates.daysAvailable && !updates.endDate) {
      const startDate = updates.startDate ? new Date(updates.startDate) : new Date()
      updates.endDate = new Date(startDate.getTime() + updates.daysAvailable * 24 * 60 * 60 * 1000)
    }

    const mission = await Mission.findByIdAndUpdate(
      missionId,
      updates,
      { new: true, runValidators: false }
    )

    if (!mission) {
      return NextResponse.json(
        { error: 'Mission not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(mission)
  } catch (error) {
    console.error('Error updating mission:', error)
    return NextResponse.json(
      { error: 'Failed to update mission' },
      { status: 500 }
    )
  }
}
