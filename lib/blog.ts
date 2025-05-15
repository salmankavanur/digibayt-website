import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { BlogPost } from "@/models/Blog"
import { getAuthorById } from "@/models/Author"

export async function getPublishedBlogPosts(limit = 0): Promise<BlogPost[]> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    let query = db.collection("blog").find({ status: "published" }).sort({ publishedAt: -1 })

    if (limit > 0) {
      query = query.limit(limit)
    }

    const blogPosts = await query.toArray()

    // Enhance blog posts with author information
    const enhancedPosts = await Promise.all(
      blogPosts.map(async (post) => {
        if (post.authorId) {
          try {
            const author = await getAuthorById(post.authorId.toString())
            if (author) {
              return {
                ...post,
                authorName: author.name,
              }
            }
          } catch (error) {
            console.error(`Error fetching author for post ${post._id}:`, error)
          }
        }
        return {
          ...post,
          authorName: "Unknown Author",
        }
      }),
    )

    return JSON.parse(JSON.stringify(enhancedPosts))
  } catch (error) {
    console.error("Error fetching published blog posts:", error)
    return []
  }
}

export async function getAllBlogPosts(includeUnpublished = false): Promise<BlogPost[]> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const query = includeUnpublished ? {} : { status: "published" }

    const blogPosts = await db.collection("blog").find(query).sort({ publishedAt: -1 }).toArray()

    return JSON.parse(JSON.stringify(blogPosts))
  } catch (error) {
    console.error("Error fetching all blog posts:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string, includeUnpublished = false): Promise<BlogPost | null> {
  try {
    console.log(`Looking for blog post with slug: ${slug}, includeUnpublished: ${includeUnpublished}`)

    const client = await clientPromise
    const db = client.db("digibayt")

    const query = includeUnpublished ? { slug } : { slug, status: "published" }

    const blogPost = await db.collection("blog").findOne(query)

    if (!blogPost) {
      console.log(`No blog post found with slug: ${slug}`)
      return null
    }

    console.log(`Found blog post with slug: ${slug}, id: ${blogPost._id}`)

    // Ensure the post has all required fields
    const safePost = {
      _id: blogPost._id,
      title: blogPost.title || "Untitled Post",
      slug: blogPost.slug,
      content: blogPost.content || "",
      excerpt: blogPost.excerpt || "",
      featuredImage: blogPost.featuredImage || "",
      authorId: blogPost.authorId,
      categories: blogPost.categories || [],
      tags: blogPost.tags || [],
      publishedAt: blogPost.publishedAt || null,
      status: blogPost.status || "draft",
      readTime: blogPost.readTime || 1,
      seo: blogPost.seo || {
        title: blogPost.title || "Untitled Post",
        description: blogPost.excerpt || "",
        keywords: blogPost.tags || [],
        ogImage: blogPost.featuredImage || "",
      },
      createdAt: blogPost.createdAt || new Date(),
      updatedAt: blogPost.updatedAt || new Date(),
    }

    // Enhance with author information if available
    if (safePost.authorId) {
      try {
        const author = await getAuthorById(safePost.authorId.toString())
        if (author) {
          safePost.authorName = author.name
        }
      } catch (error) {
        console.error(`Error fetching author for post ${safePost._id}:`, error)
      }
    }

    return JSON.parse(JSON.stringify(safePost))
  } catch (error) {
    console.error(`Error fetching blog post by slug ${slug}:`, error)
    return null
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    let blogPost = null

    // Check if id is a valid ObjectId
    if (ObjectId.isValid(id)) {
      blogPost = await db.collection("blog").findOne({ _id: new ObjectId(id) })
    }

    if (!blogPost) {
      return null
    }

    return JSON.parse(JSON.stringify(blogPost))
  } catch (error) {
    console.error("Error fetching blog post by ID:", error)
    return null
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const blogPosts = await db
      .collection("blog")
      .find({ categories: category, status: "published" })
      .sort({ publishedAt: -1 })
      .toArray()

    return JSON.parse(JSON.stringify(blogPosts))
  } catch (error) {
    console.error("Error fetching blog posts by category:", error)
    return []
  }
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const blogPosts = await db
      .collection("blog")
      .find({ tags: tag, status: "published" })
      .sort({ publishedAt: -1 })
      .toArray()

    return JSON.parse(JSON.stringify(blogPosts))
  } catch (error) {
    console.error("Error fetching blog posts by tag:", error)
    return []
  }
}

export async function getRelatedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    // Find posts with the same category or tags, but not the current post
    const blogPosts = await db
      .collection("blog")
      .find({
        $and: [
          { _id: { $ne: new ObjectId(post._id as string) } },
          { status: "published" },
          {
            $or: [{ categories: { $in: post.categories || [] } }, { tags: { $in: post.tags || [] } }],
          },
        ],
      })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .toArray()

    return JSON.parse(JSON.stringify(blogPosts))
  } catch (error) {
    console.error("Error fetching related blog posts:", error)
    return []
  }
}
