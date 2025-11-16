'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmissionVerifier from '@/components/admin/SubmissionVerifier'
import HeroMediaManager from '@/components/admin/HeroMediaManager'
import EventManager from '@/components/admin/EventManager'
import AnnouncementManager from '@/components/admin/AnnouncementManager'
import MissionManager from '@/components/admin/MissionManager'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { Shield, Zap, Video, Calendar, ListChecks, Megaphone, Target } from 'lucide-react'

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
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Zap className="h-12 w-12 text-red-500 animate-pulse" />
          <p className="text-lg text-gray-400">Loading admin panel...</p>
        </motion.div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg shadow-red-500/50">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 text-sm md:text-base">ZE Club Mission Verification Center</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="video" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8 bg-zinc-900 border border-zinc-700">
                <TabsTrigger value="video" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
                  <Video className="h-4 w-4" />
                  Background Video
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
                  <Calendar className="h-4 w-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="mission-management" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
                  <Target className="h-4 w-4" />
                  Mission Management
                </TabsTrigger>
                <TabsTrigger value="missions" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
                  <ListChecks className="h-4 w-4" />
                  Submissions
                </TabsTrigger>
                <TabsTrigger value="announcements" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
                  <Megaphone className="h-4 w-4" />
                  Announcements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="space-y-4">
                <HeroMediaManager />
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                <EventManager />
              </TabsContent>

              <TabsContent value="mission-management" className="space-y-4">
                <MissionManager />
              </TabsContent>

              <TabsContent value="missions" className="space-y-4">
                <SubmissionVerifier />
              </TabsContent>

              <TabsContent value="announcements" className="space-y-4">
                <AnnouncementManager />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
