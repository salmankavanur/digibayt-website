import { notFound } from "next/navigation"
import { ObjectId } from "mongodb"
import { PortfolioForm } from "@/components/admin/portfolio-form"
import clientPromise from "@/lib/mongodb"

interface EditPortfolioPageProps {
  params: {
    id: string
  }
}

async function getPortfolioItem(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    // Check if id is a valid ObjectId
    let query = {}

    try {
      query = { _id: new ObjectId(id) }
    } catch (e) {
      // If not a valid ObjectId, try to find by slug
      query = { slug: id }
    }

    const portfolioItem = await db.collection("portfolio").findOne(query)

    if (!portfolioItem) {
      return null
    }

    return portfolioItem
  } catch (error) {
    console.error("Error fetching portfolio item:", error)
    return null
  }
}

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const portfolioItem = await getPortfolioItem(params.id)

  if (!portfolioItem) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Portfolio Item</h1>
      <PortfolioForm initialData={portfolioItem} isEditing />
    </div>
  )
}
