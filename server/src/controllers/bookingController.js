const Booking = require('../models/Booking');

exports.getBookings = async (req, res) => {
  try {
    console.log('Fetching all bookings...');
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Error in getBookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    console.log('Attempting to create booking with data:', req.body);
    
    const booking = await Booking.create(req.body);
    console.log('Successfully created booking:', booking);
    
    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Error creating booking:', {
      message: error.message,
      details: error
    });
    
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}; 