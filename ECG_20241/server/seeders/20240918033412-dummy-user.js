"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("users", [
      {
        id: "8bc6ff0c-5708-4783-9e2b-a2bb7da7aa2b",
        account_id: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
        status: 1,
        username: "dung",
        gender: 1,
        phone_number: "0774333060",
        information: "GOOD",
        role: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
