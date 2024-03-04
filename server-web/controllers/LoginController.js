const knex = require('../config/knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = require('../config/database');
const User = require('../models/UserModel');
const Authen2 = require('../models/AuthenModel');

var authCtrl = {};

authCtrl.insertToken  = async (token) => {
    await Authen2.insertDatatoDB({
        id: 1,
        token: token
    }, 'token');
}

authCtrl.login = async (req, res) => {
    
}

module.exports = authCtrl.login;