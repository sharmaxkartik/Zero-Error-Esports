import { Schema, model, models } from 'mongoose'

const MissionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
})

const Mission = models.Mission || model('Mission', MissionSchema)

export default Mission
