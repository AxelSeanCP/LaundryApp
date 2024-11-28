const Joi = require("joi");

const ServicePayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  unit: Joi.string().required().messages({
    "any.required": "Unit is required",
    "string.empty": "Unit cannot be empty",
  }),
});

module.exports = ServicePayloadSchema;
