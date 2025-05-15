import { Suspense } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryList } from "@/components/admin/portfolio-category-list"

export const metadata = {
  title: "Portfolio Categories | DigiBayt Admin",
  description: "Manage portfolio categories for DigiBayt website",
}

export default function PortfolioCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Categories</h1>
        <p className="text-muted-foreground">
          Manage categories for your portfolio projects. Categories help organize your work.
        </p>
      </div>

      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/portfolio/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Category
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading categories...</div>}>
        <CategoryList type="portfolio" />
      </Suspense>
    </div>
  )
}
