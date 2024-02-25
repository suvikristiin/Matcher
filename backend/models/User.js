import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model('User', user);
