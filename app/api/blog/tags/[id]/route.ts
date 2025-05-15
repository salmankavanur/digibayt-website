import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getTagById, updateTag, deleteTag } from "@/models/Tag"

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tag = await getTagById(params.id)

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 })
    }

    return NextResponse.json(tag)
  } catch (error) {
    console.error("Error fetching tag:", error)
    return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const result = await updateTag(params.id, data)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 })
    }

    return NextResponse.json({
      _id: params.id,
      ...data,
    })
  } catch (error) {
    console.error("Error updating tag:", error)
    return NextResponse.json({ error: "Failed to update tag" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await deleteTag(params.id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Tag deleted successfully" })
  } catch (error) {
    console.error("Error deleting tag:", error)
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 })
  }
}
