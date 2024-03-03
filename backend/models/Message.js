import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const message = new Schema({
  sender: { type: Schema.Types.ObjectId },
  receiver: { type: Schema.Types.ObjectId },
  content: { type: String },
});

export default mongoose.model('Message', message);
