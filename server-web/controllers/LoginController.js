const knex = require('../config/knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = require('../config/database');
const User = require('../models/UserModel');
const Authen2 = require('../models/AuthenModel');

class LoginController {
    constructor() {
        this.login = this.login.bind(this);
        this.insertToken = this.insertToken.bind(this);
    }
    async login(req, res, next) {
        await User.queryDB(User.findOneById(req.body.id))
        .then((user) => {
            if(user[0]){
                // console.log(user[0]);
                bcrypt.compare(req.body.pass, user[0].pass)
                .then((same) => {
                    if(same){
                        const token = jwt.sign({
                            id: user[0].id,
                            email: user[0].email,
                            pass: user[0].pass
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: 30 * 100
                        }
                        )
                    this.insertToken(token, user[0].id);
                    res.status(200).json({
                        token: token,
                        user: user[0].email,
                        message: 'Token added successfully'
                    })    
                    }
                })
            }
            else res.status(403).json({
                message: 'invalid id'
            })
        })
        .catch((error) => {
            console.error(error);
            res.status(403).json({message: 'error'});
        });
    }

    async insertToken(token, id){
        await Authen2.insertDatatoDB({
            id: id,
            token: token
        }, 'token')
    }
  }
  
  module.exports = new LoginController();