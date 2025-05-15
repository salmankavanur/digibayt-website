import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RevealSection } from "@/components/reveal-section"
import type { PortfolioItem } from "@/models/Portfolio"

interface PortfolioGridProps {
  portfolioItems: PortfolioItem[]
}

// Named export
export function PortfolioGrid({ portfolioItems }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
      {portfolioItems.length > 0 ? (
        portfolioItems.map((item, index) => (
          <RevealSection key={item._id?.toString()} delay={50 * (index % 3)} className="flex">
            <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.featuredImage || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader className="flex-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {item.category}
                  </Badge>
                  {item.featured && (
                    <Badge variant="secondary" className="bg-amber-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2">{item.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-muted">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="secondary" className="bg-muted">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/portfolio/${item.slug}`}>View Project</Link>
                </Button>
              </CardFooter>
            </Card>
          </RevealSection>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No portfolio items found.</p>
        </div>
      )}
    </div>
  )
}

// Default export (same component)
export default PortfolioGrid
