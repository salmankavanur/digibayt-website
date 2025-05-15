import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Get a single user
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is a superadmin
    if (!session || session.user.role !== "superadmin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const { id } = params

    await connectToDatabase()

    const user = await User.findById(id).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 })
  }
}

// Update a user
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is a superadmin
    if (!session || session.user.role !== "superadmin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const { id } = params
    const { name, email, password, role } = await request.json()

    if (!name || !email || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Validate role
    if (!["admin", "superadmin", "editor"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 })
    }

    await connectToDatabase()

    // Check if user exists
    const user = await User.findById(id)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Check if email is already in use by another user
    const existingUser = await User.findOne({ email, _id: { $ne: id } })

    if (existingUser) {
      return NextResponse.json({ message: "Email is already in use" }, { status: 400 })
    }

    // Prevent removing the last superadmin
    if (user.role === "superadmin" && role !== "superadmin") {
      const superadminCount = await User.countDocuments({ role: "superadmin" })

      if (superadminCount <= 1) {
        return NextResponse.json({ message: "Cannot remove the last superadmin" }, { status: 400 })
      }
    }

    // Update user fields
    user.name = name
    user.email = email
    user.role = role

    // Only update password if provided
    if (password) {
      user.password = password
    }

    await user.save()

    // Return the updated user without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }

    return NextResponse.json(userResponse)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 })
  }
}

// Delete a user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is a superadmin
    if (!session || session.user.role !== "superadmin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const { id } = params

    await connectToDatabase()

    // Check if user exists
    const user = await User.findById(id)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Prevent deleting the last superadmin
    if (user.role === "superadmin") {
      const superadminCount = await User.countDocuments({ role: "superadmin" })

      if (superadminCount <= 1) {
        return NextResponse.json({ message: "Cannot delete the last superadmin" }, { status: 400 })
      }
    }

    // Delete the user
    await User.findByIdAndDelete(id)

    return NextResponse.json({
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 })
  }
}
