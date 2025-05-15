"use client"

import { useState } from "react"
import FileUpload from "@/components/admin/file-upload"

interface MediaUploadWrapperProps {
  bucket?: string
  path?: string
  onUploadComplete?: (url: string) => void
}

export default function MediaUploadWrapper({ bucket = "media", path = "", onUploadComplete }: MediaUploadWrapperProps) {
  const [uploadedUrl, setUploadedUrl] = useState("")

  const handleUpload = (url: string) => {
    setUploadedUrl(url)
    if (onUploadComplete) {
      onUploadComplete(url)
    }
  }

  return <FileUpload onUpload={handleUpload} bucket={bucket} path={path} accept="*" />
}
