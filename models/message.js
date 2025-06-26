const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required :true },
  username: String,
  contenido: String,
  timestamp: { type: Date, default: Date.now }

});

module.exports = mongoose.model("Message", messageSchema);