import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { AuthorForm } from "@/components/admin/author-form"
import { getAuthorById } from "@/models/Author"

interface EditAuthorPageProps {
  params: {
    id: string
  }
}

export default async function EditAuthorPage({ params }: EditAuthorPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const author = await getAuthorById(params.id)

  if (!author) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Author</h1>
      <AuthorForm initialData={author} isEditing />
    </div>
  )
}
