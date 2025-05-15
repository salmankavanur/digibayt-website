interface TocItem {
  id: string
  text: string
  level: number
}

export function generateTOC(markdown: string): TocItem[] {
  try {
    if (!markdown) {
      return []
    }

    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const toc: TocItem[] = []
    let match

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length
      const text = match[2].trim()

      // Skip if level is too deep (h4, h5, h6)
      if (level > 3) continue

      // Generate an ID from the heading text
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

      toc.push({ id, text, level })
    }

    return toc
  } catch (error) {
    console.error("Error generating table of contents:", error)
    return []
  }
}
