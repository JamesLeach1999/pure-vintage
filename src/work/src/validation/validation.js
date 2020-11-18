const Joi = require("@hapi/joi");
// kinda creating schema with validation, enforces the rules defined in schema

// register validation

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// returns true or false depending on if it worked
// do it like this for multipe validation fucntions
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
