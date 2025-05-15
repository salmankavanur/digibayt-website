import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getCommentsByPostId } from "@/models/Comment"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin for viewing unapproved comments
    const session = await getServerSession(authOptions)
    const isAdmin = !!session

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const postType = searchParams.get("type") || "blog"
    const includeUnapproved = isAdmin && searchParams.get("includeUnapproved") === "true"

    // Validate post type
    if (postType !== "blog" && postType !== "portfolio") {
      return NextResponse.json({ error: "Invalid post type" }, { status: 400 })
    }

    // Get comments
    const comments = await getCommentsByPostId(params.id, postType as "blog" | "portfolio", includeUnapproved)

    return NextResponse.json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}
