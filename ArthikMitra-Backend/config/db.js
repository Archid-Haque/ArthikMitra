const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/arthikmitra");
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
