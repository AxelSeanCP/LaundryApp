const InvariantError = require("../../exceptions/InvariantError");
const {
  TransactionPayloadSchema,
  PutTransactionPayloadSchema,
} = require("./schema");

const TransactionsValidator = {
  validateTransactionPayload: (payload) => {
    const validationResult = TransactionPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutTransactionPayload: (payload) => {
    const validationResult = PutTransactionPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = TransactionsValidator;
