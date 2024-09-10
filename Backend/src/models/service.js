"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.hasMany(models.Transaction, {
        foreignKey: "idService",
        as: "transactions",
      });
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
