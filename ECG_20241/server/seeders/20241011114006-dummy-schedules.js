"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("schedules", [
      {
        id: "f7c1c6c7-a839-44c1-98e7-01b891f07c2f",
        patient_id: "f7c1c6c7-a839-44c1-98e7-01b891f07c2f",
        schedule_start_time: 1727794800,
        schedule_end_time: 1727794900,
        schedule_type_id: 1,
        status_id: 1,
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        patient_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        schedule_start_time: 1727794800,
        schedule_end_time: 1727794900,
        schedule_type_id: 1,
        status_id: 1,
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
      {
        id: "9b2a5f71-23b7-47c8-b9b5-4a7d5e5f6d3b",
        patient_id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        schedule_start_time: 1727800000,
        schedule_end_time: 1727800600,
        schedule_type_id: 2,
        status_id: 1,
        createdAt: "2024-10-12T08:45:33.000",
        updatedAt: "2024-10-12T08:45:33.000",
      },
      {
        id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        patient_id: "ecb4b5a1-58f6-4b33-bc26-d8bca0c2f22e",
        schedule_start_time: 1727801000,
        schedule_end_time: 1727801600,
        schedule_type_id: 1,
        status_id: 1,
        createdAt: "2024-10-12T09:10:12.000",
        updatedAt: "2024-10-12T09:10:12.000",
      },
      {
        id: "bfa4d42e-73b6-4c9b-9ae3-8fced0a2a876",
        patient_id: "d1c344b0-23a6-4c15-9b5b-927f55f22ae4",
        schedule_start_time: 1727805000,
        schedule_end_time: 1727805600,
        schedule_type_id: 2,
        status_id: 1,
        createdAt: "2024-10-12T10:50:12.000",
        updatedAt: "2024-10-12T10:50:12.000",
      },
      {
        id: "d34f6b1a-87ad-4b64-abc5-3b22a7e5e79c",
        patient_id: "e0b5b67e-d69f-4ad8-b922-83cfc2d7ac2f",
        schedule_start_time: 1727810000,
        schedule_end_time: 1727810600,
        schedule_type_id: 1,
        status_id: 1,
        createdAt: "2024-10-12T12:20:18.000",
        updatedAt: "2024-10-12T12:20:18.000",
      },
      {
        id: "ba5b9fd2-e94b-4bb9-96d6-4d742fe2394f",
        patient_id: "d1c344b0-23a6-4c15-9b5b-927f55f22ae4",
        schedule_start_time: 1727815000,
        schedule_end_time: 1727815600,
        schedule_type_id: 2,
        status_id: 1,
        createdAt: "2024-10-12T14:15:45.000",
        updatedAt: "2024-10-12T14:15:45.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("schedules", null, {});
  },
};
