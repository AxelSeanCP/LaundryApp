const db = require("../models");
const { Op, Sequelize } = require("sequelize");
const NotFoundError = require("../exceptions/NotFoundError");

const getDailyTransactionReports = async (idOrganization) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const report = await db.Transaction.findAll({
    where: {
      idOrganization,
      createdAt: {
        [Op.gte]: startOfDay,
      },
    },
    attributes: [
      [
        Sequelize.fn("SUM", Sequelize.col("Transaction.totalPrice")),
        "totalPrice",
      ],
      [
        Sequelize.fn("SUM", Sequelize.col("options->transactionOption.qty")),
        "totalQty",
      ],
    ],
    include: [
      {
        model: db.Option,
        as: "options",
        attributes: [],
        through: { attributes: ["qty"] },
        include: [
          {
            model: db.Service,
            as: "services",
            where: {
              unit: "kg",
            },
            attributes: [],
          },
        ],
      },
    ],
    raw: true,
  });

  if (!report) {
    throw new NotFoundError("Daily report not found. Set a different period");
  }

  return report;
};

const getWeeklyTransactionReports = async (idOrganization) => {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const report = await db.Transaction.findAll({
    where: {
      idOrganization,
      createdAt: {
        [Op.gte]: startOfWeek,
      },
    },
    attributes: [
      [
        Sequelize.fn("SUM", Sequelize.col("Transaction.totalPrice")),
        "totalPrice",
      ],
      [
        Sequelize.fn("SUM", Sequelize.col("options->transactionOption.qty")),
        "totalQty",
      ],
    ],
    include: [
      {
        model: db.Option,
        as: "options",
        attributes: [],
        through: { attributes: ["qty"] },
        include: [
          {
            model: db.Service,
            as: "services",
            where: {
              unit: "kg",
            },
            attributes: [],
          },
        ],
      },
    ],
    raw: true,
  });

  if (!report || report.length === 0) {
    throw new NotFoundError("No report found for the given period.");
  }

  return report;
};

const getMonthlyTransactionReports = async (idOrganization) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const report = await db.Transaction.findAll({
    where: {
      idOrganization,
      createdAt: {
        [Op.gte]: startOfMonth,
      },
    },
    attributes: [
      [
        Sequelize.fn("SUM", Sequelize.col("Transaction.totalPrice")),
        "totalPrice",
      ],
      [
        Sequelize.fn("SUM", Sequelize.col("options->transactionOption.qty")),
        "totalQty",
      ],
    ],
    include: [
      {
        model: db.Option,
        as: "options",
        attributes: [],
        through: { attributes: ["qty"] },
        include: [
          {
            model: db.Service,
            as: "services",
            where: {
              unit: "kg",
            },
            attributes: [],
          },
        ],
      },
    ],
    raw: true,
  });

  if (!report || report.length === 0) {
    throw new NotFoundError("No report found for the given period.");
  }

  return report;
};

const getCustomTransactionReports = async (
  idOrganization,
  startDate,
  endDate
) => {
  const report = await db.Transaction.findAll({
    where: {
      idOrganization,
      createdAt: {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      },
    },
    attributes: [
      [
        Sequelize.fn("SUM", Sequelize.col("Transaction.totalPrice")),
        "totalPrice",
      ],
      [
        Sequelize.fn("SUM", Sequelize.col("options->transactionOption.qty")),
        "totalQty",
      ],
    ],
    include: [
      {
        model: db.Option,
        as: "options",
        attributes: [],
        through: { attributes: ["qty"] },
        include: [
          {
            model: db.Service,
            as: "services",
            where: {
              unit: "kg",
            },
            attributes: [],
          },
        ],
      },
    ],
    raw: true,
  });

  if (!report || report.length === 0) {
    throw new NotFoundError("No report found for the given period.");
  }

  return report;
};

module.exports = {
  getDailyTransactionReports,
  getWeeklyTransactionReports,
  getMonthlyTransactionReports,
  getCustomTransactionReports,
};
