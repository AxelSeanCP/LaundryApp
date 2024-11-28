const InvariantError = require("../../exceptions/InvariantError");
const OptionPayloadSchema = require("./schema");

const OptionsValidator = {
  validateOptionPayload: (payload) => {
    const validationResult = OptionPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = OptionsValidator;
