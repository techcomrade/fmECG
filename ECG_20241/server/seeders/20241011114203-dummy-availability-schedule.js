"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("recurring_schedule", [
      {
        id: "1",
        user_id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        available_time: 1727794800,
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "2",
        user_id: "d1c344b0-23a6-4c15-9b5b-927f55f22ae4",
        available_time: 1727794800,
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recurring_schedule", null, {});
  },
};
