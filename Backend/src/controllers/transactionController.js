const InvariantError = require("../exceptions/InvariantError");
const ClientError = require("../exceptions/ClientError");
const {
  addTransaction,
  getTransactions,
  getTransactionById,
  editTransactionById,
  deleteTransactionById,
} = require("../services/transactionService");

const logError = (error, res) => {
  if (error instanceof ClientError) {
    res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
  } else {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const postTransactionController = async (req, res) => {
  try {
    const { idMember, options, description, estimation, discount, payment } =
      req.body;

    if (!idMember || !options) {
      throw new InvariantError("IdMember and service options are required");
    }

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
    logError(error, res);
  }
};

const getTransactionsController = async (req, res) => {
  try {
    const transactions = await getTransactions();

    res.status(200).json({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (error) {
    logError(error, res);
  }
};

const getTransactionByIdController = async (req, res) => {
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
    logError(error, res);
  }
};

const putTransactionByIdController = async (req, res) => {
  try {
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
    logError(error, res);
  }
};

const deleteTransactionByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteTransactionById(id);

    res.status(200).json({
      status: "success",
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    logError(error, res);
  }
};

module.exports = {
  postTransactionController,
  getTransactionsController,
  getTransactionByIdController,
  putTransactionByIdController,
  deleteTransactionByIdController,
};
