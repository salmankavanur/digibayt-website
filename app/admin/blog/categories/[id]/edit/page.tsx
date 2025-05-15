import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { CategoryForm } from "@/components/admin/category-form"
import { getCategoryById } from "@/models/Category"

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const category = await getCategoryById(params.id)

  if (!category) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Category</h1>
      <CategoryForm initialData={category} isEditing />
    </div>
  )
}
