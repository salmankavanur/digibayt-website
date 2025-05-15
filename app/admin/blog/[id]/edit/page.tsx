import { notFound } from "next/navigation"
import { ObjectId } from "mongodb"
import { BlogForm } from "@/components/admin/blog-form"
import clientPromise from "@/lib/mongodb"
import { getAllAuthors } from "@/models/Author"
import { getAllCategories } from "@/models/Category"
import { getAllTags } from "@/models/Tag"

interface EditBlogPageProps {
  params: {
    id: string
  }
}

async function getBlogPost(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    // Check if id is a valid ObjectId
    let query = {}

    try {
      query = { _id: new ObjectId(id) }
    } catch (e) {
      // If not a valid ObjectId, try to find by slug
      query = { slug: id }
    }

    const blogPost = await db.collection("blog").findOne(query)

    if (!blogPost) {
      return null
    }

    return blogPost
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const [blogPost, authors, categories, tags] = await Promise.all([
    getBlogPost(params.id),
    getAllAuthors(),
    getAllCategories(),
    getAllTags(),
  ])

  if (!blogPost) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Blog Post</h1>
      <BlogForm initialData={blogPost} isEditing authors={authors} categories={categories} tags={tags} />
    </div>
  )
}
