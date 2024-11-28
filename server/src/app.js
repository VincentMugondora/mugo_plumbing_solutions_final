const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const authRoutes = require("./routes/authRoute");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

// MongoDB Connection
const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Initialize Express app
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome To Mugo Plumbing Solutions");
});

// Connect to MongoDB before starting the server
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log("Request Body:", req.body);
  }
  next();
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

console.log("📝 Available routes:");
console.log("- /api/auth");
console.log("- /api/bookings");
console.log("- /api/users");

// Add a test route to verify server is running
app.get("/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Catch-all Route for 404
app.use((req, res) => {
  console.log("❌ Route not found:", req.method, req.url);
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `Test the auth routes at http://localhost:${PORT}/api/auth/login`
  );
});

module.exports = app;
