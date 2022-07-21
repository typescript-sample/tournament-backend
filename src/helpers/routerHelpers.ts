import Joi from "joi";

const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body);

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};

      req.value.body = validatorResult.value;
      next();
    }
  };
};

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({ param: req.params[name] });

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};

      req.value.params[name] = req.params[name];
      next();
    }
  };
};

const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9a-fA-F]{21}$/)
      .required(),
  }),
  Schema: Joi.object().keys({
    user: Joi.string().min(2).required(),
    password: Joi.string().min(6).required(),
  }),
};

module.exports = {
  validateBody,
  validateParam,
  schemas,
};
