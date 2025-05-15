import { NextResponse, type NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServiceCategoryById, updateServiceCategory, deleteServiceCategory } from "@/models/ServiceCategory"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const category = await getServiceCategoryById(params.id)

    if (!category) {
      return NextResponse.json({ error: "Service category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error fetching service category:", error)
    return NextResponse.json({ error: "Failed to fetch service category" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const category = await getServiceCategoryById(params.id)

    if (!category) {
      return NextResponse.json({ error: "Service category not found" }, { status: 404 })
    }

    const result = await updateServiceCategory(params.id, data)

    return NextResponse.json({
      success: result.acknowledged,
      modifiedCount: result.modifiedCount,
    })
  } catch (error) {
    console.error("Error updating service category:", error)
    return NextResponse.json({ error: "Failed to update service category" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const category = await getServiceCategoryById(params.id)

    if (!category) {
      return NextResponse.json({ error: "Service category not found" }, { status: 404 })
    }

    const result = await deleteServiceCategory(params.id)

    return NextResponse.json({
      success: result.acknowledged,
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error("Error deleting service category:", error)
    return NextResponse.json({ error: "Failed to delete service category" }, { status: 500 })
  }
}
