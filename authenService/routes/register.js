const express = require('express');
const loginController = require('../controllers/loginController');
const authController = require('../controllers/authController');
const passport = require('passport')
const registerController = require('../controllers/registerController');
const StoreUserController = require('../controllers/StoreUserController');
require('../passport_register')

let router = express.Router();
router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

router.get('/auth/facebook/login',
	  passport.authenticate('facebook', {successRedirect : '/', failureRedirect: '/login' }),
	  function(req, res) {
	    res.render('authenLogin');
	  });
router.get('/', function(req, res){
        res.render('loginFacebook', { user: req.user });
      });


//register
router.get('/register', registerController);
router.post('/user/register', StoreUserController.store);

///registerwithGoogle
router.get('/auth/register/google', passport.authenticate('google', {
	scope: ['profile', 'email']
	}));
router.get('/auth/register/google/callback', passport.authenticate('google',{
	successRedirect: '/api/login',
	failureRedirect: '/register',
	//failureMessage: 'register failed'
	}));
module.exports = router;