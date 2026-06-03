import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("DB name Mongoose connected to:", mongoose.connection.name);
  process.exit(0);
}
check();
