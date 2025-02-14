"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("schedules", [
      {
        id: "9b2a5f71-23b7-47c8-b9b5-4a7d5e5f6d3b",
        patient_id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        schedule_start_time: 1704958200,
        schedule_end_time: 1704960000,
        status_id: 1,
        schedule_result: 1,
        createdAt: "2024-10-12T08:45:33.000",
        updatedAt: "2024-10-12T08:45:33.000",
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        patient_id: "ecb4b5a1-58f6-4b33-bc26-d8bca0c2f22e",
        schedule_start_time: 1730601000,
        schedule_end_time: 1730602800,
        status_id: 1,
        schedule_result: 1,
        createdAt: "2024-10-12T09:10:12.000",
        updatedAt: "2024-10-12T09:10:12.000",
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fh2a241",
        patient_id: "d1c344b0-23a6-4c15-9b5b-927f55f22ae4",
        schedule_start_time: 1730862000,
        schedule_end_time: 1730863800,
        status_id: 1,
        schedule_result: 1,
        createdAt: "2024-10-12T09:10:12.000",
        updatedAt: "2024-10-12T09:10:12.000",
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fh2a211",
        patient_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        schedule_start_time: 1730964600,
        schedule_end_time: 1730966400,
        status_id: 1,
        schedule_result: 2,
        createdAt: "2024-10-12T09:10:12.000",
        updatedAt: "2024-10-12T09:10:12.000",
      },
      {
        id: "7c28faba-d431-41db-a5a9-2dcb5fh2a211",
        patient_id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        schedule_start_time: 1730797200,
        schedule_end_time: 1730799000,
        status_id: 1,
        schedule_result: 1,
        createdAt: "2024-10-12T09:10:12.000",
        updatedAt: "2024-10-12T09:10:12.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("schedules", null, {});
  },
};
