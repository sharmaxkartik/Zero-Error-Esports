'use client'

import { useState } from 'react'
import EventForm from './EventForm'
import { EventList } from './EventList'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

function EventManager() {
  const [editingEvent, setEditingEvent] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  function handleEdit(event) {
    setEditingEvent(event)
    setIsFormOpen(true)
  }

  function handleCancel() {
    setEditingEvent(null)
    setIsFormOpen(false)
  }

  function handleSuccess() {
    setEditingEvent(null)
    setIsFormOpen(false)
    setRefreshTrigger((prev) => prev + 1)
  }

  function handleCreateNew() {
    setEditingEvent(null)
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-6">
      {isFormOpen ? (
        <EventForm
          event={editingEvent}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Manage Events</h2>
            <Button onClick={handleCreateNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Event
            </Button>
          </div>
          <EventList onEdit={handleEdit} refreshTrigger={refreshTrigger} />
        </>
      )}
    </div>
  )
}

export default EventManager
