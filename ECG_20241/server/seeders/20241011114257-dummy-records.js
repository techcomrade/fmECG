"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("records", [
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a6",
        patient_id: "f7c1c6c7-a839-44c1-98e7-01b891f07c2f",
        device_id: "c3f13bb7-2d4e-493d-b9b9-dc831b5b748e",
        schedule_id: "f7c1c6c7-a839-44c1-98e7-01b891f07c2f",
        start_time: 1727794800,
        end_time: 1727794800,
        data_rec_url: "http://example.com/records",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        patient_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        device_id: "b9b4c2a9-dae9-4c19-bb8a-9a4f1e1bb5d3",
        schedule_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        start_time: 1727794800,
        end_time: 1727794800,
        data_rec_url: "http://example.com/records",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45ab",
        patient_id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        device_id: "ae4f7c10-5e36-4f9d-a02b-0a76f4d612e3",
        schedule_id: "9b2a5f71-23b7-47c8-b9b5-4a7d5e5f6d3b",
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
