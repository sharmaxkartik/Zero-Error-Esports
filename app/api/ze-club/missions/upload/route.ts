import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/app/api/auth/[...nextauth]/route'
import s3Client from '@/lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import MissionSubmission from '@/models/missionSubmission'
import User from '@/models/user'
import dbConnect from '@/lib/mongodb'
import { Readable } from 'stream'

// File upload constraints - can be moved to environment variables if needed
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'video/mp4']

/**
 * POST /api/ze-club/missions/upload
 * Handles mission proof file upload to AWS S3 and creates a submission record.
 * Validates file size and type before uploading.
 * Requires authentication via NextAuth session.
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  
  // Verify user authentication
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()

  // Find authenticated user in database
  const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Parse form data
  const formData = await req.formData()
  const mission = formData.get('mission') as string
  const file = formData.get('file') as File

  // Validate required fields
  if (!mission || !file) {
    return NextResponse.json(
      { error: 'Missing mission or file' },
      { status: 400 }
    )
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'File size exceeds 50MB' },
      { status: 400 }
    )
  }

  // Validate file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Only JPG, PNG, and MP4 are allowed.' },
      { status: 400 }
    )
  }

  // Convert file to buffer and stream for S3
  const buffer = Buffer.from(await file.arrayBuffer())
  const fileStream = Readable.from(buffer)

  // Generate unique filename with timestamp
  const fileExtension = file.name.split('.').pop()
  const fileName = `${user._id}-${mission}-${Date.now()}.${fileExtension}`
  const bucketName = process.env.AWS_S3_BUCKET_NAME!

  // Prepare S3 upload command
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileStream,
    ContentType: file.type,
  })

  try {
    // Upload file to S3
    await s3Client.send(command)
    const fileURL = `https://${bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`

    // Create submission record in database
    const newSubmission = new MissionSubmission({
      user: user._id,
      mission,
      proof: fileURL,
      status: 'pending',
    })

    await newSubmission.save()

    return NextResponse.json({
      message: 'File uploaded and submission created successfully',
      submission: newSubmission,
    })
  } catch (error) {
    console.error('Error uploading to S3 or saving to DB:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
