import { NextResponse, type NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getAllServiceCategories, createServiceCategory } from "@/models/ServiceCategory"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get("activeOnly") === "true"

    const categories = await getAllServiceCategories(activeOnly)
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching service categories:", error)
    return NextResponse.json({ error: "Failed to fetch service categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    // Set default values
    const categoryData = {
      name: data.name,
      slug: data.slug,
      description: data.description || "",
      isActive: data.isActive !== undefined ? data.isActive : true,
      order: data.order || 0,
    }

    const result = await createServiceCategory(categoryData)

    return NextResponse.json({
      _id: result.insertedId,
      ...categoryData,
    })
  } catch (error) {
    console.error("Error creating service category:", error)
    return NextResponse.json({ error: "Failed to create service category" }, { status: 500 })
  }
}
