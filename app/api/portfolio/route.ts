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
    const featured = searchParams.get("featured") === "true"
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "0", 10)

    // Build query
    const query: any = {}
    if (featured) {
      query.featured = true
    }
    if (category) {
      query.category = category
    }

    // Execute query
    let portfolioItems = db.collection("portfolio").find(query).sort({ order: 1 })

    // Apply limit if provided
    if (limit > 0) {
      portfolioItems = portfolioItems.limit(limit)
    }

    const result = await portfolioItems.toArray()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching portfolio items:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio items" }, { status: 500 })
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
    const existingItem = await db.collection("portfolio").findOne({ slug: data.slug })
    if (existingItem) {
      return NextResponse.json({ error: "A portfolio item with this slug already exists" }, { status: 400 })
    }

    // Add timestamps
    const now = new Date()
    const portfolioItem = {
      ...data,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection("portfolio").insertOne(portfolioItem)

    console.log("Portfolio item created:", result.insertedId)

    return NextResponse.json({
      _id: result.insertedId,
      ...portfolioItem,
    })
  } catch (error) {
    console.error("Error creating portfolio item:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create portfolio item",
      },
      { status: 500 },
    )
  }
}
