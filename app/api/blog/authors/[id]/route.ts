import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getAuthorById, updateAuthor, deleteAuthor } from "@/models/Author"

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const author = await getAuthorById(params.id)

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    return NextResponse.json(author)
  } catch (error) {
    console.error("Error fetching author:", error)
    return NextResponse.json({ error: "Failed to fetch author" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const result = await updateAuthor(params.id, data)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    return NextResponse.json({
      _id: params.id,
      ...data,
    })
  } catch (error) {
    console.error("Error updating author:", error)
    return NextResponse.json({ error: "Failed to update author" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await deleteAuthor(params.id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Author deleted successfully" })
  } catch (error) {
    console.error("Error deleting author:", error)
    return NextResponse.json({ error: "Failed to delete author" }, { status: 500 })
  }
}
