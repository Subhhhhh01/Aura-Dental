import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'AuraClinic' });
  const Doctor = mongoose.model('Doctor', new mongoose.Schema({ id: Number, name: String }));
  await Doctor.deleteMany({});
  console.log("Cleared setup doctor!");
  process.exit(0);
}
check();
