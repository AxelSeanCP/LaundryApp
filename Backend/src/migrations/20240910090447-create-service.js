"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Services", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        // cuci setrika
        type: Sequelize.STRING,
      },
      qty: {
        // 5.6 / 1
        type: Sequelize.INTEGER,
      },
      unit: {
        // kg / satuan
        type: Sequelize.STRING,
      },
      type: {
        // normal / one-day / express
        type: Sequelize.STRING,
      },
      price: {
        // 5000 / 7000 / 10000 per unit
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Services");
  },
};
