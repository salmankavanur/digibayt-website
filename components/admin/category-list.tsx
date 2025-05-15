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
import type { Category } from "@/models/Category"

interface CategoryListProps {
  initialCategories: Category[]
}

export function CategoryList({ initialCategories }: CategoryListProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/blog/categories/${deleteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete category")
      }

      setCategories(categories.filter((category) => category._id !== deleteId))
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting category:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete category",
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
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your blog categories</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No categories found</h3>
              <p className="text-muted-foreground mt-2">
                {searchTerm ? "Try a different search term" : "Create your first category to get started"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCategories.map((category) => (
                <div key={category._id?.toString()} className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">Slug: {category.slug}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild disabled={category.slug === "uncategorized"}>
                      <Link href={`/admin/blog/categories/${category._id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(category._id?.toString())}
                      disabled={category.slug === "uncategorized"}
                    >
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
              This will permanently delete this category. This action cannot be undone.
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
