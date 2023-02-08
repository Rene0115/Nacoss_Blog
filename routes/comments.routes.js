/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import express from 'express';
import commentController from '../controllers/comment.controller.js';
import validator from '../validators/validator.js';
import authentication from '../middlewares/auth.middlewares.js';
import createCommentValidator, { commentIdValidator, updateCommentValidator } from '../validators/comment.validator.js';

const commentRouter = express.Router();

commentRouter.post('/createcomment', [authentication, validator(createCommentValidator)], commentController.createComment);
commentRouter.put('/editcomment', [authentication, validator(updateCommentValidator)], commentController.editComment);
commentRouter.delete('/deletecomment', [authentication, validator(commentIdValidator)], commentController.deleteComment);

export default commentRouter;
