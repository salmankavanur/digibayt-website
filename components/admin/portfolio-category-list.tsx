"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

interface Category {
  _id: string
  name: string
  slug: string
  description?: string
}

interface CategoryListProps {
  type: "blog" | "portfolio"
}

export function CategoryList({ type }: CategoryListProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const apiEndpoint = type === "blog" ? "/api/blog/categories" : "/api/portfolio/categories"

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(apiEndpoint)

      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} categories`)
      }

      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error(`Error fetching ${type} categories:`, error)
      toast({
        title: "Error",
        description: `Failed to load ${type} categories`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!categoryToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`${apiEndpoint}/${categoryToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete ${type} category`)
      }

      setCategories(categories.filter((category) => category._id !== categoryToDelete))
      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} category deleted successfully`,
      })
    } catch (error) {
      console.error(`Error deleting ${type} category:`, error)
      toast({
        title: "Error",
        description: `Failed to delete ${type} category`,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setCategoryToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-4 text-muted-foreground">
            <p>No categories found. Create your first category!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "blog" ? "Blog Categories" : "Portfolio Categories"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category._id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description || "No description"}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/${type}/categories/${category._id}/edit`}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the category and remove it from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          setCategoryToDelete(category._id)
                          handleDelete()
                        }}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isDeleting}
                      >
                        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
