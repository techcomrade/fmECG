"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("patient_doctor_assignment", [
      {
        id: 'aec18bd6-a2eb-4521-99fd-f00d867a849f',
        patient_id: '37ae5629-54ec-46e0-be65-9af6bd580b2b',
        doctor_id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        start_date: '1711189128343',
        end_date: '1711189128943',
        created_at: '1711173634732',
        updated_at: '1711173634732'
      },
      {
        id: 'd5e62f91-8314-43a7-931a-8d05607116bb',
        patient_id: '37ae5629-54ec-46e0-be65-9af6bd500b3b',
        doctor_id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        start_date: '1711204367820',
        end_date: '1711189129343',
        created_at: '1711198367820',
        updated_at: '1711200678260'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd580b2b',
        patient_id: '37ae5629-54ec-46e0-be65-9af6bd580b3b',
        doctor_id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        start_date: '1711204367820',
        end_date: '1711189129343',
        created_at: '1711198367820',
        updated_at: '1711200678260'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd180b3b',
        patient_id: '37ae5629-54ec-46e0-be65-9af6bd580b4b',
        doctor_id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        start_date: '1711204367820',
        end_date: '1711189129343',
        created_at: '1711198367820',
        updated_at: '1711200678260'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd510b2b',
        patient_id: '37ae5629-54ec-46e0-be65-9af6bd510b2b',
        doctor_id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        start_date: '1711204367820',
        end_date: '1711189129343',
        created_at: '1711198367820',
        updated_at: '1711200678260'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd680b2b',
        patient_id: '37ae5629-54ec-46e0-be65-9af6bd680b2b',
        doctor_id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        start_date: '1711204367820',
        end_date: '1711189129343',
        created_at: '1711198367820',
        updated_at: '1711200678260'
      },
      {
        id: '37ae5629-54ec-46e0-be45-9af6bd580b2b',
        patient_id: '37ae5629-54ec-46e0-be45-9af6bd580b2b',
        doctor_id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        start_date: '1711204367820',
        end_date: '1711189129343',
        created_at: '1711198367820',
        updated_at: '1711200678260'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("patient_doctor_assignment", null, {});
  },
};
