import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Mission from '@/models/mission'

export async function GET() {
  try {
    await dbConnect()
    const missions = await Mission.find({}, '_id title')
    return NextResponse.json(missions)
  } catch (error) {
    console.error('Error fetching missions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch missions' },
      { status: 500 }
    )
  }
}
