"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("records", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
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
      device_id: {
        type: Sequelize.STRING,
        references: {
          model: "devices",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
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
      start_time: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      data_rec_url: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("records");
  },
};
