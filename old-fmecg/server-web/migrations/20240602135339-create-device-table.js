'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("devices", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING,
        references:{
          model: 'users',
          key: 'id',
        },
      },
      doctor_id: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      device_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      information: {
        type: Sequelize.STRING,
        description: Sequelize.TEXT,
      },
      device_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      status:{
        type: Sequelize.INTEGER,
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
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('devices');
  }
};
