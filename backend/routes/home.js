import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Define a GET route to fetch a random user that the user has not rated yet
router.get('/random', async (req, res) => {
  try {
    const authUserId = req.user._id;
    // Find the authenticated user in the database
    const authUser = await User.findById(authUserId);
    if (!authUser) {
      return res.status(404).json({ message: 'Authentication user not found!' });
    }

    // Compile a list of user IDs that the authenticated user has already rated
    const ratedUserIds = [...authUser.likes, ...authUser.dislikes, authUserId];
    // Find users that have not been rated by the authenticated user
    const notRatedUserIds = await User.find({
      _id: { $nin: ratedUserIds },
    });

    // If there are no users left to rate, return a 204 No Content status
    if (notRatedUserIds == undefined || notRatedUserIds.length < 1) {
      return res.status(204).json({});
    }

    // Select a random user from those not yet rated by the authenticated user
    const randomIndex = Math.floor(Math.random() * notRatedUserIds.length);
    const randomUser = notRatedUserIds[randomIndex];
    return res.status(200).json({ randomUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Define a POST route to handle the rating of a user by the user
router.post('/rate', async (req, res) => {
  const authUserId = req.user._id;
  const { likedUserId, like } = req.body;

  if (!authUserId) {
    return res.status(401).send('Authentication user not found!');
  }

  if (!likedUserId) {
    return res.status(400).send('Liked user ID is required.');
  }

  try {
    // Find the authenticated user and the user to be rated in the database
    const authUser = await User.findById(authUserId);
    const likedUser = await User.findById(likedUserId);
    if (!likedUser) {
      return res.status(404).send('Liked user not found.');
    }

    // Based on the 'like' boolean, add the liked user's ID to the correct array
    if (like) {
      // Add the liked user's ID to the authenticating user's likes array
      authUser.likes.push(likedUserId);

      // Check if the liked user has also liked the authenticating user
      if (likedUser.likes.includes(authUserId)) {
        authUser.matches.push(likedUserId);
        likedUser.matches.push(authUserId);
      }
    } else {
      // If not a like, add id to the dislikes array
      authUser.dislikes.push(likedUserId);
    }

    authUser.save();
    likedUser.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
