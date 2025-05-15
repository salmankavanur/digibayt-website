import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const limit = Number.parseInt(searchParams.get("limit") || "0", 10)
    const isAdmin = searchParams.get("admin") === "true"

    // Build query
    const query: any = {}

    // Only show published posts unless admin=true
    if (!isAdmin) {
      query.status = "published"
    }

    if (category) {
      query.categories = category
    }

    if (tag) {
      query.tags = tag
    }

    // Execute query
    let blogPosts = db.collection("blog").find(query).sort({ publishedAt: -1 })

    // Apply limit if provided
    if (limit > 0) {
      blogPosts = blogPosts.limit(limit)
    }

    const result = await blogPosts.toArray()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("digibayt")

    const data = await request.json()

    // Validate required fields
    if (!data.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    if (!data.slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    // Check if slug already exists
    const existingPost = await db.collection("blog").findOne({ slug: data.slug })
    if (existingPost) {
      return NextResponse.json({ error: "A blog post with this slug already exists" }, { status: 400 })
    }

    // Add timestamps
    const now = new Date()
    const blogPost = {
      ...data,
      createdAt: now,
      updatedAt: now,
    }

    // If status is published but no publishedAt date, set it to now
    if (blogPost.status === "published" && !blogPost.publishedAt) {
      blogPost.publishedAt = now
    }

    const result = await db.collection("blog").insertOne(blogPost)

    console.log("Blog post created:", result.insertedId)

    return NextResponse.json({
      _id: result.insertedId,
      ...blogPost,
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create blog post",
      },
      { status: 500 },
    )
  }
}
