/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import postController from '../controllers/post.controller.js';
import authentication from '../middlewares/auth.middlewares.js';
import store from '../config/multer.config.js';
import validator from '../validators/validator.js';
import {
  postCategoryValidator, postIdValidator, postTitleValidator,
  updateBodyValidator, updateCategoryValidator, updateTitleValidator
} from '../validators/post.validator.js';

const postRouter = express.Router();

postRouter.post('/createpost', [authentication, store.single('image')], postController.createPost);
postRouter.get('/', postController.getPosts);

postRouter.get('/getbyid', [authentication, validator(postIdValidator)], postController.getPostById);

postRouter.put('/like', [authentication, validator(postIdValidator)], postController.like);

postRouter.get('/title', [authentication, validator(postTitleValidator)], postController.postByTitle);

postRouter.delete('/delete', [authentication, validator(postIdValidator)], postController.deletePost);

postRouter.get('/category', [authentication, validator(postCategoryValidator)], postController.getPostByCategories);

postRouter.put('/updatetitle', [authentication, validator(updateTitleValidator)], postController.updateTitle);

postRouter.put('/updatecategory', [authentication, validator(updateCategoryValidator)], postController.updateCategory);

postRouter.put('/updatebody', [authentication, validator(updateBodyValidator)], postController.updateBody);

export default postRouter;
