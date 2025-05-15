import mongoose, { Schema, type Document, models } from "mongoose"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/mongodb"

export interface IUser extends Document {
  email: string
  password: string
  name: string
  role: "admin" | "superadmin" | "editor"
  createdAt: Date
  updatedAt: Date
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "superadmin", "editor"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Ensure the connection is established before creating the model
connectToDatabase()

// Use mongoose.models to check if the model exists before creating a new one
export default models.User || mongoose.model<IUser>("User", UserSchema)
