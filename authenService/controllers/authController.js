const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const knex = require('../config/knex');
const database = require('../config/database');
const Authen2 = require('../models/Authen2Model');
const jwt =require('jsonwebtoken');
var authCtrl = {};

authCtrl.insertToken = async function(accessToken, refreshToken) {
    await Authen2.insertDatatoDB({
        id: 1,
        accessToken: accessToken,
        refreshToken: refreshToken
    }, 'authen')
}

authCtrl.login = async function(req, res) {
    console.log(req.body);
    await User.queryDB(User.findOnebyEmail(req.body.email))
    .then((user) => {
        console.log(user[0]);
        if(user[0]) {
            console.log(user[0]);
            bcrypt.compare(req.body.password, user[0].password, (err, same) => {
                if(err) throw err;
                if(same) {
                    console.log("Valid Username && Password");
                    const accesToken = jwt.sign({
                        id: user[0].id,
                        email: user[0].email, 
                        password: user[0].password
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "30s"
                    }
                    )
                    const refreshToken = jwt.sign({
                        id: user[0].id,
                        email: user[0].email,
                        password: user[0].password
                    },
                    process.env.JWT_REFRESH_KEY,
                    {
                        expiresIn: "24h"
                    }
                    )
                    console.log(accesToken, refreshToken);
                    authCtrl.insertToken(accesToken, refreshToken);
                    res.status(200).json({
                        token: accesToken,
                        refreshToken: refreshToken,
                        user: user[0].email,
                        message: "Token added successfully"
                    })
                }
                else res.status(403).json({
                    message: "Password mismatch"
                })
        })
    }
        else res.status(403).json({
            message: "User_email mismatch"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(403).json({
            message: "Error"
        })
    }) 
}

module.exports = authCtrl.login;