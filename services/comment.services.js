/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import commentModel from '../models/comment.model.js';

class CommentServices {
  async postComment(data) {
    const comment = await commentModel.create(data);
    return comment;
  }

  async getCommentbyId(id) {
    const comment = await commentModel.findById(id);
    return comment;
  }

  async deleteComment(id) {
    const comment = await commentModel.findByIdAndDelete(id);
    return comment;
  }

  async getPostComments(id) {
    const comments = await commentModel.find({ postId: id });
    return comments;
  }

  async getComments() {
    const comments = await commentModel.find();
    return comments;
  }
}
export default new CommentServices();
