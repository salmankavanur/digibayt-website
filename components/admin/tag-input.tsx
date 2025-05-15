"use client"

import type React from "react"

import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagInputProps {
  placeholder?: string
  tags: string[]
  setTags: (tags: string[]) => void
  maxTags?: number
}

export function TagInput({ placeholder = "Add tag...", tags, setTags, maxTags = 10 }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault()

      if (tags.length >= maxTags) {
        return
      }

      // Don't add duplicate tags
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()])
      }

      setInputValue("")
    }
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="border rounded-md p-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </Badge>
        ))}
      </div>
      <Input
        type="text"
        placeholder={tags.length < maxTags ? placeholder : `Maximum ${maxTags} tags reached`}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8"
        disabled={tags.length >= maxTags}
      />
    </div>
  )
}
