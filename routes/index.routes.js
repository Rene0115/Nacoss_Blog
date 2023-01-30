/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import commentRouter from './comments.routes.js';
import postRouter from './post.routes.js';
import userRouter from './user.routes.js';

const router = express.Router();

router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter);

export default router;
