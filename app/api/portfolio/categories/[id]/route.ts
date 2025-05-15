import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectToDatabase } from "@/lib/mongodb"
import { PortfolioCategory } from "@/models/PortfolioCategory"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const category = await PortfolioCategory.findById(params.id)

    if (!category) {
      return NextResponse.json({ error: "Portfolio category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error fetching portfolio category:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio category" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    await connectToDatabase()

    // Check if category with same slug already exists (excluding this category)
    const existingCategory = await PortfolioCategory.findOne({
      slug: data.slug,
      _id: { $ne: params.id },
    })

    if (existingCategory) {
      return NextResponse.json({ error: "A category with this slug already exists" }, { status: 400 })
    }

    const updatedCategory = await PortfolioCategory.findByIdAndUpdate(params.id, data, { new: true })

    if (!updatedCategory) {
      return NextResponse.json({ error: "Portfolio category not found" }, { status: 404 })
    }

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error("Error updating portfolio category:", error)
    return NextResponse.json({ error: "Failed to update portfolio category" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const deletedCategory = await PortfolioCategory.findByIdAndDelete(params.id)

    if (!deletedCategory) {
      return NextResponse.json({ error: "Portfolio category not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Portfolio category deleted successfully" })
  } catch (error) {
    console.error("Error deleting portfolio category:", error)
    return NextResponse.json({ error: "Failed to delete portfolio category" }, { status: 500 })
  }
}
