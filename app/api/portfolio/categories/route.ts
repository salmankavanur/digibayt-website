import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectToDatabase } from "@/lib/mongodb"
import { PortfolioCategory } from "@/models/PortfolioCategory"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    const categories = await PortfolioCategory.find({}).sort({ name: 1 })
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching portfolio categories:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    await connectToDatabase()

    // Check if category with same slug already exists
    const existingCategory = await PortfolioCategory.findOne({ slug: data.slug })
    if (existingCategory) {
      return NextResponse.json({ error: "A category with this slug already exists" }, { status: 400 })
    }

    const newCategory = new PortfolioCategory(data)
    await newCategory.save()

    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error("Error creating portfolio category:", error)
    return NextResponse.json({ error: "Failed to create portfolio category" }, { status: 500 })
  }
}
