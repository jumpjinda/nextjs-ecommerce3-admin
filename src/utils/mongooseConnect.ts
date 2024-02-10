import mongoose from "mongoose";

export default async function mongooseConnect() {
  try {
    await mongoose.connect(process.env.MONGO_DB as string);
  } catch {
    throw new Error("Connection failed!");
  }
}
