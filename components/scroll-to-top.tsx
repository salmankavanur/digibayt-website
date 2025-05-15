"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top with smooth animation
  const scrollToTop = () => {
    const startPosition = window.scrollY
    const duration = 500 // Reduced from 800ms to 500ms
    let start: number | null = null

    // Easing function: easeOutQuint - starts faster
    const easeOutQuint = (t: number): number => {
      return 1 - Math.pow(1 - t, 5)
    }

    const animateScroll = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuint(progress)

      window.scrollTo(0, startPosition * (1 - easedProgress))

      if (elapsed < duration) {
        window.requestAnimationFrame(animateScroll)
      }
    }

    window.requestAnimationFrame(animateScroll)
  }

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-gradient-to-r from-primary to-purple-600 p-0 text-white shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}
