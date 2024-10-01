'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("news_categories", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_description: {
        type: Sequelize.STRING,
        allowNull: false,
        description: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.BIGINT
      },
      updated_at: {
        type: Sequelize.BIGINT
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('news_categories');
  }
};
