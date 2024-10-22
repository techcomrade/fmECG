"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("device_schedule", [
      {
        id: "1",
        schedule_id: "1",
        device_id: "2f9d99f0-4b5d-4e5e-9f93-2f9efb6a07c8",
        id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        schedule_id: "f7c1c6c7-a839-44c1-98e7-01b891f07c2f",
        device_id: "2f9d99f0-4b5d-4e5e-9f93-2f9efb6a07c8",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "2",
        schedule_id: "1",
        device_id: "c5d4a567-e78a-4c56-b9d4-6f3c0b4ad7b8",
        id: "6c28faba-d431-41db-a5a9-2dcb5fe2a242",
        schedule_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        device_id: "c5d4a567-e78a-4c56-b9d4-6f3c0b4ad7b8",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("device_schedule", null, {});
  },
};
