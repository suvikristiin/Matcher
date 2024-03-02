import express from 'express';
const router = express.Router();
import User from '../models/User.js';

router.get('/matches', async (req, res) => {
  try {
    const authUserId = req.user._id;

    const authUser = await User.findById(authUserId);

    if (!authUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const matchesUserData = await Promise.all(
      authUser.matches.map(async (matchId) => {
        const matchUser = await User.findById(matchId);
        return { _id: matchUser._id, username: matchUser.username };
      })
    );

    console.log(matchesUserData);
    res.status(200).json({ matchesUserData });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
