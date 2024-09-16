const db = require("../models");
const { nanoid } = require("nanoid");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");

// TODO: add feature get transaction by member name
const addTransaction = async ({
  idMember,
  options,
  description,
  discount = 0, //optional fields
  payment = 0, //optional fields
  estimation,
}) => {
  const id = `transaction-${nanoid(16)}`;
  let totalPrice = 0;
  const status = "In Progress"; // Done, Finished
  let paymentStatus = "Unpaid";

  for (const option of options) {
    const { idOption, qty } = option;
    const optionData = await db.Option.findByPk(idOption);
    const idTransactionOption = `transactionOption-${nanoid(16)}`;

    if (!optionData) {
      throw new NotFoundError("Option not found. invalid Option Id");
    }

    const price = optionData.price * qty;

    await db.TransactionOption.create({
      id: idTransactionOption,
      idTransaction: id,
      idOption: idOption,
      qty: qty,
      price,
    });

    totalPrice += price;
  }

  totalPrice -= discount;

  if (payment !== null) {
    if (totalPrice - payment === 0) {
      paymentStatus = "Paid";
    } else {
      throw new InvariantError("Payment is not enough");
    }
  }

  const transaction = await db.Transaction.create({
    id,
    idMember,
    totalPrice,
    description,
    status,
    payment,
    paymentStatus,
    discount,
    estimation,
  });

  if (!transaction) {
    throw new InvariantError("Add transaction failed");
  }

  return transaction;
};

const getTransactions = async () => {
  const transactions = await db.Transaction.findAll({
    attributes: ["id", "totalPrice", "paymentStatus", "status"],
    include: [
      {
        model: db.Member,
        as: "members",
        attributes: ["name"],
      },
    ],
  });

  if (transactions.length === 0) {
    throw new NotFoundError("No transactions found");
  }

  return transactions;
};

const getTransactionById = async (id) => {
  const transaction = await db.Transaction.findOne({
    where: {
      id,
    },
    attributes: [
      "id",
      "totalPrice",
      "description",
      "discount",
      "estimation",
      "payment",
      "status",
      "paymentStatus",
    ],
    include: [
      {
        model: db.Member,
        as: "members",
        attributes: ["name"],
      },
    ],
  });

  if (!transaction) {
    throw new NotFoundError("Transaction not found. Invalid id");
  }

  return transaction;
};

const editTransactionById = async (
  id,
  { description, discount, payment, status, estimation }
) => {
  const transaction = await getTransactionById(id);

  if (description) {
    transaction.description = description;
  }

  if (discount != null) {
    transaction.discount = discount;
    transaction.totalPrice -= discount;
  }

  if (payment != null && transaction.paymentStatus == "Unpaid") {
    transaction.payment = payment;

    if (transaction.totalPrice - payment == 0) {
      transaction.paymentStatus = "Paid";
    } else {
      throw new InvariantError("Payment is not enough");
    }
  }

  if (status && transaction.status !== status) {
    transaction.status = status;
  }

  if (estimation) {
    transaction.estimation = estimation;
  }

  await transaction.save();
};

const deleteTransactionById = async (id) => {
  const transaction = await getTransactionById(id);

  await transaction.destroy();
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  editTransactionById,
  deleteTransactionById,
};
