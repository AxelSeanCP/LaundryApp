const TransactionsValidator = require("../validator/transactions");
const {
  addTransaction,
  getTransactions,
  getTransactionById,
  editTransactionById,
  deleteTransactionById,
} = require("../services/transactionService");

const postTransactionController = async (req, res, next) => {
  try {
    TransactionsValidator.validateTransactionPayload(req.body);
    const { idMember, options, description, estimation, discount, payment } =
      req.body;

    const transaction = await addTransaction({
      idMember,
      options,
      description,
      estimation,
      discount,
      payment,
    });

    res.status(201).json({
      status: "success",
      message: "Transaction added successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

const getTransactionsController = async (req, res, next) => {
  try {
    const transactions = await getTransactions();

    res.status(200).json({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTransactionByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await getTransactionById(id);

    res.status(200).json({
      status: "success",
      data: {
        transaction: transaction,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putTransactionByIdController = async (req, res, next) => {
  try {
    TransactionsValidator.validateTransactionPayload(req.body);
    const { id } = req.params;

    const { description, discount, payment, status, estimation } = req.body;

    await editTransactionById(id, {
      description,
      discount,
      payment,
      status,
      estimation,
    });

    res.status(200).json({
      status: "success",
      message: "Transaction updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTransactionByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteTransactionById(id);

    res.status(200).json({
      status: "success",
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postTransactionController,
  getTransactionsController,
  getTransactionByIdController,
  putTransactionByIdController,
  deleteTransactionByIdController,
};
