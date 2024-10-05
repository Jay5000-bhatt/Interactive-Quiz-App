import mongoose from "mongoose";

export default async function connect() {
  await mongoose.connect(process.env.MongoDB_URL);
  console.log("Database Connected");
}
