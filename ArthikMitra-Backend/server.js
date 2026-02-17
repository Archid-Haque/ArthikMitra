// ==============================
// LOAD ENV FIRST
// ==============================
require("dotenv").config();

// ==============================
// IMPORTS
// ==============================
const express = require("express");
const cors = require("cors");
const axios = require("axios"); // 🔥 for OpenRouter
const connectDB = require("./config/db");

// 🔐 Auth imports
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

// ==============================
// INITIALIZE APP
// ==============================
const app = express();

// ==============================
// CONNECT DATABASE
// ==============================
connectDB();

// ==============================
// MIDDLEWARE
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// AUTH ROUTES
// ==============================
app.use("/api/auth", authRoutes);

// ==============================
// PROTECTED SESSION ROUTE
// ==============================
app.get("/api/session", authMiddleware, (req, res) => {
  res.json({
    msg: "Session Active",
    user: req.user,
  });
});

// ==============================
// CHECK OPENROUTER KEY
// ==============================
if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("❌ OPENROUTER_API_KEY missing in .env");
}

console.log("✅ OpenRouter Key Loaded");

// ==============================
// ROOT ROUTE
// ==============================
app.get("/", (req, res) => {
  res.send("ArthikMitra Backend Running ✅");
});

// ==============================
// AI ENDPOINT (OPENROUTER)
// ==============================
app.post("/api/ai", async (req, res) => {
  console.log("🔥 AI endpoint hit");

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // ✅ Free model
        messages: [
          {
            role: "system",
            content:
              "You are a financial mentor for Indian students. Explain simply using relatable examples.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].message.content;

    res.json({ answer });
  } catch (error) {
    console.error(
      "❌ OpenRouter Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "AI failed" });
  }
});

// ==============================
// START SERVER
// ==============================
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
