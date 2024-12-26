"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("revenue_statistics", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      schedule_id: {
        type: Sequelize.STRING,
        references: {
          model: "schedules",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      },
      schedule_type: {
        type: Sequelize.INTEGER,
        references: {
          model: "schedule_type",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      },
      patient_id: {
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      },
      doctor_id: {
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      },
      serviceType: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("revenue_statistics");
  },
};
