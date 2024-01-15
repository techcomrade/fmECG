const express = require('express');
const authCtrl = require('../Controllers/authController')
const homeController = require('../Controllers/homeController');
let router = express.Router();
// const {} = require ('')
// const { indexView } = require('../Controllers/homeController.js');

// const authcontroller = require('../Controllers/authcontroller');

// route.use('/', authcontroller.islogin);
// route.get('/', indexView);

router.get('/login', homeController.login);
router.post('/login/store', authCtrl.login);
module.exports = router;