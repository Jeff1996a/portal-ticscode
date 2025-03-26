import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Define a cached connection object outside the function scope to maintain state
interface MongooseConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

let cached: MongooseConnection = (global as any)._mongoose || { conn: null, promise: null };

// Assign the cached connection to the global object in development mode
if (process.env.NODE_ENV !== "production") {
  (global as any)._mongoose = cached;
}

// Function to establish a database connection
export const dbConnect = async (): Promise<mongoose.Connection> => {
  if (cached.conn) {
    console.log("✅ Using existing Mongoose connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "ticscodeApp" // Optional: specify database name
      } as mongoose.ConnectOptions)
      .then((mongooseInstance) => {
        console.log("✅ New Mongoose connection established");
        return mongooseInstance.connection;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

// Function to close Mongoose connection (Only in production)
export const dbDisconnect = async (): Promise<void> => {
  if (process.env.NODE_ENV === "production" && cached.conn) {
    await mongoose.disconnect();
    console.log("✅ Mongoose connection closed");
    cached.conn = null;
    cached.promise = null;
  }
};
/*
// Global cache for mongoose connection
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  // If a connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // Otherwise, establish a new connection
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
*/


