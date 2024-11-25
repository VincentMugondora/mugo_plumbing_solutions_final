const Booking = require('../models/Booking');

const bookingController = {
  // Create new booking
  createBooking: async (req, res) => {
    try {
      const { serviceType, date, startTime, duration, notes } = req.body;
      const userId = req.user.id; // Assuming you have authentication middleware

      const booking = new Booking({
        userId,
        serviceType,
        date,
        startTime,
        duration,
        notes
      });

      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create booking' });
    }
  },

  // Get user's bookings
  getUserBookings: async (req, res) => {
    try {
      const bookings = await Booking.find({ userId: req.user.id })
        .sort({ date: 1, startTime: 1 });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  },

  // Update booking status
  updateBookingStatus: async (req, res) => {
    try {
      const { bookingId, status } = req.body;
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
      );
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update booking' });
    }
  }
};

module.exports = bookingController; 