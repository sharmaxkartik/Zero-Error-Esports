import MissionUploader from '@/components/ze-club/MissionUploader'
import { Suspense } from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongodb'
import User from '@/models/user'
import MissionSubmission from '@/models/missionSubmission'
import Mission from '@/models/mission'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PopulatedSubmission {
  _id: string
  mission: {
    _id: string
    title: string
  }
  fileURL: string
  status: string
  submittedAt: Date
  remarks?: string
}

async function UserSubmissions() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return <p>Please log in to see your submissions.</p>
  }

  await dbConnect()
  const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return <p>User not found.</p>
  }

  const submissions: PopulatedSubmission[] = await MissionSubmission.find({
    userId: user._id,
  })
    .populate({ path: 'mission', model: Mission, select: 'title' })
    .sort({ submittedAt: -1 })

  if (submissions.length === 0) {
    return <p>You have no submissions yet.</p>
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card key={submission._id}>
          <CardHeader>
            <CardTitle>{submission.mission.title}</CardTitle>
            <CardDescription>
              Submitted on:{' '}
              {new Date(submission.submittedAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <a
                href={submission.fileURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Submission
              </a>
              <Badge
                variant={
                  submission.status === 'Approved'
                    ? 'default'
                    : submission.status === 'Rejected'
                    ? 'destructive'
                    : 'outline'
                }
              >
                {submission.status}
              </Badge>
            </div>
            {submission.remarks && (
              <p className="text-sm text-gray-500 mt-2">
                Remarks: {submission.remarks}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function MissionsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Missions</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upload Mission</h2>
        <Suspense fallback={<div>Loading uploader...</div>}>
          <MissionUploader />
        </Suspense>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">My Submissions</h2>
        <Suspense fallback={<div>Loading submissions...</div>}>
          <UserSubmissions />
        </Suspense>
      </div>
    </div>
  )
}
