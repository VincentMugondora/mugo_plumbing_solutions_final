const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

console.log('🔄 Booking routes loaded');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Create new booking
router.post('/', async (req, res) => {
  try {
    console.log('Received booking data:', req.body);
    
    // Validate required fields
    if (!req.body.urgency) {
      return res.status(400).json({ message: 'Urgency level is required' });
    }

    const newBooking = new Booking({
      clientName: req.body.clientName,
      email: req.body.email,
      phone: req.body.phone,
      serviceType: req.body.serviceType,
      urgency: req.body.urgency,
      description: req.body.description,
      date: new Date(req.body.date),
      startTime: req.body.startTime,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        postalCode: req.body.address.postalCode
      }
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking: savedBooking 
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      message: 'Error creating booking', 
      error: error.message 
    });
  }
});

// Add a test route to verify the router is working
router.get('/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'Booking routes are working!' });
});

module.exports = router; 