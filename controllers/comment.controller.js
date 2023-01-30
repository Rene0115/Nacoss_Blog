/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import commentServices from '../services/comment.services.js';

class CommentController {
  async createComment(req, res) {
    const data = {
      comment: req.body.comment,
      postId: req.body.postId,
      userId: req.user._id
    };

    if (req.user.verified === false) {
      return res.status(404).send({
        success: false,
        message: 'Verify your account before attempting to make a comment.'
      });
    }

    const comment = await commentServices.postComment(data);
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: 'Error creating comment'
      });
    }
    return res.status(200).send({
      success: true,
      message: `You commented ${comment.comment}`,
      data: comment
    });
  }

  async findCommentById(req, res) {
    const comment = await commentServices.getComment(req.body.id);
    if (_.isEmpty(comment)) {
      return res.status(404).send({
        success: false,
        message: 'no comment with this id exists.'
      });
    }
    return res.status(200).send({
      success: true,
      data: comment
    });
  }

  async editComment(req, res) {
    const comment = await commentServices.getComment(req.body.id);

    if (_.isEmpty(comment) || !comment) {
      return res.status(404).send({
        success: false,
        message: 'no comment with this id exists.'
      });
    }
    const newComment = req.body.comment;
    await comment.updateOne({ comment: newComment });
    return res.status(200).send({
      success: true,
      message: newComment
    });
  }

  async deleteComment(req, res) {
    const comment = await commentServices.deleteComment(req.body.id);
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: 'Something went wrong while attempting to delete'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Comments deleted successfully'
    });
  }
}

export default new CommentController();
