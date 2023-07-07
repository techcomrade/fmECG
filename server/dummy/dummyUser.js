const User = require('../Models/userModel');

const createRandomPhoneNumber = () => {
  let phoneNumber = '0';
  for (let i = 0; i < 10; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
};

const createRandomDateOfBirth = () => {
  const startDate = new Date(1950, 0, 1); // Start date for generating random date of birth
  const endDate = new Date(2000, 11, 31); // End date for generating random date of birth
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return randomDate;
};

const createUsers = async (role, count) => {
  try {
    for (let i = 1; i <= count; i++) {
      const email = `${role === 0 ? 'patient' : 'doctor'}${i}@gmail.com`;
      const name = `${role === 0 ? 'Patient' : 'Doctor'} ${i}`;
      const phoneNumber = createRandomPhoneNumber();
      const dateOfBirth = createRandomDateOfBirth();

      await User.create({
        password: '123456abc',
        email,
        name,
        doB: dateOfBirth,
        phone_number: phoneNumber,
        role
      });
    }

    console.log('Users created successfully');
  } catch (error) {
    console.error('Error creating users:', error);
  }
};

const deleteAllUsers = async () => {
    try {
      await User.destroy({
        where: {}
      });
  
      console.log('All users deleted successfully');
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

module.exports = {deleteAllUsers, createUsers}
