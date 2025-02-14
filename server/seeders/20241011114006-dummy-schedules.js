"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("schedules", [
      {
        id: "089726fe-9153-46c6-8557-26ebaec0567f",
        patient_id: "c3d4e5f6-a7b8-9012-3456-789012cdefab5g6",
        schedule_start_time: 1739505600,
        schedule_end_time: 1739507400,
        status_id: 2,
        schedule_result: 2,
        createdAt: "2025-02-06T09:51:29.000",
        updatedAt: "2025-02-06T09:51:29.000"
      },
      {
        id: "10226b17-5833-4508-9b6a-9ed16ecfc6ae",
        patient_id: "d4e5f6a7-b8c9-0123-4567-890123defabc765",
        schedule_start_time: 1738832400,
        schedule_end_time: 1738834200,
        status_id: 1,
        schedule_result: 0,
        createdAt: "2025-02-06T08:48:49.000",
        updatedAt: "2025-02-06T09:30:00.000"
      },
      {
        id: "1f71682d-731d-4711-b504-ca3b32fe7f46",
        patient_id: "f6a7b8c9-d0e1-2345-6789-012345fabcdef34",
        schedule_start_time: 1739170800,
        schedule_end_time: 1739172600,
        status_id: 1,
        schedule_result: 2,
        createdAt: "2025-02-06T07:01:06.000",
        updatedAt: "2025-02-06T07:04:04.000"
      },
      {
        id: "3f5877ca-f951-4b1c-8e7c-f9d016aeba73",
        patient_id: "d4e5f6a7-b8c9-0123-4567-890123defabc765",
        schedule_start_time: 1738830600,
        schedule_end_time: 1738832400,
        status_id: 1,
        schedule_result: 2,
        createdAt: "2025-02-06T08:39:35.000",
        updatedAt: "2025-02-06T08:39:56.000"
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        patient_id: "ecb4b5a1-58f6-4b33-bc26-d8bca0c2f22e",
        schedule_start_time: 1730601000,
        schedule_end_time: 1730602800,
        status_id: 1,
        schedule_result: 1,
        createdAt: "2024-10-12T09:10:12.000",
        updatedAt: "2024-10-12T09:10:12.000"
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fh2a211",
        patient_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        schedule_start_time: 1730964600,
        schedule_end_time: 1730966400,
        status_id: 1,
        schedule_result: 2,
        createdAt: "2024-10-12T09:10:12.000",
        updatedAt: "2024-10-12T09:10:12.000"
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fh2a241",
        patient_id: "d1c344b0-23a6-4c15-9b5b-927f55f22ae4",
        schedule_start_time: 1730862000,
        schedule_end_time: 1730863800,
        status_id: 1,
        schedule_result: 1,
        createdAt: "2024-10-12T09:10:12.000",
        updatedAt: "2024-10-12T09:10:12.000"
      },
      {
        id: "7c28faba-d431-41db-a5a9-2dcb5fh2a211",
        patient_id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        schedule_start_time: 1730797200,
        schedule_end_time: 1730799000,
        status_id: 1,
        schedule_result: 1,
        createdAt: "2024-10-12T09:10:12.000",
        updatedAt: "2024-10-12T09:10:12.000"
      },
      {
        id: "83710b32-ecae-41ab-bd63-e25a054bc6ce",
        patient_id: "d4e5f6a7-b8c9-0123-4567-890123defabc765",
        schedule_start_time: 1738828800,
        schedule_end_time: 1738830600,
        status_id: 1,
        schedule_result: 2,
        createdAt: "2025-02-06T08:22:38.000",
        updatedAt: "2025-02-06T08:23:09.000"
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("schedules", null, {});
  },
};
