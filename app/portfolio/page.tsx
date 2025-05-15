import { getAllPortfolioItems } from "@/lib/portfolio"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "Portfolio | DigiBayt",
  description: "Explore our portfolio of web development, mobile app, and digital marketing projects.",
}

export default async function PortfolioPage() {
  const portfolioItems = await getAllPortfolioItems()

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Our <span className="text-primary">Portfolio</span>
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our diverse range of projects showcasing our expertise in web development, mobile apps,
                  digital marketing, and more.
                </p>
              </div>
            </div>
            <PortfolioGrid portfolioItems={portfolioItems} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
