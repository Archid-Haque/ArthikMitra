require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ✅ MongoDB User Model
const User = require("../models/User");


/* =====================================================
   SIGNUP (REGISTER USER)
   POST /api/auth/signup
===================================================== */
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "student"   // default role (can extend later)
    });

    await newUser.save();

    res.status(201).json({
      msg: "User Registered Successfully ✅"
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ msg: "Server error during signup" });
  }
});


/* =====================================================
   LOGIN (AUTHENTICATE USER)
   POST /api/auth/login
===================================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    // ✅ Find user from MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    // ✅ Create JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login Successful",
      token,
      role: user.role
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error during login" });
  }
});


module.exports = router;
