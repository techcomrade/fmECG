"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("device_details", [
      {
        id: "ad92b610-4eb3-47b9-9f35-7a3dbb4a2361",
        device_id: "8d4377d3-8c4d-43c4-bb29-207c5cf074e1",
        detail_name: "Thai kỳ cho chị Nguyễn A",
        value: "None",
        information: "None",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "ad92b610-4eb3-47b9-9f35-7a3dbb4a2364",
        device_id: "ae4f7c10-5e36-4f9d-a02b-0a76f4d612e3",
        detail_name: "Tim thai cháu CD",
        value: "None",
        information: "None",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "ad92b610-4eb3-47b9-9f35-7a3dbb4a2367",
        device_id: "ad92b610-4eb3-47b9-9f35-7a3dbb4a2364",
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
