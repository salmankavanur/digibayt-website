import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export interface Comment {
  _id?: ObjectId | string
  postId: ObjectId | string
  postType: "blog" | "portfolio"
  name: string
  email: string
  content: string
  isApproved: boolean
  createdAt: Date
  parentId?: ObjectId | string
  replies?: Comment[]
}

export async function getCommentCollection() {
  const client = await clientPromise
  const db = client.db("digibayt")
  return db.collection<Comment>("comments")
}

export async function getCommentsByPostId(postId: string, postType: "blog" | "portfolio", includeUnapproved = false) {
  const collection = await getCommentCollection()
  const query: any = { postId: new ObjectId(postId), postType }

  if (!includeUnapproved) {
    query.isApproved = true
  }

  return collection.find(query).sort({ createdAt: -1 }).toArray()
}

export async function createComment(comment: Omit<Comment, "_id" | "createdAt" | "isApproved">) {
  const collection = await getCommentCollection()

  const newComment = {
    ...comment,
    isApproved: false, // All comments require approval by default
    createdAt: new Date(),
    postId: typeof comment.postId === "string" ? new ObjectId(comment.postId) : comment.postId,
    parentId: comment.parentId
      ? typeof comment.parentId === "string"
        ? new ObjectId(comment.parentId)
        : comment.parentId
      : undefined,
  }

  const result = await collection.insertOne(newComment as Comment)
  return result
}

export async function approveComment(id: string) {
  const collection = await getCommentCollection()
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: { isApproved: true } })
}

export async function deleteComment(id: string) {
  const collection = await getCommentCollection()
  return collection.deleteOne({ _id: new ObjectId(id) })
}

export async function getAllComments(includeUnapproved = false, limit = 50, skip = 0) {
  const collection = await getCommentCollection()
  const query = includeUnapproved ? {} : { isApproved: true }

  return collection.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
}

export async function getPendingCommentsCount() {
  const collection = await getCommentCollection()
  return collection.countDocuments({ isApproved: false })
}
