import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("digibayt")

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const service = searchParams.get("service")
    const limit = Number.parseInt(searchParams.get("limit") || "0", 10)

    // Build query
    const query: any = {}
    if (status) {
      query.status = status
    }
    if (service) {
      query.service = service
    }

    // Execute query
    let contactSubmissions = db.collection("contact").find(query).sort({ createdAt: -1 })

    // Apply limit if provided
    if (limit > 0) {
      contactSubmissions = contactSubmissions.limit(limit)
    }

    const result = await contactSubmissions.toArray()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return NextResponse.json({ error: "Failed to fetch contact submissions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const data = await request.json()

    // Add timestamps and default status
    const now = new Date()
    const contactSubmission = {
      ...data,
      status: "new",
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection("contact").insertOne(contactSubmission)

    return NextResponse.json({
      _id: result.insertedId,
      ...contactSubmission,
    })
  } catch (error) {
    console.error("Error creating contact submission:", error)
    return NextResponse.json({ error: "Failed to create contact submission" }, { status: 500 })
  }
}
