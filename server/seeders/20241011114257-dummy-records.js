"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("records", [
      {
        id: "f86068c7-08ed-4dfc-b96d-e0e1c0ae09d1",
        patient_id: "4",
        device_id: "2f9d99f0-4b5d-4e5e-9f93-2f9efb6a07c8",
        schedule_id: "1",
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a6",
        patient_id: "f7c1c6c7-a839-44c1-98e7-01b891f07c2f",
        device_id: "2f9d99f0-4b5d-4e5e-9f93-2f9efb6a07c8",
        schedule_id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        start_time: 1728529200,
        end_time: 1728536400,
        data_rec_url: "C:\\Users\\GnoudNeyugn\\Project\\fmECG\\server\\src\\public\\upload\\2f9d99f0-4b5d-4e5e-9f93-2f9efb6a07c8-1728529200-dung_test.csv",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        patient_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        device_id: "c5d4a567-e78a-4c56-b9d4-6f3c0b4ad7b8",
        schedule_id: "9b2a5f71-23b7-47c8-b9b5-4a7d5e5f6d3b",
        start_time: 1728543600,
        end_time: 1728547200,
        data_rec_url: "C:\\Users\\GnoudNeyugn\\Project\\fmECG\\server\\src\\public\\upload\\c5d4a567-e78a-4c56-b9d4-6f3c0b4ad7b8-1728543600-duong_test.csv",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45ab",
        patient_id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        device_id: "c5d4a567-e78a-4c56-b9d4-6f3c0b4ad7b8",
        schedule_id: "9b2a5f71-23b7-47c8-b9b5-4a7d5e5f6d3b",
        start_time: 1728543600,
        end_time: 1728546000,
        data_rec_url: "C:\\Users\\GnoudNeyugn\\Project\\fmECG\\server\\src\\public\\upload\\c5d4a567-e78a-4c56-b9d4-6f3c0b4ad7b8-1728543600-quyen_test.csv",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("records", null, {});
  },
};
