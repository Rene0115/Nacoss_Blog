import Joi from 'joi';

const validatePassword = async (password = '') => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(60).required()
  });

  const value = await schema.validateAsync({ password });

  return value;
};
const validateToken = async (token = '') => {
  const schema = Joi.object({
    token: Joi.string().min(10).trim().required()
  });

  const value = await schema.validateAsync({ token });

  return value;
};
const validatePasswordWithToken = async (data = {}) => {
  const { password } = await this.validatePassword(data.password);
  const { token } = await this.validateToken(data.token);

  return { password, token };
};

export default validatePasswordWithToken;
