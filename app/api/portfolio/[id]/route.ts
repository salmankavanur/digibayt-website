import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    // Check if id is a valid ObjectId
    let query = {}

    try {
      query = { _id: new ObjectId(params.id) }
    } catch (e) {
      // If not a valid ObjectId, try to find by slug
      query = { slug: params.id }
    }

    const portfolioItem = await db.collection("portfolio").findOne(query)

    if (!portfolioItem) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 })
    }

    return NextResponse.json(portfolioItem)
  } catch (error) {
    console.error("Error fetching portfolio item:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio item" }, { status: 500 })
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
    const updatedPortfolioItem = {
      ...data,
      updatedAt: new Date(),
    }

    // Remove _id if present to avoid MongoDB error
    if (updatedPortfolioItem._id) {
      delete updatedPortfolioItem._id
    }

    const result = await db
      .collection("portfolio")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updatedPortfolioItem })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 })
    }

    return NextResponse.json({
      _id: params.id,
      ...updatedPortfolioItem,
    })
  } catch (error) {
    console.error("Error updating portfolio item:", error)
    return NextResponse.json({ error: "Failed to update portfolio item" }, { status: 500 })
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

    const result = await db.collection("portfolio").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Portfolio item deleted successfully" })
  } catch (error) {
    console.error("Error deleting portfolio item:", error)
    return NextResponse.json({ error: "Failed to delete portfolio item" }, { status: 500 })
  }
}
