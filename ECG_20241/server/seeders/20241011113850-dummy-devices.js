"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("devices", [
      {
        id: "2f9d99f0-4b5d-4e5e-9f93-2f9efb6a07c8",
        doctor_id: "1",
        device_name: "Điện tim",
        information: "Thiết bị đo dữ liệu điện tim bà bầu",
        device_type_id: 1,
        status_id: 1,
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "c5d4a567-e78a-4c56-b9d4-6f3c0b4ad7b8",
        doctor_id: "1",
        device_name: "Điện tim",
        information: "Thiết bị đo dữ liệu điện tim bà bầu",
        device_type_id: 1,
        status_id: 1,
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("devices", null, {});
  },
};
