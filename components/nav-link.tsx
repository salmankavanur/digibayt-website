"use client"

import type React from "react"

import Link from "next/link"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const { scrollToSection } = useSmoothScroll()

  // Check if the link is a hash link (internal navigation)
  const isHashLink = href.startsWith("#")

  // If it's a hash link, use smooth scrolling
  if (isHashLink) {
    const id = href.substring(1) // Remove the # from the href

    return (
      <a 
        href={href} 
        className={className} 
        onClick={(e) => {
          scrollToSection(e, id);
          if (onClick) onClick();
        }}
      >
        {children}
      </a>
    )
  }

  // Otherwise, use regular Next.js Link
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
