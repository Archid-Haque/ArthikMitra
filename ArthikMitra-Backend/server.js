// ==============================
// LOAD ENV FIRST
// ==============================
require("dotenv").config();

// ==============================
// IMPORTS
// ==============================
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Groq = require("groq-sdk");

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
app.use(cors({ origin: "*" }));
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
// CHECK GROQ KEY
// ==============================
if (!process.env.GROQ_API_KEY) {
  throw new Error("❌ GROQ_API_KEY missing in .env");
}

console.log("✅ Groq Key Loaded");

// ==============================
// GROQ SETUP
// ==============================
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ==============================
// ROOT ROUTE
// ==============================
app.get("/", (req, res) => {
  res.send("ArthikMitra Backend Running ✅");
});

// ==============================
// AI ENDPOINT (GROQ)
// ==============================
app.post("/api/ai", async (req, res) => {
  console.log("🔥 AI endpoint hit");

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const completion = await groq.chat.completions.create({
      // ✅ UPDATED MODEL (IMPORTANT FIX)
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are a financial mentor for Indian students. Explain simply with real-life examples.",
        },
        {
          role: "user",
          content: question,
        },
      ],

      temperature: 0.7, // 🔥 better responses
      max_tokens: 800,  // ⚡ prevents cut answers
    });

    const answer =
      completion.choices?.[0]?.message?.content ||
      "⚠️ No response generated";

    res.json({ answer });

  } catch (error) {
    console.error(
      "❌ Groq Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "AI failed",
      details: error.response?.data || error.message,
    });
  }
});

// ==============================
// START SERVER
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});