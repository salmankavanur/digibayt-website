"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Edit, Trash2, AlertCircle } from "lucide-react"
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
import type { Tag } from "@/models/Tag"

interface TagListProps {
  initialTags: Tag[]
}

export function TagList({ initialTags }: TagListProps) {
  const router = useRouter()
  const [tags, setTags] = useState<Tag[]>(initialTags)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/blog/tags/${deleteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete tag")
      }

      setTags(tags.filter((tag) => tag._id !== deleteId))
      toast({
        title: "Success",
        description: "Tag deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting tag:", error)
      toast({
        title: "Error",
        description: "Failed to delete tag",
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
          placeholder="Search tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>Manage your blog tags</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTags.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No tags found</h3>
              <p className="text-muted-foreground mt-2">
                {searchTerm ? "Try a different search term" : "Create your first tag to get started"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTags.map((tag) => (
                <div key={tag._id?.toString()} className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">{tag.name}</h3>
                    {tag.description && <p className="text-sm text-muted-foreground mt-1">{tag.description}</p>}
                    <p className="text-xs text-muted-foreground mt-1">Slug: {tag.slug}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/blog/tags/${tag._id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setDeleteId(tag._id?.toString())}>
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
              This will permanently delete this tag. This action cannot be undone.
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
