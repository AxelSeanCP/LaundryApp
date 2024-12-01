"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Organization.hasMany(models.Member, {
        foreignKey: "idOrganization",
        as: "members",
      });

      Organization.hasMany(models.Service, {
        foreignKey: "idOrganization",
        as: "services",
      });

      Organization.hasMany(models.Option, {
        foreignKey: "idOrganization",
        as: "options",
      });

      Organization.hasMany(models.Transaction, {
        foreignKey: "idOrganization",
        as: "transactions",
      });

      Organization.hasMany(models.User, {
        foreginKey: "idOrganization",
        as: "users",
      });
    }
  }
  Organization.init(
    {
      id: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Organization",
    }
  );
  return Organization;
};
