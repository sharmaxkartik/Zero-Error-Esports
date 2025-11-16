import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongodb'
import Mission from '@/models/mission'

export async function POST(req: NextRequest) {
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
    
    // Validate required fields
    if (!data.name || !data.description || !data.points || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate endDate if daysAvailable is provided
    let endDate = data.endDate
    if (data.isTimeLimited && data.daysAvailable && !endDate) {
      const now = new Date()
      endDate = new Date(now.getTime() + data.daysAvailable * 24 * 60 * 60 * 1000)
    }

    const mission = await Mission.create({
      ...data,
      endDate,
      createdBy: session.user.id,
      currentCompletions: 0,
    })

    return NextResponse.json(mission, { status: 201 })
  } catch (error) {
    console.error('Error creating mission:', error)
    return NextResponse.json(
      { error: 'Failed to create mission' },
      { status: 500 }
    )
  }
}
