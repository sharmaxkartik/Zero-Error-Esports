"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { UploadButton } from "@/lib/uploadthing"
import { Loader2, Upload, Video, Image as ImageIcon, Check, X } from "lucide-react"

interface HeroSettings {
  heroVideoUrl: string
  heroPosterUrl: string
  updatedAt?: string
  updatedBy?: string
}

export default function HeroMediaManager() {
  const [settings, setSettings] = useState<HeroSettings>({
    heroVideoUrl: "",
    heroPosterUrl: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [videoUploading, setVideoUploading] = useState(false)
  const [posterUploading, setPosterUploading] = useState(false)
  const { toast } = useToast()

  // Fetch current settings on mount
  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/marketing/hero")
      
      if (!response.ok) {
        throw new Error("Failed to fetch settings")
      }

      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error("Error fetching settings:", error)
      toast({
        title: "Error",
        description: "Failed to load hero media settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      setSaving(true)

      const response = await fetch("/api/admin/marketing/hero", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heroVideoUrl: settings.heroVideoUrl,
          heroPosterUrl: settings.heroPosterUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save settings")
      }

      const data = await response.json()
      setSettings(data)

      toast({
        title: "Success",
        description: "Hero media settings updated successfully",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save hero media settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  function handleClearVideo() {
    setSettings((prev) => ({ ...prev, heroVideoUrl: "" }))
  }

  function handleClearPoster() {
    setSettings((prev) => ({ ...prev, heroPosterUrl: "" }))
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hero Media Manager</CardTitle>
          <CardDescription>Manage home page hero video and fallback image</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Media Manager</CardTitle>
        <CardDescription>
          Manage home page hero video and fallback image. Changes will appear immediately after saving.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hero Video Section */}
        <div className="space-y-3">
          <Label htmlFor="heroVideo" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Hero Video (Desktop)
          </Label>
          
          <div className="space-y-2">
            <Input
              id="heroVideo"
              type="url"
              placeholder="https://utfs.io/..."
              value={settings.heroVideoUrl}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, heroVideoUrl: e.target.value }))
              }
            />
            
            <div className="flex gap-2">
              <UploadButton
                endpoint="heroMediaUploader"
                onClientUploadComplete={(res: any) => {
                  if (res?.[0]?.url) {
                    setSettings((prev) => ({ ...prev, heroVideoUrl: res[0].url }))
                    toast({
                      title: "Upload Complete",
                      description: "Video uploaded successfully",
                    })
                  }
                  setVideoUploading(false)
                }}
                onUploadError={(error: Error) => {
                  toast({
                    title: "Upload Failed",
                    description: error.message,
                    variant: "destructive",
                  })
                  setVideoUploading(false)
                }}
                onUploadBegin={() => {
                  setVideoUploading(true)
                }}
                appearance={{
                  button: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium",
                  allowedContent: "text-xs text-muted-foreground",
                }}
                content={{
                  button: videoUploading ? "Uploading..." : "Upload Video",
                  allowedContent: "MP4, WebM (max 128MB)",
                }}
              />
              
              {settings.heroVideoUrl && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearVideo}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {settings.heroVideoUrl && (
              <div className="mt-2">
                <video
                  src={settings.heroVideoUrl}
                  controls
                  className="w-full max-w-md rounded-md border"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Hero Poster Section */}
        <div className="space-y-3">
          <Label htmlFor="heroPoster" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Hero Poster Image (Mobile Fallback)
          </Label>
          
          <div className="space-y-2">
            <Input
              id="heroPoster"
              type="url"
              placeholder="https://utfs.io/..."
              value={settings.heroPosterUrl}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, heroPosterUrl: e.target.value }))
              }
            />
            
            <div className="flex gap-2">
              <UploadButton
                endpoint="heroMediaUploader"
                onClientUploadComplete={(res: any) => {
                  if (res?.[0]?.url) {
                    setSettings((prev) => ({ ...prev, heroPosterUrl: res[0].url }))
                    toast({
                      title: "Upload Complete",
                      description: "Poster image uploaded successfully",
                    })
                  }
                  setPosterUploading(false)
                }}
                onUploadError={(error: Error) => {
                  toast({
                    title: "Upload Failed",
                    description: error.message,
                    variant: "destructive",
                  })
                  setPosterUploading(false)
                }}
                onUploadBegin={() => {
                  setPosterUploading(true)
                }}
                appearance={{
                  button: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium",
                  allowedContent: "text-xs text-muted-foreground",
                }}
                content={{
                  button: posterUploading ? "Uploading..." : "Upload Image",
                  allowedContent: "JPG, PNG (max 16MB)",
                }}
              />
              
              {settings.heroPosterUrl && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearPoster}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {settings.heroPosterUrl && (
              <div className="mt-2">
                <img
                  src={settings.heroPosterUrl}
                  alt="Hero poster preview"
                  className="w-full max-w-md rounded-md border"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={saving || videoUploading || posterUploading}
            className="w-full sm:w-auto"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        {/* Last Updated Info */}
        {settings.updatedAt && (
          <div className="text-xs text-muted-foreground pt-2 border-t">
            Last updated: {new Date(settings.updatedAt).toLocaleString()}
            {settings.updatedBy && ` by ${settings.updatedBy}`}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
