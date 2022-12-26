import Joi from 'joi';

const validateUserSignUpSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  password: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  image: Joi.string()
});

export default validateUserSignUpSchema;
