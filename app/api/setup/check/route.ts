import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    await connectToDatabase()

    // Check if any admin user already exists
    const adminExists = await User.findOne({
      role: { $in: ["superadmin", "admin"] },
    })

    return NextResponse.json({
      setupNeeded: !adminExists,
      message: adminExists ? "Setup has already been completed" : "Setup is required",
    })
  } catch (error) {
    console.error("Setup check error:", error)
    return NextResponse.json(
      {
        setupNeeded: false,
        message: "Error checking setup status",
      },
      { status: 500 },
    )
  }
}
