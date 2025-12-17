const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
  res.send("Pellipandire API Running");
});

module.exports = router;
