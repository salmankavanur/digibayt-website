/*
This script is meant to be run manually to create the initial admin user.
Run it with: npx ts-node --project tsconfig.json scripts/seed-admin.ts
*/

import { MongoClient, ServerApiVersion } from "mongodb"
import { hash } from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error("MONGODB_URI is not defined in the environment variables")
  process.exit(1)
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function seedAdmin() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("digibayt")
    const usersCollection = db.collection("users")

    // Check if admin user already exists
    const existingAdmin = await usersCollection.findOne({ email: "admin@digibayt.com" })

    if (existingAdmin) {
      console.log("Admin user already exists")
      return
    }

    // Create admin user
    const hashedPassword = await hash("adminPassword123", 10)

    const adminUser = {
      name: "Admin User",
      email: "admin@digibayt.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await usersCollection.insertOne(adminUser)
    console.log("Admin user created successfully")
  } catch (error) {
    console.error("Error seeding admin user:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

seedAdmin()
  .then(() => console.log("Seed script completed"))
  .catch((error) => console.error("Seed script failed:", error))
