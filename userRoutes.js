const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Registration Endpoint
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, aadhar } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role, aadhar });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Login Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Generate token
      const token = jwt.sign(
          { id: user._id, role: user.role },
          'supersecret123', // Replace with your secret key
          { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Login successful.', token, role: user.role });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
