"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatFileSize, getFileType, formatDate } from "@/lib/utils"
import FileUpload from "@/components/admin/file-upload"
import { Upload, FolderPlus, Search, Grid3X3, List, ArrowLeft, MoreHorizontal, Download, Trash2 } from "lucide-react"

interface MediaFile {
  id: string
  name: string
  metadata?: {
    size?: number
    mimetype?: string
    lastModified?: string
    isDir?: boolean
  }
  path: string
  url: string
  bucket: string
}

export default function MediaClient() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPath, setCurrentPath] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentBucket, setCurrentBucket] = useState("media")
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([])
  const [selectedFileType, setSelectedFileType] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [fileDetailsOpen, setFileDetailsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [showAllFiles, setShowAllFiles] = useState(true)
  const [buckets, setBuckets] = useState<string[]>([])

  const fetchMediaFiles = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/media?bucket=${currentBucket}&path=${currentPath}&search=${searchQuery}&showAll=${showAllFiles}`,
      )
      if (!response.ok) {
        throw new Error("Failed to fetch media files")
      }
      const data = await response.json()
      console.log("Fetched media files:", data)
      setMediaFiles(data)
      setFilteredFiles(data)

      // Extract unique buckets
      const uniqueBuckets = Array.from(new Set(data.map((file: MediaFile) => file.bucket)))
      setBuckets(uniqueBuckets)
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
  }, [currentBucket, currentPath, searchQuery, showAllFiles])

  useEffect(() => {
    fetchMediaFiles()
  }, [fetchMediaFiles])

  useEffect(() => {
    // Filter files based on file type and current bucket
    let filtered = mediaFiles

    // Filter by file type
    if (selectedFileType !== "all") {
      filtered = filtered.filter((file) => {
        if (selectedFileType === "images") {
          return file.metadata?.mimetype?.startsWith("image/")
        } else if (selectedFileType === "documents") {
          return (
            file.metadata?.mimetype?.includes("pdf") ||
            file.metadata?.mimetype?.includes("doc") ||
            file.metadata?.mimetype?.includes("xls") ||
            file.metadata?.mimetype?.includes("ppt") ||
            file.metadata?.mimetype?.includes("txt")
          )
        } else if (selectedFileType === "folders") {
          return file.metadata?.isDir
        }
        return true
      })
    }

    // Filter by current bucket if not showing all
    if (!showAllFiles) {
      filtered = filtered.filter((file) => file.bucket === currentBucket)
    }

    setFilteredFiles(filtered)
  }, [mediaFiles, selectedFileType, currentBucket, showAllFiles])

  const handleUpload = async (url: string) => {
    setUploadDialogOpen(false)
    await fetchMediaFiles()
    toast({
      title: "Success",
      description: "File uploaded successfully",
    })
  }

  const handleDeleteFile = async (file: MediaFile) => {
    if (confirm(`Are you sure you want to delete ${file.name}?`)) {
      try {
        const response = await fetch("/api/media/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bucket: file.bucket,
            path: file.path,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to delete file")
        }

        toast({
          title: "Success",
          description: "File deleted successfully",
        })

        await fetchMediaFiles()
      } catch (error) {
        console.error("Error deleting file:", error)
        toast({
          title: "Error",
          description: "Failed to delete file",
          variant: "destructive",
        })
      }
    }
  }

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Error",
        description: "Folder name cannot be empty",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/media/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bucket: currentBucket,
          path: currentPath,
          folderName: newFolderName.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create folder")
      }

      setNewFolderName("")
      setNewFolderDialogOpen(false)
      toast({
        title: "Success",
        description: "Folder created successfully",
      })

      await fetchMediaFiles()
    } catch (error) {
      console.error("Error creating folder:", error)
      toast({
        title: "Error",
        description: "Failed to create folder",
        variant: "destructive",
      })
    }
  }

  const navigateToFolder = (folder: MediaFile) => {
    setCurrentPath(folder.path)
    setCurrentBucket(folder.bucket)
  }

  const navigateUp = () => {
    const pathParts = currentPath.split("/")
    pathParts.pop()
    setCurrentPath(pathParts.join("/"))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const showFileDetails = (file: MediaFile) => {
    setSelectedFile(file)
    setFileDetailsOpen(true)
  }

  // Fixed renderFileIcon function to properly display image previews
  const renderFileIcon = (file: MediaFile) => {
    if (file.metadata?.isDir) {
      return <div className="text-4xl">📁</div>
    }

    const fileType = getFileType(file.metadata?.mimetype || "")

    if (fileType === "image") {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={file.url || "/placeholder.svg"}
            alt={file.name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              console.error("Image failed to load:", file.url)
              e.currentTarget.src = "/placeholder.svg"
            }}
          />
        </div>
      )
    }

    switch (fileType) {
      case "pdf":
        return <div className="text-4xl">📄</div>
      case "document":
        return <div className="text-4xl">📝</div>
      case "spreadsheet":
        return <div className="text-4xl">📊</div>
      case "presentation":
        return <div className="text-4xl">📑</div>
      case "archive":
        return <div className="text-4xl">🗄️</div>
      case "audio":
        return <div className="text-4xl">🎵</div>
      case "video":
        return <div className="text-4xl">🎬</div>
      case "text":
        return <div className="text-4xl">📋</div>
      default:
        return <div className="text-4xl">📄</div>
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <div className="flex gap-2">
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
          <Button variant="outline" onClick={() => setNewFolderDialogOpen(true)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      {currentPath && (
        <div className="mb-4">
          <Button variant="outline" size="sm" onClick={navigateUp}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {currentPath.split("/").slice(0, -1).pop() || "Root"}
          </Button>
          <div className="mt-2 text-sm text-muted-foreground">
            Current path: {currentBucket}/{currentPath || "Root"}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search media..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className="space-y-1">
              <Button
                variant={selectedFileType === "all" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedFileType("all")}
              >
                <div className="mr-2">📁</div>
                All Media
              </Button>
              <Button
                variant={selectedFileType === "images" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedFileType("images")}
              >
                <div className="mr-2">🖼️</div>
                Images
              </Button>
              <Button
                variant={selectedFileType === "documents" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedFileType("documents")}
              >
                <div className="mr-2">📄</div>
                Documents
              </Button>
              <Button
                variant={selectedFileType === "folders" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedFileType("folders")}
              >
                <div className="mr-2">📁</div>
                Folders
              </Button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Buckets</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showAllFiles"
                    checked={showAllFiles}
                    onChange={(e) => setShowAllFiles(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="showAllFiles" className="text-sm">
                    Show All
                  </label>
                </div>
              </div>
              <div className="space-y-1">
                {buckets.map((bucket) => (
                  <Button
                    key={bucket}
                    variant={currentBucket === bucket ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setCurrentBucket(bucket)
                      setCurrentPath("")
                    }}
                  >
                    {bucket}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">{filteredFiles.length} items</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue={viewMode} value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
                <TabsList className="hidden">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>

                <TabsContent value="grid" className="mt-0">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : filteredFiles.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No files found</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredFiles.map((file) => (
                        <div key={file.id} className="group relative overflow-hidden rounded-md border bg-background">
                          <div
                            className="aspect-square relative flex items-center justify-center bg-muted cursor-pointer"
                            onClick={() => (file.metadata?.isDir ? navigateToFolder(file) : showFileDetails(file))}
                          >
                            {renderFileIcon(file)}
                          </div>
                          <div className="p-2">
                            <p className="truncate text-sm font-medium">{file.name}</p>
                            <div className="flex justify-between">
                              <p className="text-xs text-muted-foreground">
                                {file.metadata?.isDir ? "Folder" : formatFileSize(file.metadata?.size || 0)}
                              </p>
                              <p className="text-xs text-muted-foreground">{file.bucket}</p>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!file.metadata?.isDir && (
                                  <DropdownMenuItem asChild>
                                    <a href={file.url} download target="_blank" rel="noopener noreferrer">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </a>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => handleDeleteFile(file)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    navigator.clipboard.writeText(file.url)
                                    toast({
                                      title: "URL Copied",
                                      description: "File URL copied to clipboard",
                                    })
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4"
                                  >
                                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                  </svg>
                                  Copy URL
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="list" className="mt-0">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : filteredFiles.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No files found</p>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium border-b">
                        <div className="col-span-4">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2">Bucket</div>
                        <div className="col-span-1">Modified</div>
                        <div className="col-span-1"></div>
                      </div>
                      {filteredFiles.map((file) => (
                        <div
                          key={file.id}
                          className="grid grid-cols-12 gap-2 p-4 text-sm items-center hover:bg-muted/50"
                        >
                          <div className="col-span-4 flex items-center gap-2">
                            <div className="h-10 w-10 rounded-md overflow-hidden flex items-center justify-center bg-muted">
                              {file.metadata?.isDir ? (
                                <div className="text-xl">📁</div>
                              ) : file.metadata?.mimetype?.startsWith("image/") ? (
                                <img
                                  src={file.url || "/placeholder.svg"}
                                  alt={file.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    console.error("Image failed to load:", file.url)
                                    e.currentTarget.src = "/placeholder.svg"
                                  }}
                                />
                              ) : (
                                <div className="text-xl">
                                  {getFileType(file.metadata?.mimetype || "") === "pdf" && "📄"}
                                  {getFileType(file.metadata?.mimetype || "") === "document" && "📝"}
                                  {getFileType(file.metadata?.mimetype || "") === "spreadsheet" && "📊"}
                                  {getFileType(file.metadata?.mimetype || "") === "presentation" && "📑"}
                                  {getFileType(file.metadata?.mimetype || "") === "archive" && "🗄️"}
                                  {getFileType(file.metadata?.mimetype || "") === "audio" && "🎵"}
                                  {getFileType(file.metadata?.mimetype || "") === "video" && "🎬"}
                                  {getFileType(file.metadata?.mimetype || "") === "text" && "📋"}
                                  {getFileType(file.metadata?.mimetype || "") === "file" && "📄"}
                                </div>
                              )}
                            </div>
                            <span
                              className="truncate cursor-pointer hover:text-primary"
                              onClick={() => (file.metadata?.isDir ? navigateToFolder(file) : showFileDetails(file))}
                            >
                              {file.name}
                            </span>
                          </div>
                          <div className="col-span-2">
                            {file.metadata?.isDir
                              ? "Folder"
                              : getFileType(file.metadata?.mimetype || "")
                                  .charAt(0)
                                  .toUpperCase() + getFileType(file.metadata?.mimetype || "").slice(1)}
                          </div>
                          <div className="col-span-2">
                            {file.metadata?.isDir ? "Folder" : formatFileSize(file.metadata?.size || 0)}
                          </div>
                          <div className="col-span-2">{file.bucket}</div>
                          <div className="col-span-1">{formatDate(file.metadata?.lastModified)}</div>
                          <div className="col-span-1 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!file.metadata?.isDir && (
                                  <DropdownMenuItem asChild>
                                    <a href={file.url} download target="_blank" rel="noopener noreferrer">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </a>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => handleDeleteFile(file)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    navigator.clipboard.writeText(file.url)
                                    toast({
                                      title: "URL Copied",
                                      description: "File URL copied to clipboard",
                                    })
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4"
                                  >
                                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                  </svg>
                                  Copy URL
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>Enter a name for the new folder.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folderName" className="text-right">
                Folder Name
              </Label>
              <Input
                id="folderName"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="col-span-3"
                placeholder="my-folder"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder}>Create Folder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>Select a file to upload to the current directory.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <FileUpload onUpload={handleUpload} bucket={currentBucket} path={currentPath} accept="*" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File Details Dialog */}
      <Dialog open={fileDetailsOpen} onOpenChange={setFileDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>
          {selectedFile && (
            <div className="py-4">
              <div className="flex flex-col items-center mb-4">
                {selectedFile.metadata?.mimetype?.startsWith("image/") ? (
                  <div className="w-full h-48 relative mb-4 flex items-center justify-center">
                    <img
                      src={selectedFile.url || "/placeholder.svg"}
                      alt={selectedFile.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        console.error("Image failed to load:", selectedFile.url)
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-6xl mb-4">
                    {getFileType(selectedFile.metadata?.mimetype || "") === "pdf" && "📄"}
                    {getFileType(selectedFile.metadata?.mimetype || "") === "document" && "📝"}
                    {getFileType(selectedFile.metadata?.mimetype || "") === "spreadsheet" && "📊"}
                    {getFileType(selectedFile.metadata?.mimetype || "") === "presentation" && "📑"}
                    {getFileType(selectedFile.metadata?.mimetype || "") === "archive" && "🗄️"}
                    {getFileType(selectedFile.metadata?.mimetype || "") === "audio" && "🎵"}
                    {getFileType(selectedFile.metadata?.mimetype || "") === "video" && "🎬"}
                    {getFileType(selectedFile.metadata?.mimetype || "") === "text" && "📋"}
                    {getFileType(selectedFile.metadata?.mimetype || "") === "file" && "📄"}
                  </div>
                )}
                <h3 className="text-lg font-medium">{selectedFile.name}</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>
                    {getFileType(selectedFile.metadata?.mimetype || "")
                      .charAt(0)
                      .toUpperCase() + getFileType(selectedFile.metadata?.mimetype || "").slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{formatFileSize(selectedFile.metadata?.size || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bucket:</span>
                  <span>{selectedFile.bucket}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last modified:</span>
                  <span>{formatDate(selectedFile.metadata?.lastModified)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Path:</span>
                  <span className="truncate max-w-[250px]">{selectedFile.path}</span>
                </div>
                {selectedFile.metadata?.mimetype && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MIME type:</span>
                    <span>{selectedFile.metadata.mimetype}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">URL:</span>
                  <span className="truncate max-w-[250px]">
                    <a
                      href={selectedFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {selectedFile.url}
                    </a>
                  </span>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteFile(selectedFile)
                    setFileDetailsOpen(false)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedFile.url)
                      toast({
                        title: "URL Copied",
                        description: "File URL copied to clipboard",
                      })
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    Copy URL
                  </Button>
                  <Button asChild>
                    <a href={selectedFile.url} download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
