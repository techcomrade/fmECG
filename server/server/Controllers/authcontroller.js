const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../Models/userModel');
const ResetToken = require('../Models/resetToken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../config.env') })

exports.register = async (req, res, next) => {
  try {
    const { password, confirm_password, name, email, doB, phone_number, role } = req.body;

    // Check if email is duplicated
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: 'error', msg: 'Email is already in use' });
    }

    // Check if password and confirm_password match
    if (password !== confirm_password) {
      return res.status(400).json({ status: 'error', msg: 'Passwords do not match' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      doB,
      phone_number,
      role,
    });

    // Remove password field from the response
    const { password: _password, ...userWithoutPassword } = newUser.dataValues;

    res.json({ status: 'success', data: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred during registration' });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ status: 'error', msg: 'Invalid email or password' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ status: 'error', msg: 'Invalid email or password' });
    }

    // Generate a token
    const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    const cookieOptions = {
      expires: new Date(
        Date.now() + 1000 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    console.log("The Token is " + token);
    // Remove password field from the user object
    const { password: _password, ...userWithoutPassword } = user.dataValues;

    // Set the token as a cookie
    res.cookie("jwt", token, cookieOptions);
 
    res.json({ status: 'success', token:token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred during login' });
  }
};

exports.logout = (req, res) => {
  try {
    // Check if the token cookie exists
    if (!req.cookies.token) {
      return res.status(401).json({ status: 'error', msg: 'No token found' });
    }

    // Clear the token cookie
    res.clearCookie('jwt');

    res.json({ status: 'success', msg: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred during logout' });
  }
};

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ status: 'error', msg: 'User not found' });
    }

    const resetToken = crypto.randomBytes(3).toString('hex');
    const resetTokenExpiration = Date.now() + 60*10000; // 10 minutes expiration

    // Save reset token and expiration in the ResetToken table
    await ResetToken.create({ userId: user.user_id, token: resetToken, expiration: resetTokenExpiration });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_HOST,
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) has requested to reset your password.\n\n`
        + `This is your reset password token:\n\n`
        + `${resetToken}\n\n`
        + `This token is valid for 10 minutes.\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', msg: 'An error occurred while sending the reset token email' });
      }
      console.log('Reset token email sent:', info.response);
      res.json({ status: 'success', msg: 'Reset token sent to email', resetToken});
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while resetting the password' });
  }
};

exports.resetPassword = async (req, res) => {
  try {

    const { resetToken, password, confirm_password, email } = req.body;

    // Check if the reset token exists and is associated with a user
    const resetTokenData = await ResetToken.findOne({ where: { token: resetToken } });

    // If reset token not found, return an error
    if (!resetTokenData) {
      return res.status(400).json({ status: 'error', msg: 'Invalid reset token' });
    }

    // Check if the reset token has expired
    if (resetTokenData.expiration < new Date()) {
      // Delete the expired reset token from the database
      await resetTokenData.destroy();
      return res.status(400).json({ status: 'error', msg: 'Reset token has expired' });
    }

    // Find the associated user by the reset token
    const user = await User.findOne({ where: { user_id: resetTokenData.userId } });

    // If user not found, return an error
    if (!user) {
      return res.status(404).json({ status: 'error', msg: 'User not found' });
    }

    // Check if the email in the request body matches the user's email
    if (user.email !== email) {
      return res.status(400).json({ status: 'error', msg: 'Invalid reset token' });
    }

    // Check if the password and confirm_password match
    if (password !== confirm_password) {
      return res.status(400).json({ status: 'error', msg: 'Password confirmation does not match' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and remove the reset token data
    user.password = hashedPassword;
    await user.save();
    await resetTokenData.destroy();

    res.json({ status: 'success', msg: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while resetting the password' });
  }
};