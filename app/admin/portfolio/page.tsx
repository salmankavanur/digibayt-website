"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, Star, Eye, Loader2, ArrowUpDown, Search } from "lucide-react"
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
import type { PortfolioItem } from "@/models/Portfolio"

export default function PortfolioPage() {
  const router = useRouter()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/portfolio")

      if (!response.ok) {
        throw new Error("Failed to fetch portfolio items")
      }

      const data = await response.json()
      setPortfolioItems(data)
    } catch (error) {
      console.error("Error fetching portfolio items:", error)
      toast({
        title: "Error",
        description: "Failed to load portfolio items",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!itemToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/portfolio/${itemToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete portfolio item")
      }

      setPortfolioItems(portfolioItems.filter((item) => item._id !== itemToDelete))
      toast({
        title: "Success",
        description: "Portfolio item deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting portfolio item:", error)
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setItemToDelete(null)
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

  const filteredItems = portfolioItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortField === "title") {
      return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else if (sortField === "category") {
      return sortDirection === "asc" ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category)
    } else if (sortField === "client") {
      return sortDirection === "asc" ? a.client.localeCompare(b.client) : b.client.localeCompare(a.client)
    } else if (sortField === "createdAt") {
      const dateA = new Date(a.createdAt || 0).getTime()
      const dateB = new Date(b.createdAt || 0).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    }
    return 0
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Management</h1>
        <p className="text-muted-foreground">
          Manage your portfolio projects. Featured projects will appear on the homepage.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="w-full sm:w-[300px] pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/admin/portfolio/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Project
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : portfolioItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No portfolio items found. Create your first project!</p>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("title")}
                      >
                        Title
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("category")}
                      >
                        Category
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("client")}
                      >
                        Client
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedItems.map((item, index) => (
                    <TableRow key={item._id?.toString()}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.client}</TableCell>
                      <TableCell>
                        {item.featured && (
                          <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                            <Star className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/portfolio/${item._id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/portfolio/${item.slug}`} target="_blank">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    setItemToDelete(item._id?.toString() || null)
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
                                    This action cannot be undone. This will permanently delete the project and remove it
                                    from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancel</AlertDialogCancel>
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
