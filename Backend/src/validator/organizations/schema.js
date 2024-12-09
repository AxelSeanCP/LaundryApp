const Joi = require("joi");

const OrganizationPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name must not be empty",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password must not be empty",
  }),
});

module.exports = { OrganizationPayloadSchema };
