import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"
import { ShareButtons } from "@/components/blog/share-buttons"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface PostHeaderProps {
  title: string
  date?: string
  readingTime?: string
  categories?: string[]
  tags?: string[]
  author?: {
    name: string
    avatar?: string
  }
  featuredImage?: string
  url?: string
}

export function PostHeader({
  title,
  date,
  readingTime,
  categories = [],
  tags = [],
  author,
  featuredImage,
  url,
}: PostHeaderProps) {
  const category = categories && categories.length > 0 ? categories[0] : null

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {category && (
          <Link
            href={`/blog?category=${category}`}
            className="inline-block text-sm font-medium text-primary hover:underline"
          >
            {category}
          </Link>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
        {author && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{author.name}</span>
          </div>
        )}
        {date && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
        )}
        {readingTime && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        )}
      </div>

      {featuredImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <Image src={featuredImage || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        </div>
      )}

      {tags && tags.length > 0 && url && (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
          <ShareButtons title={title} url={url} />
        </div>
      )}
    </div>
  )
}
