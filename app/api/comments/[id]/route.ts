import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { approveComment, deleteComment } from "@/models/Comment"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { action } = await request.json()

    if (action === "approve") {
      await approveComment(params.id)
      return NextResponse.json({ message: "Comment approved" })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error updating comment:", error)
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await deleteComment(params.id)
    return NextResponse.json({ message: "Comment deleted" })
  } catch (error) {
    console.error("Error deleting comment:", error)
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 })
  }
}
