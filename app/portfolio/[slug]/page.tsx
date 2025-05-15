import { CardFooter } from "@/components/ui/card"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RevealSection } from "@/components/reveal-section"
import { MasonryGallery } from "@/components/portfolio/masonry-gallery"
import { getPortfolioItemBySlug, getPortfolioItemsByCategory } from "@/lib/portfolio"

interface PortfolioDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const portfolioItem = await getPortfolioItemBySlug(params.slug)

  if (!portfolioItem) {
    return {
      title: "Project Not Found | DigiBayt",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${portfolioItem.title} | DigiBayt Portfolio`,
    description: portfolioItem.shortDescription,
  }
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const portfolioItem = await getPortfolioItemBySlug(params.slug)

  if (!portfolioItem) {
    notFound()
  }

  const relatedProjects = await getPortfolioItemsByCategory(portfolioItem.category)
  const filteredRelatedProjects = relatedProjects
    .filter((project) => project._id?.toString() !== portfolioItem._id?.toString())
    .slice(0, 3)

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  const hasGallery = portfolioItem.gallery && portfolioItem.gallery.length > 0

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Button variant="outline" size="sm" asChild>
                <Link href="/portfolio" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Portfolio
                </Link>
              </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <RevealSection>
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={portfolioItem.featuredImage || "/placeholder.svg"}
                    alt={portfolioItem.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </RevealSection>

              <RevealSection delay={100}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {portfolioItem.category}
                    </Badge>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      {portfolioItem.title}
                    </h1>
                    <p className="text-muted-foreground md:text-xl">{portfolioItem.shortDescription}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {portfolioItem.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Client:</span>
                      <span className="text-sm font-medium">{portfolioItem.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Completed:</span>
                      <span className="text-sm font-medium">{formatDate(portfolioItem.completionDate)}</span>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Project Gallery - Only show if gallery images exist */}
            {hasGallery && (
              <RevealSection className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <MasonryGallery images={portfolioItem.gallery} />
              </RevealSection>
            )}

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              <RevealSection className="lg:col-span-2">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Project Description</h2>
                    <div className="prose max-w-none dark:prose-invert">
                      <p>{portfolioItem.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">The Challenge</h2>
                    <div className="prose max-w-none dark:prose-invert">
                      <p>{portfolioItem.challenge}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Our Solution</h2>
                    <div className="prose max-w-none dark:prose-invert">
                      <p>{portfolioItem.solution}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Results</h2>
                    <div className="prose max-w-none dark:prose-invert">
                      <p>{portfolioItem.results}</p>
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={200} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Technologies Used</CardTitle>
                    <CardDescription>Tools and technologies used in this project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {portfolioItem.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {portfolioItem.testimonial?.quote && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle>Client Testimonial</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <blockquote className="border-l-4 border-primary/30 pl-4 italic">
                        "{portfolioItem.testimonial.quote}"
                      </blockquote>
                      <div className="mt-4 flex items-center gap-2">
                        <div>
                          <p className="font-medium">{portfolioItem.testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {portfolioItem.testimonial.position}, {portfolioItem.testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </RevealSection>
            </div>

            {filteredRelatedProjects.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredRelatedProjects.map((project, index) => (
                    <RevealSection key={project._id?.toString()} delay={50 * index}>
                      <Card className="overflow-hidden">
                        <div className="relative aspect-video">
                          <Image
                            src={project.featuredImage || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{project.shortDescription}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button asChild className="w-full">
                            <Link href={`/portfolio/${project.slug}`}>View Project</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </RevealSection>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
