import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import mongoose from 'mongoose';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/matcher-db');
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', () => {
  console.error('MongoDB error');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
