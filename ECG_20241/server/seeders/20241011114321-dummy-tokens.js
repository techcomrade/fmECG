"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tokens", [
      {
        id: "ae4f7c10-5e36-4f9d-a02b-0a76f4d612e3",
        account_id: "ae4f7c10-5e36-4f9d-a02b-0a76f4d612e3",
        access_token: "abc",
        refresh_token: "cde",
        expires_at: 1727794800,
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tokens", null, {});
  },
};
