import Image from "next/image"
import Link from "next/link"
import { Twitter, Linkedin, Globe } from "lucide-react"

interface AuthorProps {
  author: {
    name: string
    title: string
    avatar: string
    bio: string
    social?: {
      twitter?: string
      github?: string
      linkedin?: string
      website?: string
    }
  }
}

export function AuthorBio({ author }: AuthorProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-muted/50 rounded-lg">
      <div className="relative h-24 w-24 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={author.avatar || "/placeholder.svg?height=96&width=96&query=avatar"}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold">{author.name}</h3>
          <p className="text-muted-foreground">{author.title}</p>
        </div>
        <p>{author.bio}</p>
        {author.social && (
          <div className="flex gap-2">
            {author.social.twitter && (
              <Link
                href={
                  author.social.twitter.startsWith("http")
                    ? author.social.twitter
                    : `https://twitter.com/${author.social.twitter}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            )}
            {author.social.linkedin && (
              <Link
                href={
                  author.social.linkedin.startsWith("http")
                    ? author.social.linkedin
                    : `https://linkedin.com/in/${author.social.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            )}
            {author.social.website && (
              <Link
                href={
                  author.social.website.startsWith("http") ? author.social.website : `https://${author.social.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
