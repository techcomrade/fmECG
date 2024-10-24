"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("device_schedule", {
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
      device_id: {
        type: Sequelize.STRING,
        references: {
          model: "devices",
          key: "id",
        },
        onDelete: "CASCADE", 
        onUpdate: "SET NULL",
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
    await queryInterface.dropTable("device_schedule");
  },
};
