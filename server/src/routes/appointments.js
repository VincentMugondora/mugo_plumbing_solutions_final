// routes/api.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Plumber = require("../models/Plumber");

// Fetch plumber details
router.get("/plumbers/:id", async (req, res) => {
  try {
    const plumber = await Plumber.findById(req.params.id);
    if (!plumber) {
      return res.status(404).json({ message: "Plumber not found" });
    }
    res.json(plumber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Book an appointment
router.post("/bookings", async (req, res) => {
  try {
    const {
      plumberId,
      plumberName,
      appointmentDate,
      appointmentTime,
      fees,
      userId,
      userName,
      status,
    } = req.body;

    if (!plumberId || !appointmentDate || !appointmentTime || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new Booking({
      plumberId,
      plumberName,
      appointmentDate,
      appointmentTime,
      fees,
      userId,
      userName,
      status,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
