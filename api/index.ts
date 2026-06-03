import express from 'express';
import { GoogleGenAI } from '@google/genai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// MongoDB Mongoose Schemas & Models
const doctorSchema = new mongoose.Schema({
  id: Number, name: String, role: String, exp: String, image: String, bio: String, status: String
});
const serviceSchema = new mongoose.Schema({
  id: Number, name: String, description: String, price: String, status: String, image: String
});
const imageSchema = new mongoose.Schema({
  id: Number, url: String, beforeUrl: String, afterUrl: String, type: String, label: String
});
const seoSchema = new mongoose.Schema({
  metaTitle: String, metaDescription: String, keywords: String
});

// Avoid Vercel serverless function recompilation model overwrite errors
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', imageSchema);
const SeoData = mongoose.models.SeoData || mongoose.model('SeoData', seoSchema);

let isConnected = false;
async function connectDB() {
  if (isConnected || !process.env.MONGODB_URI) return;
  try {
    if (mongoose.connection.readyState === 1) {
       isConnected = true;
       return;
    }
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'AuraClinic' });
    isConnected = true;
    console.log('Connected to MongoDB Database: AuraClinic');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// --- CMS API Endpoints ---
app.get('/api/db-status', (req, res) => {
  const isConnectedDB = mongoose.connection.readyState === 1;
  res.json({ connected: !!process.env.MONGODB_URI && isConnectedDB, hasUri: !!process.env.MONGODB_URI });
});

app.get('/api/cms/doctors', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) return res.json([]);
    const docs = await Doctor.find({});
    res.json(docs);
  } catch (e: any) { res.status(500).json({ error: 'DB Error', message: e.message }); }
});
app.post('/api/cms/doctors', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) return res.json({ success: false });
    const data = req.body;
    await Doctor.deleteMany({});
    if (data.length) await Doctor.insertMany(data);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'DB Error' }); }
});

app.get('/api/cms/services', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) return res.json([]);
    const docs = await Service.find({});
    res.json(docs);
  } catch (e) { res.status(500).json({ error: 'DB Error' }); }
});
app.post('/api/cms/services', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) return res.json({ success: false });
    const data = req.body;
    await Service.deleteMany({});
    if (data.length) await Service.insertMany(data);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'DB Error' }); }
});

app.get('/api/cms/images', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) return res.json([]);
    const docs = await GalleryImage.find({});
    res.json(docs);
  } catch (e) { res.status(500).json({ error: 'DB Error' }); }
});
app.post('/api/cms/images', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) return res.json({ success: false });
    const data = req.body;
    await GalleryImage.deleteMany({});
    if (data.length) await GalleryImage.insertMany(data);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'DB Error' }); }
});

app.get('/api/cms/seo', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) return res.json(null);
    const doc = await SeoData.findOne({});
    res.json(doc);
  } catch (e) { res.status(500).json({ error: 'DB Error' }); }
});
app.post('/api/cms/seo', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) return res.json({ success: false });
    const data = req.body;
    await SeoData.deleteMany({});
    await SeoData.create(data);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'DB Error' }); }
});

// API Route for the Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const systemPrompt = `You are a professional, helpful AI Assistant for a premium luxury dental clinic called 'Aura Dental'.
Your goal is to answer patient inquiries politely, exude trust, and help them book appointments.
Keep responses concise, elegant, and professional. Use formatting like bullet points when helpful.
If they ask for pricing, give approximate ranges (e.g., General checkups from $50, advanced treatments from $500, but an exact quote requires a consultation).
If they mention booking an appointment, guide them to use the website's booking form or contact via WhatsApp.`;

    const formattedMessages = messages.map((m: any) => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedMessages,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    res.json({ message: response.text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

export default app;
