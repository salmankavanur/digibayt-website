"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, Folder, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import FileUpload from "@/components/admin/file-upload"

interface MediaFile {
  id: string
  name: string
  path: string
  url: string
  bucket: string
  metadata?: {
    size?: number
    mimetype?: string
    lastModified?: string
    isDir?: boolean
  }
}

interface MediaSelectorProps {
  onSelect: (url: string) => void
  currentValue?: string
  bucket?: string
}

export default function MediaSelector({ onSelect, currentValue, bucket = "media" }: MediaSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPath, setCurrentPath] = useState("")
  const [currentBucket, setCurrentBucket] = useState(bucket)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState<"browse" | "upload">("browse")
  const [previewUrl, setPreviewUrl] = useState(currentValue || "")

  const fetchMediaFiles = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/media?bucket=${currentBucket}&path=${currentPath}&search=${searchQuery}&showAll=true`,
      )
      if (!response.ok) {
        throw new Error("Failed to fetch media files")
      }
      const data = await response.json()

      // Filter to only show images
      const imageFiles = data.filter(
        (file: MediaFile) => file.metadata?.mimetype?.startsWith("image/") && !file.metadata?.isDir,
      )

      setMediaFiles(imageFiles)
      setFilteredFiles(imageFiles)
    } catch (error) {
      console.error("Error fetching media files:", error)
      toast({
        title: "Error",
        description: "Failed to load media files",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchMediaFiles()
    }
  }, [isOpen, currentPath, currentBucket])

  useEffect(() => {
    // Filter files based on search query
    if (searchQuery) {
      const filtered = mediaFiles.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredFiles(filtered)
    } else {
      setFilteredFiles(mediaFiles)
    }
  }, [searchQuery, mediaFiles])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSelect = (file: MediaFile) => {
    onSelect(file.url)
    setPreviewUrl(file.url)
    setIsOpen(false)
  }

  const navigateToFolder = (folder: MediaFile) => {
    setCurrentPath(folder.path)
  }

  const navigateUp = () => {
    const pathParts = currentPath.split("/")
    pathParts.pop()
    setCurrentPath(pathParts.join("/"))
  }

  const handleUpload = async (url: string) => {
    setUploadDialogOpen(false)
    await fetchMediaFiles()
    onSelect(url)
    setPreviewUrl(url)
    setIsOpen(false)
    toast({
      title: "Success",
      description: "File uploaded and selected successfully",
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div
          className="border rounded-md overflow-hidden w-full h-32 flex items-center justify-center bg-muted cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {previewUrl ? (
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Selected media"
              className="max-w-full max-h-full object-contain"
              onError={() => setPreviewUrl("")}
            />
          ) : (
            <div className="flex flex-col items-center text-muted-foreground">
              <Image className="h-10 w-10 mb-2" />
              <span>No image selected</span>
            </div>
          )}
        </div>
      </div>
      <Button type="button" variant="outline" className="w-full" onClick={() => setIsOpen(true)}>
        Select Media
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Media</DialogTitle>
          </DialogHeader>

          <Tabs
            defaultValue="browse"
            value={selectedTab}
            onValueChange={(v) => setSelectedTab(v as "browse" | "upload")}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="browse">Browse Media</TabsTrigger>
              <TabsTrigger value="upload">Upload New</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search media..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                {currentPath && (
                  <Button variant="outline" size="sm" onClick={navigateUp}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No images found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="group relative overflow-hidden rounded-md border bg-background cursor-pointer"
                      onClick={() => (file.metadata?.isDir ? navigateToFolder(file) : handleSelect(file))}
                    >
                      <div className="aspect-square relative flex items-center justify-center bg-muted">
                        {file.metadata?.isDir ? (
                          <div className="flex flex-col items-center">
                            <Folder className="h-12 w-12 text-muted-foreground" />
                            <span className="text-sm mt-1">{file.name}</span>
                          </div>
                        ) : (
                          <img
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                        )}
                      </div>
                      <div className="p-2">
                        <p className="truncate text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.bucket}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upload">
              <div className="py-4">
                <FileUpload onUpload={handleUpload} bucket={currentBucket} path={currentPath} accept="image/*" />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
