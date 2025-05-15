"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface SimpleToastProps {
  message: string
  type?: "success" | "error" | "info"
  duration?: number
  onClose?: () => void
}

export function SimpleToast({ message, type = "success", duration = 3000, onClose }: SimpleToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg text-white ${bgColor} flex items-center justify-between min-w-[300px]`}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false)
          if (onClose) onClose()
        }}
        className="ml-4 text-white hover:text-gray-200"
      >
        <X size={18} />
      </button>
    </div>
  )
}
