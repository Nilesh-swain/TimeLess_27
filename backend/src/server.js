import dotenv from 'dotenv';
// 1. MUST BE FIRST
dotenv.config(); 

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import dustbinRoutes from './routes/dustbin.routes.js';
import authRoutes from './routes/auth.routes.js';

// 2. DEBUG: Verify keys are loading
console.log("Key Check:", process.env.CLOUDINARY_KEY ? "LOADED" : "MISSING");

const app = express();

// 3. CONFIG CLOUDINARY HERE
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

app.use(cors());
app.use(express.json());


// Routes
app.use('/api/dustbins', dustbinRoutes);
app.use('/api/auth', authRoutes);

// Database & Server Start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ DB Connection Error:", err));