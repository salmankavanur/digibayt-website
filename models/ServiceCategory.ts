import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export interface ServiceCategory {
  _id?: ObjectId | string
  name: string
  slug: string
  description?: string
  isActive: boolean
  order?: number
  createdAt: Date | string
  updatedAt: Date | string
}

export async function getServiceCategoryCollection() {
  const client = await clientPromise
  const db = client.db("digibayt")
  return db.collection<ServiceCategory>("serviceCategories")
}

export async function getAllServiceCategories(activeOnly = false) {
  const collection = await getServiceCategoryCollection()
  const query = activeOnly ? { isActive: true } : {}
  const categories = await collection.find(query).sort({ order: 1, name: 1 }).toArray()
  return JSON.parse(JSON.stringify(categories))
}

export async function getServiceCategoryById(id: string) {
  const collection = await getServiceCategoryCollection()
  const category = await collection.findOne({ _id: new ObjectId(id) })
  return category ? JSON.parse(JSON.stringify(category)) : null
}

export async function getServiceCategoryBySlug(slug: string) {
  const collection = await getServiceCategoryCollection()
  return collection.findOne({ slug })
}

export async function createServiceCategory(category: Omit<ServiceCategory, "_id" | "createdAt" | "updatedAt">) {
  const collection = await getServiceCategoryCollection()
  const now = new Date()

  const result = await collection.insertOne({
    ...category,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  } as ServiceCategory)

  return result
}

export async function updateServiceCategory(id: string, data: Partial<ServiceCategory>) {
  const collection = await getServiceCategoryCollection()
  const now = new Date()

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...data,
        updatedAt: now.toISOString(),
      },
    },
  )

  return result
}

export async function deleteServiceCategory(id: string) {
  const collection = await getServiceCategoryCollection()
  return collection.deleteOne({ _id: new ObjectId(id) })
}
