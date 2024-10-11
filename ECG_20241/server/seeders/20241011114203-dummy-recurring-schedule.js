"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("recurring_schedule", [
      {
        id: "1",
        schedule_id: "2",
        recurrence_type_id: 1,
        recurrence_end_date: 1727794800,
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "2",
        schedule_id: "1",
        recurrence_type_id: 1,
        recurrence_end_date: 1727794800,
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recurring_schedule", null, {});
  },
};
