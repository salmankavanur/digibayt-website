"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Edit, Trash2, AlertCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import type { Author } from "@/models/Author"

interface AuthorListProps {
  initialAuthors: Author[]
}

export function AuthorList({ initialAuthors }: AuthorListProps) {
  const router = useRouter()
  const [authors, setAuthors] = useState<Author[]>(initialAuthors)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredAuthors = authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/blog/authors/${deleteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete author")
      }

      setAuthors(authors.filter((author) => author._id !== deleteId))
      toast({
        title: "Success",
        description: "Author deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting author:", error)
      toast({
        title: "Error",
        description: "Failed to delete author",
        variant: "destructive",
      })
    } finally {
      setDeleteId(null)
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="mb-6">
        <Input
          placeholder="Search authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Authors</CardTitle>
          <CardDescription>Manage your blog authors</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAuthors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No authors found</h3>
              <p className="text-muted-foreground mt-2">
                {searchTerm ? "Try a different search term" : "Create your first author to get started"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAuthors.map((author) => (
                <div key={author._id?.toString()} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    {author.avatar ? (
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={author.avatar || "/placeholder.svg"}
                          alt={author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{author.name}</h3>
                      {author.email && <p className="text-sm text-muted-foreground">{author.email}</p>}
                      <p className="text-sm text-muted-foreground line-clamp-1 max-w-md">{author.bio}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/blog/authors/${author._id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setDeleteId(author._id?.toString())}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this author. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
