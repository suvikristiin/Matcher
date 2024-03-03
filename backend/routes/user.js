import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';

// Route to get the user's profile data
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await User.findById(userId, '-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userObject = {
      email: user.email,
      username: user.username,
      introductionText: user.introductionText,
    };
    res.status(200).json(userObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update the user's profile
router.post('/update', async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  console.log(userId);
  try {
    const updateData = {
      email: req.body.email,
      username: req.body.username,
      introductionText: req.body.introductionText,
    };

    if (req.body.password) {
      if (
        !validator.isStrongPassword(req.body.password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        return res.status(400).json({ message: 'Password is not strong enough' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      updateData.password = hashedPassword;
    }

    await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

export default router;
