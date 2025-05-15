"use client"

import Link from "next/link"
import { Edit, Eye, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { BlogPost } from "@/models/Blog"

interface BlogListProps {
  blogs: BlogPost[]
  onDelete: (id: string) => void
}

export default function BlogList({ blogs, onDelete }: BlogListProps) {
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "—"

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <TableRow key={blog._id?.toString()}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={blog.status === "published" ? "default" : "secondary"}
                    className={
                      blog.status === "published"
                        ? "bg-green-500"
                        : blog.status === "draft"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }
                  >
                    {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {blog.categories.slice(0, 2).map((category) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                    {blog.categories.length > 2 && <Badge variant="outline">+{blog.categories.length - 2}</Badge>}
                  </div>
                </TableCell>
                <TableCell>{formatDate(blog.publishedAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild size="icon" variant="ghost">
                      <Link href={`/blog/${blog.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button asChild size="icon" variant="ghost">
                      <Link href={`/admin/blog/${blog._id}/edit`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => blog._id && onDelete(blog._id.toString())}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No blog posts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
