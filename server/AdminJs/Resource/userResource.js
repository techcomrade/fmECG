const User = require('../../Models/userModel.js');

const UserResource = {
  resource: User,
  options: {
    parent: null,
    navigation: false,
    properties: {
      user_id: {
        position: 1,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      name: {
        position: 2,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      email: {
        position: 3,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      phone_number: {
        position: 4,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      doB: {
        position: 5,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      role: {
        position: 6,
        isVisible: { list: true, edit: false, filter: true, show: true },
        isRequired: true,
        availableValues: [
          { value: 0, label: 'Patient' },
          { value: 1, label: 'Doctor' },
          { value: 2, label: 'Admin' },
        ],
      },
    },

  },

};

module.exports = UserResource

