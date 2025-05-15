import { MongoClient, ServerApiVersion } from "mongodb"
import mongoose from "mongoose"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

// Global is used here to maintain a cached connection across hot reloads
// in development. This prevents connections growing exponentially
// during API Route usage.
let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
    mongoose?: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null }
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise

  // Initialize mongoose connection cache
  if (!globalWithMongo.mongoose) {
    globalWithMongo.mongoose = { conn: null, promise: null }
  }
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise for mongoose connection
const mongooseConnection = {
  conn: null as mongoose.Connection | null,
  promise: null as Promise<mongoose.Connection> | null,
}

/**
 * Connect to MongoDB with Mongoose
 */
async function connectToDatabase() {
  if (mongooseConnection.conn) {
    return mongooseConnection.conn
  }

  if (!mongooseConnection.promise) {
    const opts = {
      bufferCommands: false,
    }

    mongooseConnection.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose.connection
    })
  }
  mongooseConnection.conn = await mongooseConnection.promise
  return mongooseConnection.conn
}

// Export both the MongoClient promise and the connectToDatabase function
export { connectToDatabase }
export default clientPromise
