const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  plumberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Plumber",
  },
  plumberName: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  fees: { type: Number, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
