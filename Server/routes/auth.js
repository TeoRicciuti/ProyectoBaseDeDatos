const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/login", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username requerido" });
  }

  let user = await User.findOne({ username });

  // Si no existe, lo creo
  if (!user) {
    user = new User({ username });
    await user.save();
  }

  const token = jwt.sign({ id: user._id }, "secreto_waso", { expiresIn: "1h" });

  res.json({
    token,
    user: {
      _id: user._id,
      username: user.username,
    },
  });
});
module.exports = router;