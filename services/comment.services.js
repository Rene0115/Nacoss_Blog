/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import commentModel from '../models/comment.model.js';

class CommentServices {
  async postComment(data) {
    const comment = await commentModel.create(data);
    return comment;
  }

  async getComment(id) {
    const comment = await commentModel.findById(id);
    return comment;
  }

  async deleteComment(id) {
    const comment = await commentModel.findByIdAndDelete(id);
    return comment;
  }
}
export default new CommentServices();
