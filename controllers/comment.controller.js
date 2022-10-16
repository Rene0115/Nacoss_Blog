/* eslint-disable import/extensions */
import _ from 'lodash';
import commentService from '../services/comment.services.js';

/* eslint-disable class-methods-use-this */
class CommentController {
  async postComments(req, res) {
    const comment = await commentService.postComment(req.body);
    if (_.isEmpty(comment)) {
      return res.status(404).send({ status: false, message: 'unable to post comment' });
    }
    return res.status(200).send({ status: true, message: 'comment posted successfully' });
  }

  async getComments(req, res) {
    const comment = await commentService.getComment(req.params.id);
    if (_.isEmpty(comment)) {
      return res.status(404).send({ status: false, message: 'no comments available' });
    }
    return res.status(200).send({ status: true, body: comment });
  }

  async getUsersComments(id) {
    const comment = await commentService.getUserReactions(id);
    return comment;
  }
}

export default new CommentController();
