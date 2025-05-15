import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export interface Author {
  _id?: ObjectId | string
  name: string
  slug: string
  bio: string
  avatar: string
  email?: string
  website?: string
  twitter?: string
  linkedin?: string
  github?: string
  instagram?: string
  role: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export async function getAuthorCollection() {
  const client = await clientPromise
  const db = client.db("digibayt")
  return db.collection<Author>("authors")
}

export async function getAllAuthors() {
  const collection = await getAuthorCollection()
  const authors = await collection.find({}).sort({ name: 1 }).toArray()
  return JSON.parse(JSON.stringify(authors))
}

export async function getAuthorById(id: string) {
  const collection = await getAuthorCollection()
  try {
    const author = await collection.findOne({ _id: new ObjectId(id) })
    return author ? JSON.parse(JSON.stringify(author)) : null
  } catch (e) {
    return null
  }
}

export async function getAuthorBySlug(slug: string) {
  const collection = await getAuthorCollection()
  return collection.findOne({ slug })
}

export async function createAuthor(author: Omit<Author, "_id" | "createdAt" | "updatedAt">) {
  const collection = await getAuthorCollection()
  const now = new Date()

  const result = await collection.insertOne({
    ...author,
    createdAt: now,
    updatedAt: now,
  } as Author)

  return result
}

export async function updateAuthor(id: string, author: Partial<Author>) {
  const collection = await getAuthorCollection()
  const now = new Date()

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...author,
        updatedAt: now,
      },
    },
  )

  return result
}

export async function deleteAuthor(id: string) {
  const collection = await getAuthorCollection()
  return collection.deleteOne({ _id: new ObjectId(id) })
}
