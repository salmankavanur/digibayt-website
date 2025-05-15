import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const bucket = searchParams.get("bucket") || "media"
    const path = searchParams.get("path") || ""
    const search = searchParams.get("search") || ""
    const showAll = searchParams.get("showAll") === "true"

    // Create a Supabase client
    const supabase = createRouteHandlerClient({ cookies })

    // Get all buckets if showAll is true
    let allBuckets = [bucket]
    if (showAll) {
      const { data: bucketsList } = await supabase.storage.listBuckets()
      if (bucketsList && bucketsList.length > 0) {
        allBuckets = bucketsList.map((b) => b.name)
      }
    }

    // Fetch files from all relevant buckets
    let allFiles = []

    for (const currentBucket of allBuckets) {
      try {
        // Check if the bucket exists, if not create it
        if (currentBucket === bucket) {
          const { data: buckets } = await supabase.storage.listBuckets()
          const bucketExists = buckets?.some((b) => b.name === currentBucket)

          if (!bucketExists) {
            await supabase.storage.createBucket(currentBucket, {
              public: true,
            })
          }
        }

        // List files in the bucket/path
        const { data, error } = await supabase.storage.from(currentBucket).list(path, {
          sortBy: { column: "name", order: "asc" },
        })

        if (error) {
          console.error(`Error listing files in bucket ${currentBucket}:`, error)
          continue
        }

        if (!data || data.length === 0) continue

        // Get URLs for all files
        const filesWithUrls = await Promise.all(
          data.map(async (file) => {
            const filePath = path ? `${path}/${file.name}` : file.name
            const { data: publicUrl } = supabase.storage.from(currentBucket).getPublicUrl(filePath)

            // Get metadata for files (not folders)
            let metadata = file.metadata || {}
            if (!file.metadata?.isDir) {
              try {
                const { data: metaData } = await supabase.storage.from(currentBucket).getMetadata(filePath)
                if (metaData) {
                  metadata = metaData
                }
              } catch (err) {
                console.error("Error fetching metadata:", err)
              }
            }

            return {
              id: file.id || `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              name: file.name,
              path: filePath,
              url: publicUrl.publicUrl,
              bucket: currentBucket,
              metadata: {
                ...metadata,
                isDir: !!file.metadata?.isDir,
                size: metadata.size || 0,
                mimetype: metadata.mimetype || "",
                lastModified: metadata.lastModified || new Date().toISOString(),
              },
            }
          }),
        )

        allFiles = [...allFiles, ...filesWithUrls]
      } catch (error) {
        console.error(`Error processing bucket ${currentBucket}:`, error)
      }
    }

    // Filter by search term if provided
    if (search) {
      allFiles = allFiles.filter((file) => file.name.toLowerCase().includes(search.toLowerCase()))
    }

    return NextResponse.json(allFiles)
  } catch (error) {
    console.error("Media list error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
