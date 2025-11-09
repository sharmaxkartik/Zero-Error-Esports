'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmissionVerifier from '@/components/admin/SubmissionVerifier'
import { motion } from 'framer-motion'

export default function AdminZEClubPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has access by trying to fetch submissions
    async function checkAccess() {
      try {
        const res = await fetch('/api/admin/submissions')
        if (res.status === 401 || res.status === 403) {
          router.push('/login')
        } else if (res.ok) {
          setIsAuthorized(true)
        }
      } catch (error) {
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }
    checkAccess()
  }, [router])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <motion.div 
      className="container mx-auto py-4 md:py-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-2xl md:text-3xl font-bold mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Admin - ZE Club Mission Verification
      </motion.h1>
      <SubmissionVerifier />
    </motion.div>
  )
}
