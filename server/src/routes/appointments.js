const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

router.post('/', auth, async (req, res) => {
  try {
    const { plumberId, userId, appointmentDate, status } = req.body;

    // Check if there's already an appointment at this time
    const existingAppointment = await Appointment.findOne({
      plumberId,
      appointmentDate,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create new appointment
    const appointment = new Appointment({
      plumberId,
      userId,
      appointmentDate,
      status
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Appointment creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error booking appointment'
    });
  }
});

module.exports = router; 