const Joi = require("joi");

const UserPayloadSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  }),
  idOrganization: Joi.string().required().messages({
    "any.required": "Id Organization is required",
    "string.empty": "Id Organization cannot be empty",
  }),
});

module.exports = { UserPayloadSchema };
