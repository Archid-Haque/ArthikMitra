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
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("ArthikMitra Backend Running ✅");
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a financial mentor for Indian students.
Give simple, practical advice about saving, investing, budgeting.

Question:
${question}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "AI failed" });
  }
});

// ==============================
// START SERVER (ALWAYS LAST)
// ==============================
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
