"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("accounts", [
      {
        id: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
        email: "codung3@gmail.com",
        password:
          "$2b$10$Ik0hw6bg4EVB1zmcNLs.suAsvW6oi8jEY7R/xw2.dP7xZoedvUwSO",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("accounts", null, {});
  },
};
