"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("consultation_schedule", [
      {
        id: "9b2a5f71-23b7-47c8-b9b5-4a7d5e5f6d3b",
        schedule_id: "83710b32-ecae-41ab-bd63-e25a054bc6ce",
        doctor_id: "de5824b0-781b-4ad5-943b-604714fd9113",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        schedule_id: "7c28faba-d431-41db-a5a9-2dcb5fh2a211",
        doctor_id: "b067fcbc-c471-4898-a3f7-850b27d40797",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fe2a211",
        schedule_id: "6c28faba-d431-41db-a5a9-2dcb5fh2a241",
        doctor_id: "b067fcbc-c471-4898-a3f7-850b27d40797",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fe2a219",
        schedule_id: "6c28faba-d431-41db-a5a9-2dcb5fh2a211",
        doctor_id: "b067fcbc-c471-4898-a3f7-850b27d40797",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "9c28faba-d431-41db-a5a9-2dcb5fe2a219",
        schedule_id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        doctor_id: "b067fcbc-c471-4898-a3f7-850b27d40797",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("consultation_schedule", null, {});
  },
};
