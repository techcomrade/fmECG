"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("records", [
      {
        id: "1",
        patient_id: "4",
        device_id: "2",
        schedule_id: "1",
        start_time: 1727794800,
        end_time: 1727794800,
        data_rec_url: "http://example.com/records",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "2",
        patient_id: "4",
        device_id: "3",
        schedule_id: "2",
        start_time: 1727794800,
        end_time: 1727794800,
        data_rec_url: "http://example.com/records",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("records", null, {});
  },
};