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
      Service.hasMany(models.Option, {
        foreignKey: "idService",
        as: "options",
      });

      Service.belongsTo(models.Organization, {
        foreignKey: "idOrganization",
        as: "organization",
        onDelete: "CASCADE",
      });
    }
  }
  Service.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      unit: DataTypes.STRING,
      idOrganization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Service",
      timestamps: true, // automatically adjust the createdAt and updatedAt
    }
  );
  return Service;
};
