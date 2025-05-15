import { getAllAuthors } from "@/models/Author"
import { getAllCategories } from "@/models/Category"
import { getAllTags } from "@/models/Tag"
import { BlogForm } from "@/components/admin/blog-form"

export default async function NewBlogPage() {
  const [authors, categories, tags] = await Promise.all([getAllAuthors(), getAllCategories(), getAllTags()])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Blog Post</h1>
      <BlogForm authors={authors} categories={categories} tags={tags} />
    </div>
  )
}
