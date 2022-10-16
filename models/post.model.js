import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: {
    type: String

  },

  views: {
    default: 0,
    type: Number
  },
  category: {
    type: String,
    enum: ['politics', 'entertainment', 'education', 'technology', 'sports', 'news']
  },
  body: {
    type: String
  },
  userId: {
    required: true,
    type: String,
    ref: 'User'
  },
  image: {
    type: String
  },
  isPublished: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const postModel = mongoose.model('Post', postSchema);
export default postModel;
