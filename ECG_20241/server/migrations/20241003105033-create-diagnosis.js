"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("diagnosis", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      patient_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      doctor_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      schedule_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "schedules",
          key: "id",
        },
      },
      information: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("diagnosis");
  },
};
