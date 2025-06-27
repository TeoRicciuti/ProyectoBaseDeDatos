const express = require("express");
const router  = express.Router();
const Message = require("../models/message");
const verificarToken = require("../middleware/auth");   // ← ya lo tenías

// ───────────── GET: todos los mensajes ─────────────
router.get("/", async (req, res) => {
  try {
    const mensajes = await Message.find()
      .populate("autor", "username")   // solo trae username del autor
      .sort({ timestamp: 1 });
    res.json(mensajes);
  } catch (err) {
    console.error("Error al listar mensajes:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// ───────────── POST: crear mensaje ─────────────
router.post("/", verificarToken, async (req, res) => { // ← ahora con auth
  try {
    const { contenido } = req.body;
    if (!contenido) {
      return res.status(400).json({ error: "Falta contenido" });
    }

    const nuevo = await Message.create({
      autor: req.user.id,   // ← viene del token decodificado
      contenido,
    });

    res.status(201).json(nuevo);
  } catch (err) {
    console.error("Error al crear mensaje:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// ───────────── DELETE: eliminar mensaje ─────────────
router.delete("/:id", verificarToken, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error("Error al borrar mensaje:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
