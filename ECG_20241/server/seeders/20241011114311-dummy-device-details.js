"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("device_details", [
      {
        id: "1",
        device_id: "3",
        detail_name: "Thai kỳ cho chị Nguyễn A",
        value: "None",
        information: "None",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "2",
        device_id: "2",
        detail_name: "Tim thai cháu CD",
        value: "None",
        information: "None",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "3",
        device_id: "3",
        detail_name: "Điện tim ông B",
        value: "None",
        information: "None",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("device_details", null, {});
  },
};
