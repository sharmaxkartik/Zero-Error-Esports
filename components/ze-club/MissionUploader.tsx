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

interface Mission {
  _id: string
  title: string
}

export default function MissionUploader() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [selectedMission, setSelectedMission] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  useEffect(() => {
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
    if (!file || !selectedMission) {
      alert('Please select a mission and a file.')
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    const mission = missions.find(m => m._id === selectedMission)
    if (!mission) {
        alert('Selected mission not found.')
        setIsUploading(false)
        return
    }

    formData.append('mission', mission._id)
    formData.append('file', file)

    try {
      const response = await fetch('/api/ze-club/missions/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('File uploaded successfully!')
        // Reset form
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
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
      </div>
      <div>
        <Label htmlFor="file">Upload Proof (JPG, PNG, MP4 - max 50MB)</Label>
        <Input
          id="file"
          type="file"
          accept="image/jpeg,image/png,video/mp4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>
      <Button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Submit Mission'}
      </Button>
    </form>
  )
}
