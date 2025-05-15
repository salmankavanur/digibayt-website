"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Eye, Clock, Loader2, ArrowUpDown, Search } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface Author {
  _id: string
  name: string
}

interface BlogPost {
  _id: string
  title: string
  slug: string
  status: "published" | "draft"
  publishedAt: string | null
  author: Author
  categories: string[]
}

export function BlogListClient() {
  const router = useRouter()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<string>("publishedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/blog?admin=true")

      if (!response.ok) {
        throw new Error("Failed to fetch blog posts")
      }

      const data = await response.json()
      setBlogPosts(data)
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!postToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/blog/${postToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete blog post")
      }

      setBlogPosts(blogPosts.filter((post) => post._id !== postToDelete))
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting blog post:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setPostToDelete(null)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published"

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredPosts = blogPosts.filter(
    (post) =>
      (statusFilter === "all" || post.status === statusFilter) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.author?.name && post.author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.categories &&
          post.categories.some((category) => category.toLowerCase().includes(searchQuery.toLowerCase())))),
  )

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortField === "title") {
      return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else if (sortField === "author") {
      const authorA = a.author?.name || ""
      const authorB = b.author?.name || ""
      return sortDirection === "asc" ? authorA.localeCompare(authorB) : authorB.localeCompare(authorA)
    } else if (sortField === "publishedAt") {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    }
    return 0
  })

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="w-full sm:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No blog posts found. Create your first post!</p>
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
                        onClick={() => handleSort("title")}
                      >
                        Title
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("publishedAt")}
                      >
                        Published
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("author")}
                      >
                        Author
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPosts.map((post) => (
                    <TableRow key={post._id?.toString()}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>
                          {post.status === "published" ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {post.status === "published" ? (
                          formatDate(post.publishedAt)
                        ) : (
                          <span className="flex items-center text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            Draft
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{post.author?.name || "Unknown Author"}</TableCell>
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
                              <Link href={`/admin/blog/${post._id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            {post.status === "published" && (
                              <DropdownMenuItem asChild>
                                <Link href={`/blog/${post.slug}`} target="_blank">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    setPostToDelete(post._id?.toString() || null)
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
                                    This action cannot be undone. This will permanently delete the blog post and remove
                                    it from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setPostToDelete(null)}>Cancel</AlertDialogCancel>
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
    </>
  )
}
