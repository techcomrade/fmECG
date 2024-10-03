"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("appointment", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      doctor_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      patient_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      repeat_every: {
        type: Sequelize.INTEGER,
      },
      repeat_until: {
        type: Sequelize.BIGINT,
      },
      createdAt: {
        type: Sequelize.BIGINT,
      },
      updatedAt: {
        type: Sequelize.BIGINT,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("appointment");
  },
};
