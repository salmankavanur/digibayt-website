import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        The blog post you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/blog">Return to Blog</Link>
      </Button>
    </div>
  )
}
