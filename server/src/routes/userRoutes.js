// routes/userRoutes.js
const express = require("express");
const User = require("../models/userModel"); // Adjust path as needed
const router = express.Router();

// Route to get user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); // Fetch user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
