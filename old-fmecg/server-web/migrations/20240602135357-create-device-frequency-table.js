'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("device_details", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      device_id: {
        type: Sequelize.STRING,
        references: {
          model: 'devices',
          key: 'id',
        },
      },
      detail_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      information: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      detail_type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.BIGINT,
      },
      updated_at: {
        type: Sequelize.BIGINT,
      },
      dummy_data: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('device_details');
  }
};
