"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface RevealSectionProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  distance?: number
}

export function RevealSection({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 600, // Reduced from 800ms to 600ms
  threshold = 0.1,
  distance = 30, // Reduced from 50px to 30px for less dramatic movement
}: RevealSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold,
    delay,
  })

  // Set transform based on direction
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up":
          return `translateY(${distance}px)`
        case "down":
          return `translateY(-${distance}px)`
        case "left":
          return `translateX(${distance}px)`
        case "right":
          return `translateX(-${distance}px)`
        default:
          return `translateY(${distance}px)`
      }
    }
    return "translate(0, 0)"
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      {children}
    </div>
  )
}
