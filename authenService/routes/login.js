const express = require('express');
const loginController = require('../controllers/loginController');
const authController = require('../controllers/authController');
const passport = require('passport')
const registerController = require('../controllers/registerController');
const StoreUserController = require('../controllers/StoreUserController');

require('../passport_login')

let router = express.Router();

//login
router.get('/login', loginController);
router.post('/auth/login', authController.login);

router.get('/auth/google', passport.authenticate('google', {
	scope: ['profile', 'email']
  }));
router.get('/auth/google/callback', passport.authenticate('google', {
	successRedirect: '/',
	failureRedirect: '/api/login'
  }));

module.exports = router;