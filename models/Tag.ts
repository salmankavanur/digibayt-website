import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export interface Tag {
  _id?: ObjectId | string
  name: string
  slug: string
  description?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export async function getTagCollection() {
  const client = await clientPromise
  const db = client.db("digibayt")
  return db.collection<Tag>("tags")
}

export async function getAllTags() {
  const collection = await getTagCollection()
  return collection.find({}).sort({ name: 1 }).toArray()
}

export async function getTagById(id: string) {
  const collection = await getTagCollection()
  try {
    return collection.findOne({ _id: new ObjectId(id) })
  } catch (e) {
    return null
  }
}

export async function getTagBySlug(slug: string) {
  const collection = await getTagCollection()
  return collection.findOne({ slug })
}

export async function createTag(tag: Omit<Tag, "_id" | "createdAt" | "updatedAt">) {
  const collection = await getTagCollection()
  const now = new Date()

  const result = await collection.insertOne({
    ...tag,
    createdAt: now,
    updatedAt: now,
  } as Tag)

  return result
}

export async function updateTag(id: string, tag: Partial<Tag>) {
  const collection = await getTagCollection()
  const now = new Date()

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...tag,
        updatedAt: now,
      },
    },
  )

  return result
}

export async function deleteTag(id: string) {
  const collection = await getTagCollection()
  return collection.deleteOne({ _id: new ObjectId(id) })
}
