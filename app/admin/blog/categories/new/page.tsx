import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { CategoryForm } from "@/components/admin/category-form"

export default async function NewCategoryPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Category</h1>
      <CategoryForm />
    </div>
  )
}
