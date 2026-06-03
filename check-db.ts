import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Doctor = mongoose.model('Doctor', new mongoose.Schema({ name: String }));
  console.log(await Doctor.find({}));
  process.exit(0);
}
check();
