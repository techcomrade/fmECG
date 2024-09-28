'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('accounts', [
      {
        id: '86d1470c-de72-457c-a8e1-a616e55f463f',
        email: 'duong123@gmail.com',
        password: '$2b$10$vrYT1waVBk3VNXdHB1dQbOdwtKIyUoQ04wMpfcSWTPnK5S0oAg4ci'
      },
      {
        id: '1bd51bda-3179-4f27-bcfd-000e5c4a2aa7',
        email: 'quyen123@gmail.com',
        password: '$2b$10$IMi9aW1ZrYES62fFyzW5OeMhPk.7ohLy4mmE58WRKVfrNLxVmfClS'
      },
      {
        id: '83573421-9943-4a25-9fe1-00f0477aaba4',
        email: 'dung123@gmail.com',
        password: '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG'
      },
      {
        id: '22183931-6fc3-4518-af34-e86c8605b08a',
        email: 'uuidd@gmail.com',
        password: '$2b$10$a7binaajgY8b3s82rppXHecKuSbcFi1ULGf0v4B/aIaMplhLbbNwC'
      },
      {
        id: '83573421-9943-4a25-9fe1-00f0477aaba9',
        email: 'dung@gmail.com',
        password: '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG'
      },
      {
        id: '83573421-9943-4a25-9fe1-00f0477aaba8',
        email: 'dung1@gmail.com',
        password: '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG'
      },
      {
        id: '83573421-9943-4a25-9fe1-00f0477aaba6',
        email: 'dung2@gmail.com',
        password: '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG'
      },
      {
        id: '83573421-9943-4a25-9fe1-00f0477aaba5',
        email: 'dung3@gmail.com',
        password: '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG'
      },
      {
        id: '83573421-9943-4a25-9fe1-00f0477aaba2',
        email: 'dung4@gmail.com',
        password: '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG'
      },
      {
        id: '83573421-9943-4a25-9fe1-00f0477aaba1',
        email: 'dung5@gmail.com',
        password: '$2b$10$TOMgOvO7oDnVqPlFpi9hwu2qHhxtSb1ia2chhb1zVYxfgb9F089TG'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
