import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { getAllCategories } from "@/models/Category"
import { CategoryList } from "@/components/admin/category-list"

export default async function CategoriesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const categories = await getAllCategories()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Categories</h1>
        <Button asChild>
          <Link href="/admin/blog/categories/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <CategoryList initialCategories={categories} />
    </div>
  )
}
