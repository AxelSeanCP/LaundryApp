"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("members", "idOrganization", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("services", "idOrganization", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("options", "idOrganization", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("transactions", "idOrganization", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
