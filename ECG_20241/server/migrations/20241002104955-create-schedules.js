"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("schedules", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      doctor_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      patient_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      available_time: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      appointment_status: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("schedules");
  },
};
