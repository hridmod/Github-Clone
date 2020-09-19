const Joi = require("@hapi/joi");
const uservalidation = (data) => {
  const schema = Joi.object({
    Firstname: Joi.string().min(1),
    Email: Joi.string().email(),
    Password: Joi.string().min(6),
    PhoneNo: Joi.number(),
  });
  const { error } = schema.validate(data);
  return error;
  // This will send the specify error to the user
};

const loginValidation = (data) => {
  const schema = Joi.object({
    Email: Joi.string().email(),
    Password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(data);
  return error;
  // This will send the specify error to the user
};

module.exports.uservalidation = uservalidation;
module.exports.loginValidation = loginValidation;
