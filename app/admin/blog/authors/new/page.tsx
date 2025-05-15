import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { AuthorForm } from "@/components/admin/author-form"

export default async function NewAuthorPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Author</h1>
      <AuthorForm />
    </div>
  )
}
