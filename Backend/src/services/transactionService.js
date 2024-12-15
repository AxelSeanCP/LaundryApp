const db = require("../models");
const { nanoid } = require("nanoid");
const { Op } = require("sequelize");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthorizationError = require("../exceptions/AuthorizationError");

const addTransaction = async ({
  idMember,
  options,
  description,
  discount = 0, //optional fields
  payment = 0, //optional fields
  estimation,
  idOrganization,
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

  if (payment !== 0) {
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
    idOrganization,
  });

  if (!transaction) {
    throw new InvariantError("Add transaction failed");
  }

  return transaction;
};

const getTransactions = async (idOrganization, memberName) => {
  const transactions = await db.Transaction.findAll({
    attributes: ["id", "totalPrice", "paymentStatus", "status"],
    where: {
      idOrganization,
    },
    include: [
      {
        model: db.Member,
        as: "members",
        attributes: ["name"],
        ...(memberName && {
          // to return conditionally according to member name, if null return all
          where: { name: { [Op.like]: `%${memberName}%` } },
        }),
      },
    ],
  });

  if (transactions.length === 0) {
    throw new NotFoundError("No transactions found");
  }

  return transactions;
};

const getTransactionById = async (id, idOrganization) => {
  const transaction = await db.Transaction.findOne({
    where: {
      id,
      idOrganization,
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
      {
        model: db.Option,
        as: "options",
        attributes: ["price"],
        through: { attributes: ["qty"] },
        include: [
          {
            model: db.Service,
            as: "services",
            attributes: ["name"],
          },
        ],
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
  idOrganization,
  { description, discount, payment, status, estimation }
) => {
  const transaction = await getTransactionById(id, idOrganization);

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
  await db.Transaction.destroy({
    where: {
      id,
    },
  });
};

const verifyTransactionAccess = async (id, idOrganization) => {
  const transaction = await db.Transaction.findOne({
    where: {
      id,
    },
  });

  if (!transaction) {
    throw new NotFoundError("Transaction not found. Invalid id");
  }

  if (transaction.idOrganization !== idOrganization) {
    throw new AuthorizationError("You don't have access to this resource");
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  editTransactionById,
  deleteTransactionById,
  verifyTransactionAccess,
};
