import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import homeRouter from './routes/home.js';
import chatRouter from './routes/chat.js';
import userRouter from './routes/user.js';
import mongoose from 'mongoose';
import passport from 'passport';
import './passport-config.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/matcher-db');
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', () => {
  console.error('MongoDB error');
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use('/', indexRouter);
// Protect by JWT authentication via passport on the "/home" router
app.use('/home', passport.authenticate('jwt', { session: false }), homeRouter);
app.use('/chats', passport.authenticate('jwt', { session: false }), chatRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
