"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Option.belongsToMany(models.Transaction, {
        through: models.TransactionOption,
        foreignKey: "idOption",
        as: "transactions",
      });

      Option.belongsTo(models.Service, {
        foreignKey: "idService",
        as: "services",
        onDelete: "CASCADE",
      });
    }
  }
  Option.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      idService: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Option",
      timestamps: true,
    }
  );
  return Option;
};
