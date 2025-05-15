import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { createComment, getAllComments } from "@/models/Comment"
import { z } from "zod"

// Schema for comment validation
const commentSchema = z.object({
  postId: z.string(),
  postType: z.enum(["blog", "portfolio"]),
  name: z.string().min(2),
  email: z.string().email(),
  content: z.string().min(3).max(2000),
  parentId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the comment data
    const result = commentSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid comment data", details: result.error.format() }, { status: 400 })
    }

    // Create the comment
    const comment = await createComment(result.data)

    return NextResponse.json({
      message: "Comment submitted for approval",
      id: comment.insertedId,
    })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions)
    const isAdmin = !!session

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const includeUnapproved = isAdmin && searchParams.get("includeUnapproved") === "true"
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = Number.parseInt(searchParams.get("skip") || "0")

    // Get comments
    const comments = await getAllComments(includeUnapproved, limit, skip)

    return NextResponse.json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}
