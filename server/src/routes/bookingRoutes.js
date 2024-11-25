const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth'); // Assuming you have auth middleware

router.post('/', auth, bookingController.createBooking);
router.get('/user', auth, bookingController.getUserBookings);
router.patch('/status', auth, bookingController.updateBookingStatus);

module.exports = router; 