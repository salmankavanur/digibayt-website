"use client"

import type React from "react"

import { useCallback } from "react"

export function useSmoothScroll() {
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()

    // Get the target element
    const targetElement = document.getElementById(id)

    if (targetElement) {
      // Get the header height to offset the scroll position
      const headerHeight = document.querySelector("header")?.offsetHeight || 0

      // Calculate the target position with offset
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

      // Enhanced smooth scrolling with faster response
      const startPosition = window.scrollY
      const distance = targetPosition - startPosition
      const duration = 600 // Reduced from 1000ms to 600ms for faster response
      let start: number | null = null

      // Easing function: easeOutQuint - starts faster than cubic
      const easeOutQuint = (t: number): number => {
        return 1 - Math.pow(1 - t, 5)
      }

      const animateScroll = (timestamp: number) => {
        if (!start) start = timestamp
        const elapsed = timestamp - start
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutQuint(progress)

        window.scrollTo(0, startPosition + distance * easedProgress)

        if (elapsed < duration) {
          window.requestAnimationFrame(animateScroll)
        } else {
          // Update URL without causing a page jump
          window.history.pushState(null, "", `#${id}`)

          // Set focus to the target section for accessibility
          targetElement.setAttribute("tabindex", "-1")
          targetElement.focus({ preventScroll: true })
        }
      }

      window.requestAnimationFrame(animateScroll)
    }
  }, [])

  return { scrollToSection }
}
