const Joi = require("joi");

const MemberPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  phoneNumber: Joi.string().optional(),
});

module.exports = { MemberPayloadSchema };
