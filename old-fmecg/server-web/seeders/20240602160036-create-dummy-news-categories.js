"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("news_categories", [
      {
        id: 'b5dc2e2a-dcb1-4903-9054-02e242f5cd55',
        category_name: 'Marvellous',
        category_description: 'some_crazy_thing',
        created_at: '1711118359957',
        updated_at: '1711118359957'
      },
      {
        id: '1272d710-00ab-4e40-b740-60eb6df36354',
        category_name: 'DC',
        category_description: 'some_mad_thing',
        created_at: '1711118359957',
        updated_at: '1711118359957'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("news_categories", null, {});
  },
};
