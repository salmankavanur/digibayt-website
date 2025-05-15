"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Edit, Trash2, Loader2, ArrowUpDown, Search, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface ServiceCategory {
  _id: string
  name: string
  slug: string
  description?: string
  isActive: boolean
  order?: number
  createdAt: string
  updatedAt: string
}

export default function ServiceCategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string>("order")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/service-categories")

      if (!response.ok) {
        throw new Error("Failed to fetch service categories")
      }

      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching service categories:", error)
      toast({
        title: "Error",
        description: "Failed to load service categories",
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
      const response = await fetch(`/api/service-categories/${categoryToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete service category")
      }

      setCategories(categories.filter((category) => category._id !== categoryToDelete))
      toast({
        title: "Success",
        description: "Service category deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting service category:", error)
      toast({
        title: "Error",
        description: "Failed to delete service category",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setCategoryToDelete(null)
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortField === "slug") {
      return sortDirection === "asc" ? a.slug.localeCompare(b.slug) : b.slug.localeCompare(a.slug)
    } else if (sortField === "order") {
      const orderA = a.order || 0
      const orderB = b.order || 0
      return sortDirection === "asc" ? orderA - orderB : orderB - orderA
    }
    return 0
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Service Categories</h1>
        <p className="text-muted-foreground">Manage service categories for your contact forms.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="w-full sm:w-[300px] pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No service categories found.</p>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("order")}
                      >
                        Order
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("name")}
                      >
                        Name
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("slug")}
                      >
                        Slug
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCategories.map((category) => (
                    <TableRow key={category._id.toString()}>
                      <TableCell>{category.order || 0}</TableCell>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell>
                        {category.isActive ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-500/20">
                            <XCircle className="mr-1 h-3 w-3" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/services/${category._id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    setCategoryToDelete(category._id.toString())
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the service category and
                                    remove it from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    disabled={isDeleting}
                                  >
                                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
