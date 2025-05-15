"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  language: string
  code: string
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="relative my-6 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-muted px-4 py-2 text-sm">
        <span className="font-mono text-xs">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className={cn("p-4 overflow-x-auto bg-black text-white", language && `language-${language}`)}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
