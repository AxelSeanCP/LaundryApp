const InvariantError = require("../../exceptions/InvariantError");
const ServicePayloadSchema = require("./schema");

const ServicesValidator = {
  validateServicePayload: (payload) => {
    const validationResult = ServicePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ServicesValidator;
