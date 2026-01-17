import Dustbin from '../models/dustbin.model.js';
// Get all dustbins for the map
export const getAllDustbins = async (req, res) => {
  try {
    const bins = await Dustbin.find().sort({ createdAt: -1 });
    res.status(200).json(bins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new dustbin
export const createDustbin = async (req, res) => {
  try {
    const { name, lat, lng } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "Photo is mandatory!" });
    }

    const newBin = await Dustbin.create({
      name,
      lat: Number(lat),
      lng: Number(lng),
      imageUrl: req.file.path // Cloudinary URL provided by Multer-Storage-Cloudinary
    });

    res.status(201).json(newBin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getNearbyDustbins = async (req, res) => {
  try {
    // Change this from req.query to req.body
    const { lat, lng } = req.body; 

    if (!lat || !lng) {
      return res.status(400).json({ message: "Current coordinates are required!" });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const searchRange = 0.0009;

    const bins = await Dustbin.find({
      lat: { $gte: userLat - searchRange, $lte: userLat + searchRange },
      lng: { $gte: userLng - searchRange, $lte: userLng + searchRange }
    });

    res.status(200).json(bins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};