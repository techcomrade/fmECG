const mysql = require('mysql');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const dotenv = require('dotenv');
const User = require('../Models/userModel');

// TODO(TuanHA): User dotenv to get env config instead of context data

exports.updateUserInfo = async (req, res) => {
  try {
    // Get the user ID from the authentication token
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'your-secret-key');
    const userId = decodedToken.userId;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ status: 'error', msg: 'User not found' });
    }

    // Update the user's information based on the provided fields
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.phone_number) {
      user.phone_number = req.body.phone_number;
    }
    if (req.body.doB) {
      user.doB = req.body.doB;
    }

    // Save the updated user
    await user.save();

    // Return the updated user with selected fields only
    const updatedUser = {
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      doB: user.doB
    };

    res.status(200).json({ status: 'success', data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while updating user information' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    // Get the user ID from the authentication token
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'your-secret-key');
    const userId = decodedToken.userId;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ status: 'error', msg: 'User not found' });
    }

    // Check if the provided current password matches the user's current password
    const currentPassword = req.body.currentPassword;
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ status: 'error', msg: 'Current password is incorrect' });
    }

    // Hash the new password
    const newPassword = req.body.newPassword;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ status: 'success', msg: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while changing the password' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // Get the user ID from the authentication token
    // Get the user ID from the authentication token
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'your-secret-key');
    const userId = decodedToken.userId;

    // Find the user by ID
    const user = await User.findByPk(userId, {
      attributes: ['name', 'email', 'dob', 'phone_number', 'role']
    });

    if (!user) {
      return res.status(404).json({ status: 'error', msg: 'User not found' });
    }

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving the user profile' });
  }
};

// TODO(TuanHA): Implement for API get all of current users support pagination 