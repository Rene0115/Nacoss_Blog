/* eslint-disable consistent-return */
/* eslint-disable func-names */
const validator = (schema, reqbody = 'body') => async function (req, res, next) {
  const validated = await schema.validateAsync(req.body);
  try {
    if (reqbody === 'body') {
      req.body = validated;
    } else {
      req.query = validated;
    }
    next();
  } catch (e) {
    return res.status(500).send({ message: false, body: e });
  }
};

export default validator;
