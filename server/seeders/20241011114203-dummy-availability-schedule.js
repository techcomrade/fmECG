"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("availability_schedule", [
      {
        id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb6",
        user_id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        available_times: JSON.stringify([
          { day: "Monday", start: "08:00", end: "10:00" },
          { day: "Wednesday", start: "14:00", end: "16:00" },
        ]),
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "d1r344b0-23a6-4c15-9b5b-927f55f22sfsdfaea",
        user_id: "d1c344b0-23a6-4c15-9b5b-927f55f22ae4",
        available_times: JSON.stringify([
          { day: "Monday", start: "08:00", end: "10:00" },
          { day: "Wednesday", start: "12:00", end: "16:00" },
        ]),
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "d1cg44b0-23a6-4c15-9b5b-927f55f22aeafsdsf",
        user_id: "ecb4b5a1-58f6-4b33-bc26-d8bca0c2f22e",
        available_times: JSON.stringify([
          { day: "Monday", start: "08:00", end: "10:00" },
          { day: "Thursday", start: "17:00", end: "17:30" },
        ]),
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "d1c344b0-23a6-4c15-9b5b-927f55f22ae2sdf",
        user_id: "d1c344b0-23a6-4c15-9b5b-927f55f22ae4",
        available_times: JSON.stringify([
          { day: "Monday", start: "08:00", end: "10:00" },
          { day: "Friday", start: "12:00", end: "16:00" },
        ]),
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recurring_schedule", null, {});
  },
};
