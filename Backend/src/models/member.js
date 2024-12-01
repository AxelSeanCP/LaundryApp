"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Member.hasMany(models.Transaction, {
        foreignKey: "idMember",
        as: "transactions",
      });

      Member.belongsTo(models.Organization, {
        foreignKey: "idOrganization",
        as: "organization",
        onDelete: "CASCADE",
      });
    }
  }
  Member.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      idOrganization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Member",
      timestamps: true, // automatically adjust the createdAt and updatedAt
    }
  );
  return Member;
};
