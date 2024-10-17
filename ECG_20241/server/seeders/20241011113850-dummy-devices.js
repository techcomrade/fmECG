"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("devices", [
      {
        id: "2",
        doctor_id: "1",
        device_name: "Điện tim",
        information: "Thiết bị đo dữ liệu điện tim bà bầu",
        device_type_id: 1,
        status_id: 1,
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "3",
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
