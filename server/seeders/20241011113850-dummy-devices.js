"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("devices", [
      {
        id: "2f9d99f0-4b5d-4e5e-9f93-2f9efb6a07c8",
        user_id: "b067fcbc-c471-4898-a3f7-850b27d40797",
        device_name: "Điện tim 1",
        information: "Thiết bị đo dữ liệu điện tim bà bầu",
        device_type_id: 1,
        status_id: 1,
        start_time: 1735869600,
        end_time: 1735914600,
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "c5d4a567-e78a-4c56-b9d4-6f3c0b4ad7b8",
        user_id: "de5824b0-781b-4ad5-943b-604714fd9113",
        device_name: "Điện tim 2",
        information: "Thiết bị đo dữ liệu điện tim bà bầu",
        device_type_id: 1,
        status_id: 1,
        start_time: 1733191200,
        end_time: 1733236200,
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "f5d6c7f1-4a24-4b2d-bf50-1e3bfa4d987c",
        user_id: "de5824b0-781b-4ad5-943b-604714fd9113",
        device_name: "Máy đo huyết áp",
        information: "Thiết bị đo huyết áp tự động",
        device_type_id: 2,
        status_id: 1,
        start_time: 1735781400,
        end_time: 1735828200,
        createdAt: "2024-10-10T10:20:45.000",
        updatedAt: "2024-10-10T10:20:45.000"
    },
    {
        id: "ad92b610-4eb3-47b9-9f35-7a3dbb4a2364",
        user_id: "9dc38d89-55d1-4d41-8bfb-c885bc6ff0be",
        device_name: "Máy đo đường huyết",
        information: "Thiết bị đo chỉ số đường huyết trong máu",
        device_type_id: 1,
        status_id: 2,
        start_time: null,
        end_time: null,
        createdAt: "2024-10-10T11:30:12.000",
        updatedAt: "2024-10-10T11:30:12.000"
    },
    {
        id: "c3f13bb7-2d4e-493d-b9b9-dc831b5b748e",
        user_id: "9dc38d89-55d1-4d41-8bfb-c885bc6ff0be",
        device_name: "Máy đo nhịp tim 1",
        information: "Thiết bị theo dõi nhịp tim",
        device_type_id: 1,
        status_id: 2,
        start_time: null,
        end_time: null,
        createdAt: "2024-10-11T08:45:33.000",
        updatedAt: "2024-10-11T08:45:33.000"
    },
    {
        id: "b9b4c2a9-dae9-4c19-bb8a-9a4f1e1bb5d3",
        user_id: "9dc38d89-55d1-4d41-8bfb-c885bc6ff0be",
        device_name: "Máy đo nhịp tim 2",
        information: "Thiết bị theo dõi nhịp tim",
        device_type_id: 2,
        status_id: 2,
        start_time: null,
        end_time: null,
        createdAt: "2024-10-11T09:00:12.000",
        updatedAt: "2024-10-11T09:00:12.000"
    },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("devices", null, {});
  },
};
