import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PostNavigationProps {
  prevPost?: {
    slug: string
    title: string
  }
  nextPost?: {
    slug: string
    title: string
  }
  currentSlug?: string
}

export function PostNavigation({ prevPost, nextPost, currentSlug }: PostNavigationProps) {
  // If we don't have specific posts, just show generic navigation
  if (!prevPost && !nextPost) {
    return (
      <div className="flex justify-between items-center py-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex justify-between items-center py-6">
      {prevPost ? (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/blog/${prevPost.slug}`} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="line-clamp-1">{prevPost.title}</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextPost && (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/blog/${nextPost.slug}`} className="flex items-center gap-2">
            <span className="line-clamp-1">{nextPost.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  )
}
