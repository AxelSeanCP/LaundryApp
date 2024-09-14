const db = require("../models");
const { nanoid } = require("nanoid");
const { Op } = require("sequelize");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");

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
  const status = "In Progress";
  let paymentStatus = "Unpaid";

  for (const option of options) {
    const { idOption, qty } = option;
    const optionData = await db.Option.findByPk(idOption);

    if (!optionData) {
      throw new NotFoundError("Option not found. invalid Option Id");
    }

    const price = optionData.price * qty;

    await db.TransactionOption.create({
      idTransaction: id,
      idOption: idOption,
      qty: qty,
      price,
    });

    totalPrice += price;
  }

  totalPrice -= discount;

  if (totalPrice - payment === 0) {
    paymentStatus = "Paid";
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

const getTransactions = async () => {};

const getTransactionById = async (id) => {};

const editTransactionById = async (
  id,
  { qty, description, discount, paid, estimation }
) => {};

const editStatus = async (id) => {};

const deleteTransactionById = async (id) => {};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  editTransactionById,
  editStatus,
  deleteTransactionById,
};
