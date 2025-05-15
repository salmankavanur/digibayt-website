import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getCategoryById, updateCategory, deleteCategory } from "@/models/Category"

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const category = await getCategoryById(params.id)

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Prevent updating uncategorized slug
    if (data.slug === "uncategorized" && data.slug !== (await getCategoryById(params.id))?.slug) {
      return NextResponse.json({ error: "Cannot change slug to 'uncategorized'" }, { status: 400 })
    }

    const result = await updateCategory(params.id, data)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({
      _id: params.id,
      ...data,
    })
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if this is the uncategorized category
    const category = await getCategoryById(params.id)
    if (category?.slug === "uncategorized") {
      return NextResponse.json({ error: "Cannot delete the uncategorized category" }, { status: 400 })
    }

    const result = await deleteCategory(params.id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Category deleted successfully" })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
