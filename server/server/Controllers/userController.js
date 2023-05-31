const mysql = require('mysql');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../Models/userModel');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

exports.updateUserInfo = async (req, res) => {
  try {
    // Get the user ID from the authentication token
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
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
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
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

    // Check if the new password matches the confirm password
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ status: 'error', msg: 'New password and confirm password do not match' });
    }

    // Hash the new password
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
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the user by ID
    const user = await User.findByPk(userId, {
      attributes: ['user_id', 'name', 'email', 'dob', 'phone_number', 'role'] // Add 'user_id' to the attributes
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



exports.getAllUsers = async (req, res) => {
  try {
    // Check if the user is authenticated and has admin rights
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken || decodedToken.role !== 2) {
      return res.status(401).json({ status: 'error', msg: 'Unauthorized' });
    }

    // Pagination and limit parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Fetch users from the database with pagination and limit
    const result = await User.findAndCountAll({
      attributes: ['name', 'email', 'dob', 'phone_number', 'role'],
      limit: limit,
      offset: offset,
    });

    const users = result.rows;
    const count = result.count;

    res.status(200).json({ status: 'success', data: { users, count } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while fetching user information' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    let userId;

    // Check if the user ID is provided in the request parameter
    if (req.params.userId) {
      userId = req.params.userId;
    }
    // If the user ID is not in the request parameter, check the request body
    else if (req.body.userId) {
      userId = req.body.userId;
    }
    // If the user ID is not provided in either the parameter or body, return an error
    else {
      return res.status(400).json({ status: 'error', msg: 'User ID not provided' });
    }

    // Get the user role from the authentication token
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decodedToken.role;

    // Check if the user role is doctor (1) or admin (2)
    if (userRole !== 1 && userRole !== 2) {
      return res.status(403).json({ status: 'error', msg: 'Unauthorized access' });
    }

    // Find the user by ID
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['password'] // Exclude the 'password' field from the retrieved data
      }
    });

    if (!user) {
      return res.status(404).json({ status: 'error', msg: 'User not found' });
    }

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving the user information' });
  }
};

