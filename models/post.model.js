import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  userId: {
    required: true,
    type: String,
    ref: 'User'
  },
  image: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  }

}, { timestamps: true, versionKey: false });

const postModel = mongoose.model('Post', postSchema);
export default postModel;
