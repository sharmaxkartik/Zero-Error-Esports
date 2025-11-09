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
  roles: string[]
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  image: { type: String },
  emailVerified: { type: Date },
  discordId: { type: String, unique: true, sparse: true },
  zeClubId: { type: String, unique: true, sparse: true },
  points: { type: Number, default: 100 },
  rank: { type: String, default: 'Rookie' },
  roles: { type: [String], default: ['user'] },
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
