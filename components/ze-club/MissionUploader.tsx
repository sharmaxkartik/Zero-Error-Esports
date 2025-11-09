'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface Mission {
  _id: string
  title: string
}

/**
 * MissionUploader Component
 * Allows users to upload proof for completed missions.
 * Handles file validation, S3 upload via API, and submission tracking.
 */
export default function MissionUploader() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [selectedMission, setSelectedMission] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Fetch available missions on component mount
    async function fetchMissions() {
      try {
        const response = await fetch('/api/ze-club/missions')
        if (response.ok) {
          const fetchedMissions = await response.json()
          setMissions(fetchedMissions)
        } else {
          console.error('Failed to fetch missions')
        }
      } catch (error) {
        console.error('Error fetching missions:', error)
      }
    }
    fetchMissions()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    // Validate form inputs
    if (!file || !selectedMission) {
      alert('Please select a mission and a file.')
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    
    // Find selected mission details
    const mission = missions.find(m => m._id === selectedMission)
    if (!mission) {
        alert('Selected mission not found.')
        setIsUploading(false)
        return
    }

    // Prepare form data for upload
    formData.append('mission', mission._id)
    formData.append('file', file)

    try {
      // Upload to API endpoint (handles S3 upload and DB record)
      const response = await fetch('/api/ze-club/missions/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('File uploaded successfully!')
        // Reset form state
        setSelectedMission('')
        setFile(null)
        // Refresh the page to show the new submission
        router.refresh()
      } else {
        const errorData = await response.json()
        alert(`Upload failed: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('An unexpected error occurred during upload.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Label htmlFor="mission">Select Mission</Label>
        <Select
          value={selectedMission}
          onValueChange={setSelectedMission}
          required
        >
          <SelectTrigger id="mission">
            <SelectValue placeholder="Select a mission" />
          </SelectTrigger>
          <SelectContent>
            {missions.map((mission) => (
              <SelectItem key={mission._id} value={mission._id}>
                {mission.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Label htmlFor="file">Upload Proof (JPG, PNG, MP4 - max 50MB)</Label>
        <Input
          id="file"
          type="file"
          accept="image/jpeg,image/png,video/mp4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Submit Mission'}
        </Button>
      </motion.div>
    </motion.form>
  )
}
