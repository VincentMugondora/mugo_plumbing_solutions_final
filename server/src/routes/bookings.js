const express = require('express');
const router = express.Router();

// POST /api/bookings
router.post('/bookings', async (req, res) => {
  try {
    console.log('Received booking data:', req.body);
    
    // Your booking logic here
    
    res.status(201).json({ 
      message: 'Booking created successfully',
      booking: req.body 
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

module.exports = router; 