import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const router = express.Router();

// user registration and storage in the database
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

// user login
router.post('/login', async (req, res) => {
  try {
    // Attempt to find a user in the database by username
    const foundUser = await User.findOne({ username: req.body.username });

    // If user is not found, return a 401 Unauthorized response with a message
    if (!foundUser) {
      return res.status(401).json({ message: 'Login failed: Incorrect username or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isCorrectPassword = await bcrypt.compare(req.body.password, foundUser.password);

    // If the password is correct, proceed to generate a JWT
    if (isCorrectPassword) {
      const jwtPayload = {
        id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
      };

      // Sign the JWT with the secret key and set it to expire in 1 hour
      const token = jwt.sign(jwtPayload, process.env.SECRET, { expiresIn: '1h' });

      // Return response with the generated token
      return res.status(200).json({ success: true, token });
    } else {
      // If the password is incorrect, return a error response with a message
      return res.status(401).json({ message: 'Login failed: Incorrect username or password' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
