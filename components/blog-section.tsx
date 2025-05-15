import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getPublishedBlogPosts } from "@/lib/blog"
import BlogGrid from "@/components/blog-grid"

export async function BlogSection() {
  const blogPosts = await getPublishedBlogPosts(3)

  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest from Our Blog</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay updated with the latest insights, tips, and trends in web development, mobile apps, and digital
              marketing.
            </p>
          </div>
        </div>
        {/* @ts-expect-error Server Component */}
        <BlogGrid blogPosts={blogPosts} />
        <div className="flex justify-center mt-8">
          <Button asChild size="lg">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
