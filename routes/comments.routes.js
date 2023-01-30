import express from 'express';
import commentController from '../controllers/comment.controller.js';
import validator from '../validators/validator.js';
import authentication from '../middlewares/auth.middlewares.js';

const commentRouter = express.Router();

commentRouter.post('/createcomment', [authentication, validator()],commentController.createComment);

export default commentRouter;
