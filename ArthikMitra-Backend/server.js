// ==============================
// LOAD ENV FIRST (IMPORTANT)
// ==============================
require("dotenv").config();

// ==============================
// IMPORTS
// ==============================
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 🔐 Auth imports
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

// ==============================
// INITIALIZE APP
// ==============================
const app = express();

// ==============================
// CONNECT DATABASE (🔥 THIS RUNS MONGO)
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
// GEMINI AI SETUP
// ==============================
if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY missing in .env");
}

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});



app.get("/", (req, res) => {
  res.send("ArthikMitra Backend Running ✅");
});

app.post("/api/ai", async (req, res) => {
  console.log("🔥 AI endpoint hit");

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are a financial mentor for Indian students.
Explain in very simple language with examples.

Question: ${question}
`,
            },
          ],
        },
      ],
    });

    const text = result.response.text();

    res.json({ answer: text });

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    res.status(500).json({ error: "Gemini failed to respond" });
  }
});


// ==============================
// START SERVER (ALWAYS LAST)
// ==============================
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
