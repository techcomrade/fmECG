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
      patient_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      schedule_start_time: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      schedule_end_time: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      schedule_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "schedule_type",
          key: "id",
        },
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "schedule_status",
          key: "id",
        },
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
