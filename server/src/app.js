const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const bookingRoutes = require('./routes/bookingRoutes');

// MongoDB Connection
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/your_database_name', {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

// Initialize Express app
const app = express();

// Connect to MongoDB before starting the server
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

console.log('📝 Available routes:');
console.log('- /api/bookings');

// Add a catch-all route handler for debugging
app.use('*', (req, res) => {
  console.log('Route not found:', req.originalUrl);

  console.log('Incoming request:', {
    method: req.method,
    url: req.url,
    path: req.path,
    body: req.body
  });
});

// Error handling for 404
app.use((req, res) => {
  console.log('❌ Route not found:', req.method, req.url);
  res.status(404).json({ message: 'Route not found' });
});

// Add a test route to verify server is running
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test the auth routes at http://localhost:${PORT}/api/auth/login`);
});

module.exports = app;
