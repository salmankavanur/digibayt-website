import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export interface ContactSubmission {
  _id?: ObjectId | string
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredContact?: "email" | "phone" | "whatsapp"
  message: string
  status: "new" | "in-progress" | "completed"
  notes?: string
  source?: string
  service?: string
  serviceName?: string
  createdAt: string | Date
  updatedAt?: string | Date
}

export async function getContactCollection() {
  const client = await clientPromise
  const db = client.db("digibayt")
  return db.collection<ContactSubmission>("contact")
}

export async function getAllContactSubmissions() {
  const collection = await getContactCollection()
  return collection.find({}).sort({ createdAt: -1 }).toArray()
}

export async function getContactSubmissionById(id: string) {
  const collection = await getContactCollection()
  return collection.findOne({ _id: new ObjectId(id) })
}

export async function getContactSubmissionsByService(serviceId: string) {
  const collection = await getContactCollection()
  return collection.find({ service: serviceId }).sort({ createdAt: -1 }).toArray()
}

export async function createContactSubmission(
  submission: Omit<ContactSubmission, "_id" | "status" | "createdAt" | "updatedAt">,
) {
  const collection = await getContactCollection()
  const now = new Date()

  const result = await collection.insertOne({
    ...submission,
    status: "new",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  } as ContactSubmission)

  return result
}

export async function updateContactSubmission(id: string, data: Partial<ContactSubmission>) {
  const collection = await getContactCollection()
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

export async function deleteContactSubmission(id: string) {
  const collection = await getContactCollection()
  return collection.deleteOne({ _id: new ObjectId(id) })
}
