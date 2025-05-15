import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export interface Category {
  _id?: ObjectId | string
  name: string
  slug: string
  description?: string
  parentId?: ObjectId | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export async function getCategoryCollection() {
  const client = await clientPromise
  const db = client.db("digibayt")
  return db.collection<Category>("categories")
}

export async function getAllCategories() {
  const collection = await getCategoryCollection()
  const categories = await collection.find({}).sort({ name: 1 }).toArray()
  return JSON.parse(JSON.stringify(categories))
}

export async function getCategoryById(id: string) {
  const collection = await getCategoryCollection()
  try {
    const category = await collection.findOne({ _id: new ObjectId(id) })
    return category ? JSON.parse(JSON.stringify(category)) : null
  } catch (e) {
    return null
  }
}

export async function getCategoryBySlug(slug: string) {
  const collection = await getCategoryCollection()
  return collection.findOne({ slug })
}

export async function createCategory(category: Omit<Category, "_id" | "createdAt" | "updatedAt">) {
  const collection = await getCategoryCollection()
  const now = new Date()

  // Check if uncategorized exists
  if (category.slug === "uncategorized") {
    const existing = await getCategoryBySlug("uncategorized")
    if (existing) {
      return { insertedId: existing._id }
    }
  }

  const result = await collection.insertOne({
    ...category,
    createdAt: now,
    updatedAt: now,
  } as Category)

  return result
}

export async function updateCategory(id: string, category: Partial<Category>) {
  const collection = await getCategoryCollection()
  const now = new Date()

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...category,
        updatedAt: now,
      },
    },
  )

  return result
}

export async function deleteCategory(id: string) {
  const collection = await getCategoryCollection()
  return collection.deleteOne({ _id: new ObjectId(id) })
}

export async function ensureUncategorizedExists() {
  const collection = await getCategoryCollection()
  const uncategorized = await collection.findOne({ slug: "uncategorized" })

  if (!uncategorized) {
    const now = new Date()
    await collection.insertOne({
      name: "Uncategorized",
      slug: "uncategorized",
      description: "Default category for posts without a category",
      createdAt: now,
      updatedAt: now,
    })
  }

  return uncategorized || (await collection.findOne({ slug: "uncategorized" }))
}
