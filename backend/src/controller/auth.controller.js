import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// backend/controllers/auth.controller.js
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    
    const token = signToken(newUser._id);
    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser }
    });
  } catch (error) {
    // This sends the specific Mongoose error back to your console
    res.status(400).json({ 
      status: 'fail', 
      message: error.message 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // 2) Check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // 3) If everything ok, send token
    const token = signToken(user._id);
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};