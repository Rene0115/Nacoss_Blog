import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  comment: {
    required: true,
    type: String

  },
  likes: {
    type: Number,
    default: 0
  },
  postId: {
    required: true,
    type: String
  },
  userId: {
    required: true,
    type: String,
    ref: 'User'
  }

}, { timeStamps: true, versionKey: false });

const commentModel = mongoose.model('Comments', commentSchema);
export default commentModel;
