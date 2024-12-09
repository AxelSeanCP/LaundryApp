const Joi = require("joi");

const PostAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  }),
});

const AuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "Refresh Token is required",
    "string.empty": "Refresh Token must not be empty",
  }),
});

module.exports = {
  PostAuthenticationPayloadSchema,
  AuthenticationPayloadSchema,
};
