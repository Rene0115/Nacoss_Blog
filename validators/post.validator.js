import Joi from 'joi';

const postvalidator = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  body: Joi.string().required(),
  _id: Joi.string(),
  isPublished: Joi.string().required(),
  userId: Joi.string()
});

export const postvalidator2 = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  body: Joi.string().required()
});

export const postIdValidator = Joi.object({
  id: Joi.string().required()
});

export const postCategoryValidator = Joi.object({
  category: Joi.string().required()
});

export const postTitleValidator = Joi.object({
  title: Joi.string().required()
});

export const updateTitleValidator = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required()
});

export const updateCategoryValidator = Joi.object({
  id: Joi.string().required(),
  category: Joi.string().required()
});

export const updateBodyValidator = Joi.object({
  id: Joi.string().required(),
  body: Joi.string().required()
});
export default postvalidator;
