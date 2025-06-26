const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: Number,         // Usá Number en vez de Int
  username: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);