"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface MasonryGalleryProps {
  images: string[]
  columns?: number
}

export function MasonryGallery({ images, columns = 3 }: MasonryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!images || images.length === 0) {
    return null
  }

  // Create column arrays
  const columnArrays: string[][] = Array.from({ length: columns }, () => [])

  // Distribute images across columns
  images.forEach((image, index) => {
    const columnIndex = index % columns
    columnArrays[columnIndex].push(image)
  })

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {columnArrays.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((image, imageIndex) => (
              <div
                key={`${columnIndex}-${imageIndex}`}
                className="relative overflow-hidden rounded-lg border border-border cursor-pointer transition-all hover:shadow-lg"
                onClick={() => setSelectedImage(image)}
              >
                <div className={cn("relative", imageIndex % 2 === 0 ? "aspect-[4/3]" : "aspect-square")}>
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Project image ${columnIndex * columns + imageIndex + 1}`}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
          <div className="relative w-full h-[80vh]">
            {selectedImage && (
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Gallery image"
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
