/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import commentModel from '../models/comment.model.js';

class CommentServices {
  async postComment(data) {
    const comment = await commentModel.create(data);
    return comment;
  }

  async getComment(id) {
    const comment = await commentModel.find({ articleId: id });
    return comment;
  }

  async getUserReactions(id) {
    const comments = await commentModel.find({ editorsId: id });
    return comments;
  }
}
export default new CommentServices();
