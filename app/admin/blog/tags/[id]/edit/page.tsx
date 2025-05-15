import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { TagForm } from "@/components/admin/tag-form"
import { getTagById } from "@/models/Tag"

interface EditTagPageProps {
  params: {
    id: string
  }
}

export default async function EditTagPage({ params }: EditTagPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const tag = await getTagById(params.id)

  if (!tag) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Tag</h1>
      <TagForm initialData={tag} isEditing />
    </div>
  )
}
