import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const bucket = formData.get("bucket") as string
    const path = formData.get("path") as string

    if (!file || !bucket || !path) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Upload to Supabase
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    })

    if (error) {
      console.error("Supabase upload error:", error)
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }

    // Get the public URL
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path)

    return NextResponse.json({
      message: "File uploaded successfully",
      url: urlData.publicUrl,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to process upload" }, { status: 500 })
  }
}
