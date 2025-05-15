"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogListClient } from "@/components/admin/blog-list-client"

export default function BlogPageClient() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
        <p className="text-muted-foreground">Manage your blog posts. Draft posts are only visible to administrators.</p>
      </div>

      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Post
          </Link>
        </Button>
      </div>

      <BlogListClient />
    </div>
  )
}
