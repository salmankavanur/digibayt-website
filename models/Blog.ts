import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { ensureUncategorizedExists } from "./Category"

export interface SEO {
  title: string
  description: string
  keywords: string[]
  ogImage: string
}

export interface BlogPost {
  _id?: ObjectId | string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage: string
  authorId: ObjectId | string
  categories: string[]
  tags: string[]
  publishedAt: string | Date | null
  status: "draft" | "published"
  readTime: number
  seo: SEO
  createdAt?: string | Date
  updatedAt?: string | Date
}

export async function getBlogCollection() {
  const client = await clientPromise
  const db = client.db("digibayt")
  return db.collection<BlogPost>("blog")
}

export async function getAllBlogPosts() {
  const collection = await getBlogCollection()
  return collection.find({}).sort({ publishedAt: -1 }).toArray()
}

export async function getPublishedBlogPosts(limit?: number) {
  const collection = await getBlogCollection()
  const query = collection.find({ status: "published", publishedAt: { $lte: new Date() } }).sort({ publishedAt: -1 })

  if (limit) {
    return query.limit(limit).toArray()
  }

  return query.toArray()
}

export async function getBlogPostBySlug(slug: string) {
  const collection = await getBlogCollection()
  return collection.findOne({ slug })
}

export async function getBlogPostsByCategory(category: string) {
  const collection = await getBlogCollection()
  return collection
    .find({
      categories: category,
      status: "published",
      publishedAt: { $lte: new Date() },
    })
    .sort({ publishedAt: -1 })
    .toArray()
}

export async function getBlogPostsByTag(tag: string) {
  const collection = await getBlogCollection()
  return collection
    .find({
      tags: tag,
      status: "published",
      publishedAt: { $lte: new Date() },
    })
    .sort({ publishedAt: -1 })
    .toArray()
}

export async function createBlogPost(post: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">) {
  const collection = await getBlogCollection()
  const now = new Date()

  // Ensure uncategorized category exists
  if (!post.categories || post.categories.length === 0) {
    await ensureUncategorizedExists()
    post.categories = ["uncategorized"]
  }

  const result = await collection.insertOne({
    ...post,
    createdAt: now,
    updatedAt: now,
  } as BlogPost)

  return result
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>) {
  const collection = await getBlogCollection()
  const now = new Date()

  // Ensure uncategorized category exists
  if (!post.categories || post.categories.length === 0) {
    await ensureUncategorizedExists()
    post.categories = ["uncategorized"]
  }

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...post,
        updatedAt: now,
      },
    },
  )

  return result
}

export async function deleteBlogPost(id: string) {
  const collection = await getBlogCollection()
  return collection.deleteOne({ _id: new ObjectId(id) })
}
