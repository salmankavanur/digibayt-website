import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { getAllTags } from "@/models/Tag"
import { TagList } from "@/components/admin/tag-list"

export default async function TagsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const tags = await getAllTags()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Tags</h1>
        <Button asChild>
          <Link href="/admin/blog/tags/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Tag
          </Link>
        </Button>
      </div>

      <TagList initialTags={tags} />
    </div>
  )
}
