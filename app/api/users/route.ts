import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Get all users
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is a superadmin
    if (!session || session.user.role !== "superadmin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    await connectToDatabase()

    const users = await User.find({}).select("-password").sort({ createdAt: -1 })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 })
  }
}

// Create a new user
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is a superadmin
    if (!session || session.user.role !== "superadmin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const { name, email, password, role } = await request.json()

    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Validate role
    if (!["admin", "superadmin", "editor"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 })
    }

    await connectToDatabase()

    // Check if email is already in use
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json({ message: "Email is already in use" }, { status: 400 })
    }

    // Create the user
    const user = new User({
      name,
      email,
      password,
      role,
    })

    await user.save()

    // Return the user without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }

    return NextResponse.json(userResponse)
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ message: "Failed to create user" }, { status: 500 })
  }
}
