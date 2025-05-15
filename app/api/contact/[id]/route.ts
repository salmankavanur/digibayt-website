import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("digibayt")

    const contactSubmission = await db.collection("contact").findOne({ _id: new ObjectId(params.id) })

    if (!contactSubmission) {
      return NextResponse.json({ error: "Contact submission not found" }, { status: 404 })
    }

    return NextResponse.json(contactSubmission)
  } catch (error) {
    console.error("Error fetching contact submission:", error)
    return NextResponse.json({ error: "Failed to fetch contact submission" }, { status: 500 })
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
    const updatedContactSubmission = {
      ...data,
      updatedAt: new Date(),
    }

    const result = await db
      .collection("contact")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updatedContactSubmission })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Contact submission not found" }, { status: 404 })
    }

    return NextResponse.json({
      _id: params.id,
      ...updatedContactSubmission,
    })
  } catch (error) {
    console.error("Error updating contact submission:", error)
    return NextResponse.json({ error: "Failed to update contact submission" }, { status: 500 })
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

    const result = await db.collection("contact").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Contact submission not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Contact submission deleted successfully" })
  } catch (error) {
    console.error("Error deleting contact submission:", error)
    return NextResponse.json({ error: "Failed to delete contact submission" }, { status: 500 })
  }
}
