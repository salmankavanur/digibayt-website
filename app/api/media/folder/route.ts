import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { bucket, path, folderName } = body

    if (!bucket || !folderName) {
      return NextResponse.json({ error: "Bucket and folder name are required" }, { status: 400 })
    }

    const supabase = createRouteHandlerClient({ cookies })

    // Create an empty file with a .folder extension to simulate a folder
    const folderPath = path ? `${path}/${folderName}/.folder` : `${folderName}/.folder`

    // Create an empty buffer
    const emptyBuffer = new Uint8Array(0)

    // Upload the empty file
    const { error } = await supabase.storage.from(bucket).upload(folderPath, emptyBuffer, {
      contentType: "application/octet-stream",
      upsert: true,
    })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating folder:", error)
    return NextResponse.json({ error: "Failed to create folder" }, { status: 500 })
  }
}
