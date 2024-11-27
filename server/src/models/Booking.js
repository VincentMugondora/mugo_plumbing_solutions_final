const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  }
});

const bookingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['pipe_repair', 'drain_cleaning', 'water_heater', 'installation', 'leak_detection', 'emergency']
  },
  urgency: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  address: {
    type: addressSchema,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema); 