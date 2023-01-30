import Joi from 'joi';

const createCommentValidator = Joi.object().keys({
  postId: Joi.string().required(),
  comment: Joi.string().required()
});

export const commentIdValidator = Joi.object().keys({
  id: Joi.string().required()
});

export const updateCommentValidator = Joi.object().keys({
  id: Joi.string().required(),
  comment: Joi.string().required()
});

export default createCommentValidator;
