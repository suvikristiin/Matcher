import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import validator from 'validator';
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  // Check email validity with validator library
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email is not correct.' });
  }

  // Check the password requirements with the validator library (at least 8 characters, includes numbers, symbols and uppercase and lowercase letters)
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({ message: 'Password is not strong enough' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10); // create a hash of the password

    // Create a new registered user
    const newUser = new User({
      email: email,
      username: username,
      password: passwordHash,
    });

    // Save the new registered user to the database
    await newUser.save();

    res.status(201).json({ message: 'New user is created' });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Required information is missing.' });
      // Handle Mongoose duplicate key errors
    } else if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or username is already in use.' });
    } else {
      return res.status(500).json({ message: 'Server error.' });
    }
  }
});

export default router;
