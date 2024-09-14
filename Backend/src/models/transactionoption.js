"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionOption.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      idTransaction: DataTypes.STRING,
      idOption: DataTypes.STRING,
      qty: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "TransactionOption",
      timestamps: false,
    }
  );
  return TransactionOption;
};
