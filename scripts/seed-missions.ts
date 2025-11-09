import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import dbConnect from '../lib/mongodb'
import Mission from '../models/mission'

const missions = [
  {
    title: 'First Blood',
    description: 'Get the first kill in any game.',
    points: 100,
  },
  {
    title: 'Ace in the Hole',
    description: 'Get 5 kills in a single round of Valorant or CS:GO.',
    points: 500,
  },
  {
    title: 'Clutch Master',
    description: 'Win a 1v3 situation in any battle royale game.',
    points: 1000,
  },
  {
    title: 'Victory Royale',
    description: 'Win a game of Fortnite or similar battle royale.',
    points: 250,
  },
  {
    title: 'Headshot King',
    description: 'Accumulate 50 headshots in a week.',
    points: 750,
  },
]

async function seedMissions() {
  try {
    await dbConnect()
    console.log('Connected to database.')

    // Using updateOne with upsert to avoid creating duplicates
    for (const missionData of missions) {
      await Mission.updateOne(
        { title: missionData.title },
        { $set: missionData },
        { upsert: true }
      )
      console.log(`Upserted mission: ${missionData.title}`)
    }

    console.log('Missions seeded successfully!')
  } catch (error) {
    console.error('Error seeding missions:', error)
  } finally {
    // Mongoose connection will be closed automatically by the runtime
    process.exit()
  }
}

seedMissions()
