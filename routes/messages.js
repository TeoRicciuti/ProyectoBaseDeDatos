const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// Obtener todos los mensajes entre dos usuarios
router.get("/:sender/:receiver", async (req, res) => {
  const { sender, receiver } = req.params;
  const messages = await Message.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender },
    ],
  }).sort({ timestamp: 1 });
  res.json(messages);
});

// Crear mensaje
router.post("/", async (req, res) => {
  const { sender, receiver, content } = req.body;
  const newMessage = new Message({ sender, receiver, content });
  await newMessage.save();
  res.status(201).json(newMessage);
});

// Eliminar mensaje
router.delete("/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;