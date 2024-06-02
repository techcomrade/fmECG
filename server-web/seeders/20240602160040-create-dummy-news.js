"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("news", [
      {
        id: '65sd8373-78gc-b38s-77sg-2hj7hd890b2s',
        title: 'Dr Strange',
        content: 'Hello world',
        category_id: 'b5dc2e2a-dcb1-4903-9054-02e242f5cd55',
        author: 'quyen',
        url: 'https://www.youtube.com/watch?v=mvATWl8ZJwU',
        image: '012012120abd',
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '0dc699f3-15a1-42f6-8199-35b122d3e48f',
        title: 'Dr Fate',
        content: 'Hi world',
        category_id: '1272d710-00ab-4e40-b740-60eb6df36354',
        author: 'duong',
        url: 'https://www.youtube.com/watch?v=1zAHkRGJ0s8',
        image: '102120abde',
        created_at: '1711122410782',
        updated_at: '1711122410782'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("news", null, {});
  },
};
