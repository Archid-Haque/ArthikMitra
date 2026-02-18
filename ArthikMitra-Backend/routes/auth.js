const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ==============================
// REGISTER USER
// ==============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      provider: "local",
    });

    await user.save();

    res.json({ msg: "Registration successful" });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ==============================
// LOGIN USER
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // If it's a Google user → block password login
    if (user.provider === "google") {
      return res.status(400).json({
        msg: "Use Google Login for this account",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ==========================
// GOOGLE LOGIN
// ==========================
router.post("/google", async (req, res) => {
  try {
    const { name, email, picture } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    // If not → create Google user
    if (!user) {
      user = new User({
        name,
        email,
        password: "",          // No password for Google users
        avatar: picture,       // Matches your schema
        provider: "google",
      });

      await user.save();
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });

  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ msg: "Google login failed" });
  }
});


// ✅ EXPORT MUST BE AT VERY END
module.exports = router;
