import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RevealSection } from "@/components/reveal-section"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { ShareButtons } from "@/components/blog/share-buttons"
import { AuthorBio } from "@/components/blog/author-bio"
import { PostNavigation } from "@/components/blog/post-navigation"
import { RelatedPosts } from "@/components/blog/related-posts"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog"
import { getAuthorById } from "@/models/Author"
import { generateTOC } from "@/utils/generate-toc"
import ReactMarkdown from "react-markdown"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug, true)

  if (!post) {
    return {
      title: "Post Not Found | DigiBayt Blog",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | DigiBayt Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      images: [{ url: post.seo?.ogImage || post.featuredImage }],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  console.log(`Attempting to fetch blog post with slug: ${params.slug}`)

  try {
    // Pass true to include unpublished posts when logged in as admin
    const post = await getBlogPostBySlug(params.slug, true)

    if (!post) {
      console.log(`Blog post not found for slug: ${params.slug}`)
      notFound()
    }

    console.log(`Successfully fetched blog post: ${post.title}`)

    // Fetch author information if authorId exists
    let author = null
    try {
      if (post.authorId) {
        author = await getAuthorById(post.authorId.toString())
      }
    } catch (error) {
      console.error("Error fetching author:", error)
    }

    // Create a default author object if author is not found
    const authorData = author
      ? {
          name: author.name,
          title: author.title || "Content Writer",
          avatar: author.avatar || "/diverse-group.png",
          bio: author.bio || "Author at DigiBayt",
          social: {
            twitter: author.twitter,
            linkedin: author.linkedin,
            website: author.website,
          },
        }
      : {
          name: "Unknown Author",
          title: "Content Writer",
          avatar: "/diverse-group.png",
          bio: "Author at DigiBayt",
          social: {},
        }

    // Get related posts with error handling
    let relatedPosts = []
    try {
      relatedPosts = await getRelatedBlogPosts(post, 3)
    } catch (error) {
      console.error("Error fetching related posts:", error)
    }

    // Format date helper function
    const formatDate = (dateString: string | Date | null) => {
      if (!dateString) return ""

      try {
        return new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      } catch (error) {
        console.error("Error formatting date:", error)
        return ""
      }
    }

    // Map related posts to the format expected by RelatedPosts component
    const formattedRelatedPosts = relatedPosts.map((relatedPost) => ({
      id: relatedPost._id?.toString() || "",
      slug: relatedPost.slug,
      title: relatedPost.title,
      excerpt: relatedPost.excerpt,
      coverImage: relatedPost.featuredImage,
      date: formatDate(relatedPost.publishedAt),
      category:
        relatedPost.categories && relatedPost.categories.length > 0 ? relatedPost.categories[0] : "Uncategorized",
    }))

    // Generate table of contents with error handling
    let toc = []
    try {
      toc = generateTOC(post.content || "")
    } catch (error) {
      console.error("Error generating table of contents:", error)
    }

    // Ensure categories and tags are arrays
    const categories = Array.isArray(post.categories) ? post.categories : []
    const tags = Array.isArray(post.tags) ? post.tags : []

    return (
      <main className="flex-1">
        <article className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                {categories.length > 0 && (
                  <Link
                    href={`/blog?category=${categories[0]}`}
                    className="inline-block text-sm font-medium text-primary hover:underline"
                  >
                    {categories[0]}
                  </Link>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>{authorData.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-2">
                    <span>{post.readTime} min read</span>
                  </div>
                )}
              </div>
            </div>

            {post.featuredImage && (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg my-8">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="grid gap-10 lg:grid-cols-12">
              <RevealSection className="lg:col-span-8">
                <div className="prose max-w-none dark:prose-invert">
                  <ReactMarkdown>{post.content || ""}</ReactMarkdown>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-muted">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-8">
                  <ShareButtons
                    title={post.title}
                    url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://digibayt.com"}/blog/${post.slug}`}
                  />
                </div>

                <div className="mt-12 border-t pt-8">
                  <AuthorBio author={authorData} />
                </div>

                <div className="mt-12 border-t pt-8">
                  <PostNavigation currentSlug={post.slug} />
                </div>
              </RevealSection>

              <RevealSection delay={100} className="space-y-8 lg:col-span-4">
                <div className="sticky top-20">
                  {toc.length > 0 && <TableOfContents toc={toc} />}
                  <div className="mt-8">
                    <NewsletterSignup />
                  </div>
                </div>
              </RevealSection>
            </div>

            {formattedRelatedPosts.length > 0 && (
              <RevealSection delay={200} className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                <RelatedPosts posts={formattedRelatedPosts} />
              </RevealSection>
            )}
          </div>
        </article>
      </main>
    )
  } catch (error) {
    console.error("Error rendering blog post:", error)
    notFound()
  }
}
