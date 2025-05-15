"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Upload, X } from "lucide-react"

interface FileUploadProps {
  onUpload: (url: string) => void
  bucket: string
  path: string
  accept?: string
}

export default function FileUpload({ onUpload, bucket, path, accept = "*" }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClientComponentClient()

  const handleUpload = async (file: File) => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Create the file path
      const filePath = path ? `${path}/${file.name}` : file.name

      // Upload the file with progress tracking
      const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
        onUploadProgress: (progress) => {
          const percent = Math.round((progress.loaded / progress.total) * 100)
          setUploadProgress(percent)
        },
      })

      if (error) {
        throw error
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded.`,
      })

      onUpload(publicUrlData.publicUrl)
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0])
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const cancelUpload = () => {
    setIsUploading(false)
    setUploadProgress(0)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
        dragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
        disabled={isUploading}
      />

      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        {isUploading ? (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Uploading...</span>
              <Button variant="ghost" size="sm" onClick={cancelUpload}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Progress value={uploadProgress} className="h-2 w-full" />
            <span className="text-xs text-muted-foreground">{uploadProgress}%</span>
          </div>
        ) : (
          <>
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Drag and drop a file here, or click to select</p>
              <p className="text-xs text-muted-foreground mt-1">Upload a file to the {path || "root"} directory</p>
            </div>
            <Button type="button" onClick={handleButtonClick} disabled={isUploading}>
              Select File
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
