"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("schedules", [
      {
        id: "1",
        patient_id: "4",
        schedule_start_time: 1727794800,
        schedule_end_time: 1727794900,
        schedule_type_id: 1,
        status_id: 1,
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
      {
        id: "2",
        patient_id: "3",
        schedule_start_time: 1727794800,
        schedule_end_time: 1727794900,
        schedule_type_id: 1,
        status_id: 1,
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("schedules", null, {});
  },
};
