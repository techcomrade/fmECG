"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recurring_schedule", {
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
      recurrence_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "reccurence_type",
          key: "id",
        },
      },
      recurrence_end_date: {
        type: Sequelize.BIGINT,
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
    await queryInterface.dropTable("recurring_schedule");
  },
};
