const Joi = require("joi");

const TransactionPayloadSchema = Joi.object({
  idMember: Joi.string().required().messages({
    "any.required": "ID Member is required",
    "string.empty": "ID Member cannot be empty",
  }),
  options: Joi.array()
    .items(
      Joi.object({
        idOption: Joi.string().required().messages({
          "any.required": "ID Option is required",
          "string.empty": "ID Option cannot be empty",
        }),
        qty: Joi.number().required().messages({
          "any.required": "QTY is required",
          "number.base": "QTY must be a number",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "any.required": "Service options is required",
      "array.base": "Service options must be an array",
      "array.empty": "Service options must not empty",
      "array.min": "At least one service option must be provided",
    }),
  description: Joi.string().optional(),
  estimation: Joi.string().optional(),
  discount: Joi.number().optional(),
  payment: Joi.number().optional(),
  status: Joi.string().optional(),
});

const PutTransactionPayloadSchema = Joi.object({
  description: Joi.string().optional(),
  estimation: Joi.string().optional(),
  discount: Joi.number().optional(),
  payment: Joi.number().optional(),
  status: Joi.string().optional(),
});

module.exports = { TransactionPayloadSchema, PutTransactionPayloadSchema };
