import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name?: string
  email?: string
  image?: string
  emailVerified?: Date
  discordId: string
  zeClubId: string
  points: number
  rank: string
  badge: string
  progress: number
  roles: string[]
  // Phase 1: Valorant-style rank system
  rankIcon: string
  progressToNextRank: number
  nextRankPoints: number
  currentRankPoints: number
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  image: { type: String },
  emailVerified: { type: Date },
  discordId: { type: String, unique: true, sparse: true },
  zeClubId: { type: String, unique: true, sparse: true },
  points: { type: Number, default: 0 },
  rank: { type: String, default: 'Rookie' },
  badge: { type: String, default: '🥉' },
  progress: { type: Number, default: 0 },
  roles: { type: [String], default: ['user'] },
  // Phase 1: Valorant-style rank system
  rankIcon: { type: String, default: '/images/ranks/rookie.svg' },
  progressToNextRank: { type: Number, default: 0 },
  nextRankPoints: { type: Number, default: 500 },
  currentRankPoints: { type: Number, default: 0 },
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
