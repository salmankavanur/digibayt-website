import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { TagForm } from "@/components/admin/tag-form"

export default async function NewTagPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Tag</h1>
      <TagForm />
    </div>
  )
}
