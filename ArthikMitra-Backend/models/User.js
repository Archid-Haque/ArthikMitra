const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: false, // Google users don't need password
  },

  avatar: {
    type: String, // Google profile image
    default: "",
  },

  provider: {
    type: String,
    default: "local", // "local" | "google"
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
