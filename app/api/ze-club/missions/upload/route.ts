import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import s3Client from '@/lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import MissionSubmission from '@/models/missionSubmission'
import User from '@/models/user'
import dbConnect from '@/lib/mongodb'
import { Readable } from 'stream'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()

  const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const formData = await req.formData()
  const mission = formData.get('mission') as string
  const file = formData.get('file') as File

  if (!mission || !file) {
    return NextResponse.json(
      { error: 'Missing mission or file' },
      { status: 400 }
    )
  }

  if (file.size > 50 * 1024 * 1024) {
    return NextResponse.json(
      { error: 'File size exceeds 50MB' },
      { status: 400 }
    )
  }

  const allowedFileTypes = ['image/jpeg', 'image/png', 'video/mp4']
  if (!allowedFileTypes.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Only JPG, PNG, and MP4 are allowed.' },
      { status: 400 }
    )
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const fileStream = Readable.from(buffer)

  const fileExtension = file.name.split('.').pop()
  const fileName = `${user._id}-${mission}-${Date.now()}.${fileExtension}`
  const bucketName = process.env.AWS_S3_BUCKET_NAME!

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileStream,
    ContentType: file.type,
  })

  try {
    await s3Client.send(command)
    const fileURL = `https://${bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`

    const newSubmission = new MissionSubmission({
      userId: user._id,
      mission,
      fileURL,
      status: 'Pending',
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
