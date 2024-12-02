const express = require("express");
const Booking = require("../models/bookingModel"); // Adjust path as needed
const router = express.Router();

// Route to create a new booking
router.post("/", async (req, res) => {
  console.log("Incoming request body:", req.body);

  const {
    plumberId,
    plumberName,
    appointmentDate,
    appointmentTime,
    fees,
    userEmail, 
    userName,
    status,
    createdAt,
  } = req.body;

  const newBooking = new Booking({
    plumberId,
    plumberName,
    appointmentDate,
    appointmentTime,
    fees,
    userEmail, 
    userName,
    status,
    createdAt,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// Route to get all bookings for a specific user by email
router.get("/user/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const bookings = await Booking.find({ userName: userName });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Other routes can be added here...

module.exports = router;
