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
      schedule_id: {
        type: Sequelize.STRING,
        references: {
          model: "schedules",
          key: "id",
        },
        onDelete: "CASCADE", 
        onUpdate: "SET NULL",
      },
      information: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("diagnosis");
  },
};
