'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Plus, RefreshCw, AlertCircle } from 'lucide-react'
import MissionForm from './MissionForm'
import MissionList from './MissionList'

export default function MissionManager() {
  const [missions, setMissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('list')
  const [editingMission, setEditingMission] = useState<any>(null)

  useEffect(() => {
    fetchMissions()
  }, [])

  async function fetchMissions() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/missions/list')
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to fetch missions')
      }

      const data = await res.json()
      setMissions(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleCreateNew() {
    setEditingMission(null)
    setActiveTab('form')
  }

  function handleEdit(mission: any) {
    setEditingMission(mission)
    setActiveTab('form')
  }

  function handleFormSuccess() {
    setEditingMission(null)
    setActiveTab('list')
    fetchMissions()
  }

  function handleFormCancel() {
    setEditingMission(null)
    setActiveTab('list')
  }

  // Calculate stats
  const stats = {
    total: missions.length,
    active: missions.filter((m) => m.active).length,
    inactive: missions.filter((m) => !m.active).length,
    timeLimited: missions.filter((m) => m.isTimeLimited).length,
    featured: missions.filter((m) => m.featured).length,
    expired: missions.filter((m) => m.isExpired).length,
    maxedOut: missions.filter((m) => m.isMaxedOut).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Mission Management</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Create, edit, and manage ZE Club missions
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={fetchMissions}
            disabled={loading}
            className="flex-1 sm:flex-none"
          >
            <RefreshCw className={`h-4 w-4 sm:mr-2 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button onClick={handleCreateNew} className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">New Mission</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Missions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.active} active, {stats.inactive} inactive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Time-Limited</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.timeLimited}</div>
            <p className="text-xs text-muted-foreground">
              {stats.expired} expired
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featured}</div>
            <p className="text-xs text-muted-foreground">
              Shown at top of list
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">At Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.maxedOut}</div>
            <p className="text-xs text-muted-foreground">
              Max completions reached
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Mission List</TabsTrigger>
          <TabsTrigger value="form">
            {editingMission ? 'Edit Mission' : 'Create Mission'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          {loading && missions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  Loading missions...
                </div>
              </CardContent>
            </Card>
          ) : (
            <MissionList
              missions={missions}
              onEdit={handleEdit}
              onRefresh={fetchMissions}
            />
          )}
        </TabsContent>

        <TabsContent value="form" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {editingMission ? 'Edit Mission' : 'Create New Mission'}
              </CardTitle>
              <CardDescription>
                {editingMission
                  ? 'Update mission details and settings'
                  : 'Configure a new mission for ZE Club members'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MissionForm
                mission={editingMission}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
