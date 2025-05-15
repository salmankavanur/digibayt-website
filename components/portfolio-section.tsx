import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/reveal-section"
import { getFeaturedPortfolioItems } from "@/lib/portfolio"
import { ArrowRight, Star } from "lucide-react"

export async function PortfolioSection() {
  const portfolioItems = await getFeaturedPortfolioItems(3)

  return (
    <section id="portfolio" className="relative w-full py-12 md:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl dark:from-blue-500/5 dark:to-purple-500/5" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-primary/10 to-teal-500/10 blur-3xl dark:from-primary/5 dark:to-teal-500/5" />
      </div>
      <div className="container px-4 md:px-6">
        <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Star className="mr-1 h-3.5 w-3.5" />
              <span>Our Work</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Take a look at some of our recent projects and see how we've helped businesses achieve their digital
              goals.
            </p>
          </div>
        </RevealSection>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.length > 0
            ? portfolioItems.map((item, index) => (
                <RevealSection
                  key={item._id?.toString() || index}
                  delay={50 * (index + 1)}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-purple-600/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
                  <Image
                    src={item.featuredImage || "/placeholder.svg?height=400&width=600&query=project"}
                    width={400}
                    height={300}
                    alt={item.title}
                    className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                      {item.category}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 translate-y-4 transition-transform duration-500 delay-150 group-hover:translate-y-0"
                      asChild
                    >
                      <Link href={`/portfolio/${item.slug}`}>
                        View Project
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </RevealSection>
              ))
            : // Fallback for when no portfolio items are available
              Array.from({ length: 3 }).map((_, index) => (
                <RevealSection
                  key={index}
                  delay={50 * (index + 1)}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <div className="aspect-video bg-muted/50 animate-pulse rounded-xl"></div>
                </RevealSection>
              ))}
        </div>
        <RevealSection delay={400} className="flex justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <Link href="/portfolio">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </RevealSection>
      </div>
    </section>
  )
}
