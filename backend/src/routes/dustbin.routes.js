import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { createDustbin, getAllDustbins, getNearbyDustbins } from '../controller/dustbin.controller.js';

const router = express.Router();

// Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dustbins',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

// Define Routes
router.get('/', getAllDustbins);
router.post('/add', upload.single('image'), createDustbin);
router.post('/get-bin', getNearbyDustbins);

export default router;