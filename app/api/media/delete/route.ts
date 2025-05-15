import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { bucket, path } = body

    if (!bucket || !path) {
      return NextResponse.json({ error: "Bucket and path are required" }, { status: 400 })
    }

    const supabase = createRouteHandlerClient({ cookies })

    // Check if it's a folder
    const isFolder = path.endsWith("/")

    if (isFolder) {
      // For folders, we need to recursively delete all files inside
      const folderPath = path.slice(0, -1)
      const { data: files } = await supabase.storage.from(bucket).list(folderPath)

      if (files && files.length > 0) {
        // Delete all files in the folder
        for (const file of files) {
          const filePath = `${folderPath}/${file.name}`
          await supabase.storage.from(bucket).remove([filePath])
        }
      }

      // Then delete the folder itself (empty folders are automatically removed)
      return NextResponse.json({ success: true })
    } else {
      // For files, simply delete the file
      const { error } = await supabase.storage.from(bucket).remove([path])

      if (error) {
        throw error
      }

      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
  }
}
