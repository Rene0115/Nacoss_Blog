/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import { upload } from '../config/multer.config.js';
import postController from '../controllers/post.controller.js';
import validator from '../validators/validator.js';
import postValidator from '../validators/post.validator.js';
import checkAuth from '../middlewares/auth.middlewares.js';

const postRouter = express.Router();

// postRouter.get('/:title', postController.articleByTitle);
postRouter.patch('/:postid', postController.updateArticle);
postRouter.post('/createpost', [checkAuth, upload.single('image'), validator(postValidator)], postController.createPost);

postRouter.get('/', postController.getPosts);
postRouter.get('/category/:category', postController.getPostByCategories);

// postRouter.post('/comments', checkAuth, validator(commentvalidator),
// commentController.postComments);
// postRouter.get('/comments/:id', commentController.getComments);
postRouter.get('/id/:id', postController.fetchPostById);
postRouter.delete('/:id', postController.deletePost);

export default postRouter;
