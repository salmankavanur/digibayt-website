import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getAllAuthors, createAuthor } from "@/models/Author"

export async function GET() {
  try {
    const authors = await getAllAuthors()
    return NextResponse.json(authors)
  } catch (error) {
    console.error("Error fetching authors:", error)
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const result = await createAuthor(data)

    return NextResponse.json({
      _id: result.insertedId,
      ...data,
    })
  } catch (error) {
    console.error("Error creating author:", error)
    return NextResponse.json({ error: "Failed to create author" }, { status: 500 })
  }
}
