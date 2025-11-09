import { Schema, model, models } from 'mongoose'

const MissionSubmissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mission: {
    type: Schema.Types.ObjectId,
    ref: 'Mission',
    required: true,
  },
  fileURL: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  remarks: {
    type: String,
  },
})

const MissionSubmission =
  models.MissionSubmission ||
  model('MissionSubmission', MissionSubmissionSchema)

export default MissionSubmission
