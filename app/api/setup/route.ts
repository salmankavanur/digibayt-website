import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    await connectToDatabase()

    // Check if any admin user already exists
    const adminExists = await User.findOne({
      role: { $in: ["superadmin", "admin"] },
    })

    if (adminExists) {
      return NextResponse.json({ message: "Setup has already been completed" }, { status: 400 })
    }

    // Check if email is already in use
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json({ message: "Email is already in use" }, { status: 400 })
    }

    // Create the superadmin user
    const user = new User({
      name,
      email,
      password,
      role: "superadmin",
    })

    await user.save()

    return NextResponse.json({
      message: "Superadmin created successfully",
      success: true,
    })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json({ message: "Failed to create superadmin" }, { status: 500 })
  }
}
