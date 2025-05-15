import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    console.log(`Looking for blog post with id/slug: ${params.id}`)

    // First try to find by ObjectId
    let blogPost = null

    try {
      if (ObjectId.isValid(params.id)) {
        blogPost = await db.collection("blog").findOne({ _id: new ObjectId(params.id) })
        if (blogPost) {
          console.log(`Found blog post by ObjectId: ${blogPost._id}`)
        }
      }
    } catch (e) {
      console.error("Error finding by ObjectId:", e)
    }

    // If not found by ObjectId, try to find by slug
    if (!blogPost) {
      blogPost = await db.collection("blog").findOne({ slug: params.id })
      if (blogPost) {
        console.log(`Found blog post by slug: ${blogPost._id}`)
      } else {
        console.log(`No blog post found with slug: ${params.id}`)
      }
    }

    if (!blogPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Check if the post is published or if the user is an admin
    const session = await getServerSession(authOptions)
    const isAdmin = !!session

    if (blogPost.status !== "published" && !isAdmin) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(blogPost)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("digibayt")

    const data = await request.json()

    // Update timestamp
    const updatedBlogPost = {
      ...data,
      updatedAt: new Date(),
    }

    // Remove _id if present to avoid MongoDB error
    if (updatedBlogPost._id) {
      delete updatedBlogPost._id
    }

    // If status is published but no publishedAt date, set it to now
    if (updatedBlogPost.status === "published" && !updatedBlogPost.publishedAt) {
      updatedBlogPost.publishedAt = new Date()
    }

    const result = await db.collection("blog").updateOne({ _id: new ObjectId(params.id) }, { $set: updatedBlogPost })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({
      _id: params.id,
      ...updatedBlogPost,
    })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("digibayt")

    const result = await db.collection("blog").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
