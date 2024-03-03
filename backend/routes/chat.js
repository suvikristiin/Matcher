import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import Message from '../models/Message.js';

// Route to get matches for the authenticated user
router.get('/matches', async (req, res) => {
  try {
    const authUserId = req.user._id;
    const authUser = await User.findById(authUserId);

    if (!authUserId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!authUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve data for each match of the authenticated user
    const matchesUserData = await Promise.all(
      authUser.matches.map(async (matchId) => {
        const matchUser = await User.findById(matchId);
        return { _id: matchUser._id, username: matchUser.username };
      })
    );

    res.status(200).json({ matchesUserData });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get messages between the authenticated user and a selected match
router.post('/messages', async (req, res) => {
  try {
    const authUserId = req.user._id;
    if (!authUserId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const selectedMatchId = req.body.selectedMatch._id;

    // Find all messages between the authenticated user and the selected match
    const messages = await Message.find({
      $or: [
        { sender: authUserId, receiver: selectedMatchId },
        { sender: selectedMatchId, receiver: authUserId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages, authUserId: authUserId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to send a message from the authenticated user to a selected match
router.post('/send-message', async (req, res) => {
  if (!req.user._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Create a new message
    const newMessage = new Message({
      sender: req.user._id,
      receiver: req.body.receiverId.selectedMatch._id,
      content: req.body.content,
    });

    // Save the new message to the database
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

export default router;
