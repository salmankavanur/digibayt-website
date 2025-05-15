"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  toc: TOCItem[]
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (!toc || toc.length === 0) return

    const headingElements = toc.map((item) => document.getElementById(item.id)).filter(Boolean)

    if (headingElements.length === 0) return

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -80% 0px",
    })

    headingElements.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => {
      headingElements.forEach((element) => {
        if (element) observer.unobserve(element)
      })
    }
  }, [toc])

  if (!toc || toc.length === 0) return null

  return (
    <div className="space-y-2 mb-8">
      <h3 className="font-medium">Table of Contents</h3>
      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}>
            <a
              href={`#${item.id}`}
              className={cn(
                "inline-block hover:text-primary transition-colors py-1",
                activeId === item.id ? "text-primary font-medium" : "text-muted-foreground",
              )}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                })
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
