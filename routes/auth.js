const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/login", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Nombre requerido" });

  let user = await User.findOne({ username });

  if (!user) {
    user = await User.create({ username });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user: { id: user._id, username: user.username } });
});

module.exports = router;