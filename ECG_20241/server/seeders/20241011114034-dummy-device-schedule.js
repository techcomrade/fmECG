"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("device_schedule", [
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        schedule_id: "f7c1c6c7-a839-44c1-98e7-01b891f07c2f",
        device_id: "c3f13bb7-2d4e-493d-b9b9-dc831b5b748e",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fe2a242",
        schedule_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        device_id: "b9b4c2a9-dae9-4c19-bb8a-9a4f1e1bb5d3",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("device_schedule", null, {});
  },
};
