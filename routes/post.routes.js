/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import postController from '../controllers/post.controller.js';
import authentication from '../middlewares/auth.middlewares.js';
import store from '../config/multer.config.js';

const postRouter = express.Router();

postRouter.post('/createpost', [authentication, store.single('image')], postController.createPost);
postRouter.delete('/:id', postController.deletePost);
postRouter.post('/like', [authentication], postController.like);

export default postRouter;
