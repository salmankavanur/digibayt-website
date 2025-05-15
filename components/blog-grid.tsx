import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RevealSection } from "@/components/reveal-section"
import type { BlogPost } from "@/models/Blog"

interface BlogGridProps {
  blogPosts: BlogPost[]
}

// Named export
export function BlogGrid({ blogPosts }: BlogGridProps) {
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return ""

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.length > 0 ? (
        blogPosts.map((post, index) => (
          <RevealSection key={post._id?.toString() || index} delay={50 * (index % 3)} className="flex">
            <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.featuredImage || "/placeholder.svg?height=400&width=600&query=blog"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.categories &&
                    post.categories.slice(0, 2).map((category) => (
                      <Badge key={category} variant="outline" className="bg-primary/10 text-primary">
                        {category}
                      </Badge>
                    ))}
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{post.authorName || "Unknown Author"}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{post.readTime || "5"} min read</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          </RevealSection>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )}
    </div>
  )
}

// Default export (same component)
export default BlogGrid
