import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface RelatedPost {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  category: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <Link href={`/blog/${post.slug}`} className="block group">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.coverImage || "/placeholder.svg?height=400&width=600&query=blog"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">
                {post.date} • {post.category}
              </div>
              <h3 className="line-clamp-2 text-lg font-bold group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
