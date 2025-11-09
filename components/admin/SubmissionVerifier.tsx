
'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface Submission {
  _id: string
  user: {
    name: string
    email: string
  }
  mission: {
    name: string
    points: number
  }
  proof: string
  status: string
}

export default function SubmissionVerifier() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchSubmissions() {
    try {
      const res = await fetch('/api/admin/submissions')
      if (res.ok) {
        const data = await res.json()
        setSubmissions(data)
      } else {
        toast.error('Failed to fetch submissions')
      }
    } catch (error) {
      toast.error('An error occurred while fetching submissions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  async function handleVerification(submissionId: string, status: 'approved' | 'rejected') {
    try {
      const res = await fetch('/api/admin/submissions/verify', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId, status }),
      })

      if (res.ok) {
        toast.success(`Submission ${status}`)
        fetchSubmissions() // Refresh the list
      } else {
        const errorData = await res.json()
        toast.error(errorData.message || `Failed to ${status} submission`)
      }
    } catch (error) {
      toast.error(`An error occurred while ${status}ing the submission`)
    }
  }

  if (loading) {
    return <div>Loading submissions...</div>
  }

  return (
    <motion.div 
      className="rounded-md border overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">User</TableHead>
            <TableHead className="min-w-[120px]">Mission</TableHead>
            <TableHead className="min-w-[80px]">Proof</TableHead>
            <TableHead className="min-w-[80px]">Status</TableHead>
            <TableHead className="min-w-[180px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.length > 0 ? (
            submissions.map((submission, index) => (
              <motion.tr
                key={submission._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <TableCell>
                  <div className="font-medium text-sm">{submission.user.name}</div>
                  <div className="text-xs text-muted-foreground break-all">{submission.user.email}</div>
                </TableCell>
                <TableCell className="text-sm">{submission.mission.name}</TableCell>
                <TableCell>
                  <a
                    href={submission.proof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View
                  </a>
                </TableCell>
                <TableCell>
                  <Badge variant={submission.status === 'pending' ? 'secondary' : 'default'} className="text-xs">
                    {submission.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVerification(submission._id, 'approved')}
                      className="text-xs"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleVerification(submission._id, 'rejected')}
                      className="text-xs"
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-sm">
                No pending submissions.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  )
}
