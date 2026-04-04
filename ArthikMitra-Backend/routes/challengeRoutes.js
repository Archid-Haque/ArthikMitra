const express = require("express");
const router = express.Router();

// store in memory (temporary DB)
let challenges = [
  {
    id: 1,
    title: "Finance Quiz",
    description: "Answer 3 basic finance questions",
    type: "quiz",
    xp: 10,
    completed: false
  },
  {
    id: 2,
    title: "Save ₹50",
    description: "Try saving ₹50 today",
    type: "action",
    xp: 15,
    completed: false
  },
  {
    id: 3,
    title: "₹5000 Scenario",
    description: "What will you do with ₹5000?",
    type: "scenario",
    xp: 20,
    completed: false
  }
];

// GET challenges
router.get("/daily-challenges", (req, res) => {
  res.json(challenges);
});

// COMPLETE challenge
router.post("/complete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  challenges = challenges.map(ch =>
    ch.id === id ? { ...ch, completed: true } : ch
  );

  res.json({ success: true });
});

module.exports = router;