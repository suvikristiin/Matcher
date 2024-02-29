import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('moi');
  console.log('user', req.user);
  res.json({ user: req.user });
});

export default router;
