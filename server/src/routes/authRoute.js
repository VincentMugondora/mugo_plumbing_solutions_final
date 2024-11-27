const express = require('express');
const router = express.Router();

// Debug middleware specific to auth routes
router.use((req, res, next) => {
  console.log('Auth route accessed:', {
    method: req.method,
    path: req.path,
    body: req.body
  });
  next();
});

// Test route
router.get('/test-auth', (req, res) => {
  console.log('Test auth route hit');
  res.json({ message: 'Auth routes working' });
});

// Register route
router.post('/register', async (req, res) => {
  console.log('Register route hit:', req.body);
  try {
    const { email, password } = req.body;
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        email: email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
});

// Login endpoint with /api/auth prefix
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // TODO: Add your authentication logic here
    // For now, sending a mock successful response
    res.json({
      message: 'Login successful',
      user: { email }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router; 