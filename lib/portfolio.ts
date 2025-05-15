import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { PortfolioItem } from "@/models/Portfolio"

export async function getFeaturedPortfolioItems(limit = 3): Promise<PortfolioItem[]> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const portfolioItems = await db
      .collection("portfolio")
      .find({ featured: true })
      .sort({ order: 1 })
      .limit(limit)
      .toArray()

    return JSON.parse(JSON.stringify(portfolioItems))
  } catch (error) {
    console.error("Error fetching featured portfolio items:", error)
    return []
  }
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const portfolioItems = await db.collection("portfolio").find({}).sort({ order: 1 }).toArray()

    return JSON.parse(JSON.stringify(portfolioItems))
  } catch (error) {
    console.error("Error fetching all portfolio items:", error)
    return []
  }
}

export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const portfolioItem = await db.collection("portfolio").findOne({ slug })

    if (!portfolioItem) {
      return null
    }

    return JSON.parse(JSON.stringify(portfolioItem))
  } catch (error) {
    console.error("Error fetching portfolio item by slug:", error)
    return null
  }
}

export async function getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const portfolioItem = await db.collection("portfolio").findOne({ _id: new ObjectId(id) })

    if (!portfolioItem) {
      return null
    }

    return JSON.parse(JSON.stringify(portfolioItem))
  } catch (error) {
    console.error("Error fetching portfolio item by ID:", error)
    return null
  }
}

export async function getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const portfolioItems = await db.collection("portfolio").find({ category }).sort({ order: 1 }).toArray()

    return JSON.parse(JSON.stringify(portfolioItems))
  } catch (error) {
    console.error("Error fetching portfolio items by category:", error)
    return []
  }
}
