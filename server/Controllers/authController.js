const User = require('../Models/userModel')
const bcrypt = require('bcrypt');
const knex = require('../config/knex');
const database = require('../config/database');
const Authen2 = require('../models/Authen2Model');
const jwt =require('jsonwebtoken');
const LoginGoogleService = require('../models/LoginGoogleService');
const loginGoogleService = require('../services/loginGoogleService');

class AuthenticationController {
    view(req, res) {
        res.render('authenLogin');
    }

    async Login(req, res) {
        await User.queryDB(User.findOnebyEmail(req.body.email))
        .then((user) => {
            if(user[0]) {
            console.log(user[0]);
            bcrypt.compare(req.body.passwword, user[0].password).then(same => {
                if(same) {
                    console.log('valid Username & password');
                    const accessToken = jwt.sign({
                        id: user[0].id,
                        email: user[0].email,
                        password: user[0].password
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: 30 * 100
                    }
                    )
                    const refreshToken = jwt.sign({
                        id: user[0].id,
                        email: user[0].email,
                        password: user[0].password
                    },
                    process.env.JWT_REFRESH_KEY,
                    {
                        expiresIn: 24 * 60 * 60 * 1000
                    }
                    )
                    console.log(accessToken, refreshToken);
                    this.insertToken(accessToken, refreshToken, user[0].id);
                    res.status(200).json({
                        token: accessToken,
                        refreshToken: refreshToken,
                        user: user[0].email,
                        message: 'Token added successfully'
                    })
                }
                else res. status(403).json({
                    message: 'Password mismatch',
                    success: false
                })
            })
        }
        else res.status(403).json({
            message: 'User mismatch',
            success: false
        })
    })
    .catch(err => {
        console.log(err);
        res.status(403).json({
          message: "Error",
        });
    })
    }
    async insertToken(accessToken, refreshToken, id) {
        await Authen2.insertDatatoDB({
            id: 1,
            user_id: id,
            accessToken: accessToken,
            refreshToken: refreshToken
        }, 'authen')
    }
    googleLogin(){
        loginGoogleService.loginGoogle;
    }
    callbackLoginGoogle(){
        loginGoogleService.callbackLoginGoogle;
    }
}


module.exports = new AuthenticationController();