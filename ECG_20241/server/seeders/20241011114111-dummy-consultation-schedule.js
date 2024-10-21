"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("consultation_schedule", [
      {
        id: 1,
        schedule_id: "9b2a5f71-23b7-47c8-b9b5-4a7d5e5f6d3b",
        doctor_id: "9dc38d89-55d1-4d41-8bfb-c885bc6ff0be",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: 2,
        schedule_id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        doctor_id: "9dc38d89-55d1-4d41-8bfb-c885bc6ff0be",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("consultation_schedule", null, {});
  },
};
