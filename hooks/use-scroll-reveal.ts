"use client"

import { useEffect, useRef, useState } from "react"

type RevealOptions = {
  threshold?: number
  rootMargin?: string
  delay?: number
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", delay = 0 } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay) {
            setTimeout(() => setIsVisible(true), delay)
          } else {
            setIsVisible(true)
          }
          // Once revealed, stop observing
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [threshold, rootMargin, delay])

  return { ref, isVisible }
}
