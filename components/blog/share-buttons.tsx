"use client"

import { useState } from "react"
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  // Use a fallback URL if not provided
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
    )
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Share:</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={shareOnTwitter}>
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share on Twitter</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={shareOnFacebook}>
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share on Facebook</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={shareOnLinkedIn}>
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share on LinkedIn</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={handleCopyLink}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
              <span className="sr-only">Copy link</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{copied ? "Copied!" : "Copy link"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
