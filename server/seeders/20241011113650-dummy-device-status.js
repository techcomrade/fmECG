"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("device_status", [
      {
        id: 1,
        status_description: "active",
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
      {
        id: 2,
        status_description: "inactive",
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("device_status", null, {});
  },
};
