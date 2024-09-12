"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A transaction belongs to member
      Transaction.belongsTo(models.Member, {
        foreignKey: "idMember",
        as: "member",
      });

      // A transaction belongs to service
      Transaction.belongsTo(models.Service, {
        foreignKey: "idService",
        as: "service",
      });
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      idMember: DataTypes.STRING,
      idService: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
      qty: DataTypes.FLOAT,
      description: DataTypes.STRING,
      discount: DataTypes.INTEGER,
      paid: DataTypes.FLOAT,
      status: DataTypes.STRING,
      estimation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
      timestamps: true, // automatically adjust the createdAt and updatedAt
    }
  );
  return Transaction;
};
