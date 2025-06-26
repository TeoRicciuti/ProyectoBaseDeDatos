const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const verificarToken = require("../middleware/auth");

router.get("/", async (req, res) => {
  const mensajes = await Message.find()
    .populate("autor", "username") // Trae solo username
    .sort({ timestamp: 1 });

  res.json(mensajes);
});

// Obtener todos los mensajes entre dos usuarios

// Crear mensaje
router.post("/", async (req, res) => {
  const { autor, contenido, username } = req.body;
  if (!username || !contenido) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  const newMessage = new Message({ autor, contenido, username });
  await newMessage.save();
  res.status(201).json(newMessage);
});

// Eliminar mensaje
router.delete("/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
