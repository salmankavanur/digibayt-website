import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { ContactSubmission } from "@/models/Contact"

export async function getAllContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const contactSubmissions = await db.collection("contact").find({}).sort({ createdAt: -1 }).toArray()

    return JSON.parse(JSON.stringify(contactSubmissions))
  } catch (error) {
    console.error("Error fetching all contact submissions:", error)
    return []
  }
}

export async function getContactSubmissionById(id: string): Promise<ContactSubmission | null> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const contactSubmission = await db.collection("contact").findOne({ _id: new ObjectId(id) })

    if (!contactSubmission) {
      return null
    }

    return JSON.parse(JSON.stringify(contactSubmission))
  } catch (error) {
    console.error("Error fetching contact submission by ID:", error)
    return null
  }
}

export async function getContactSubmissionsByStatus(status: string): Promise<ContactSubmission[]> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const contactSubmissions = await db.collection("contact").find({ status }).sort({ createdAt: -1 }).toArray()

    return JSON.parse(JSON.stringify(contactSubmissions))
  } catch (error) {
    console.error("Error fetching contact submissions by status:", error)
    return []
  }
}

export async function updateContactSubmissionStatus(id: string, status: string, notes?: string): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const updateData: any = {
      status,
      updatedAt: new Date(),
    }

    if (notes !== undefined) {
      updateData.notes = notes
    }

    const result = await db.collection("contact").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    return result.matchedCount > 0
  } catch (error) {
    console.error("Error updating contact submission status:", error)
    return false
  }
}
