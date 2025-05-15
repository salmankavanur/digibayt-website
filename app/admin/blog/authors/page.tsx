import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { getAllAuthors } from "@/models/Author"
import { AuthorList } from "@/components/admin/author-list"

export default async function AuthorsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const authors = await getAllAuthors()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Authors</h1>
        <Button asChild>
          <Link href="/admin/blog/authors/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Author
          </Link>
        </Button>
      </div>

      <AuthorList initialAuthors={authors} />
    </div>
  )
}
