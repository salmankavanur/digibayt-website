import { getPublishedBlogPosts } from "@/lib/blog"
import { BlogGrid } from "@/components/blog-grid"

export const metadata = {
  title: "Blog | DigiBayt",
  description: "Latest insights, tips, and trends in web development, mobile apps, and digital marketing.",
}

export default async function BlogPage() {
  const blogPosts = await getPublishedBlogPosts()

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Our <span className="text-primary">Blog</span>
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stay updated with the latest insights, tips, and trends in web development, mobile apps, and digital
                marketing.
              </p>
            </div>
          </div>
          <BlogGrid blogPosts={blogPosts} />
        </div>
      </section>
    </main>
  )
}
