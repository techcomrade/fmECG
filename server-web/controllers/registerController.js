const Model = require('../models/CommonModel')
const knex = require('../config/knex');
const database = require('../config/database');
var regCtrl = {};
const User = new Model()
regCtrl.register = async function(req, res) {
    console.log(req.body);
    var data = await User.insertDatatoDB(req.body, 'account')
    try {
        if(data == true) {
            console.log('Register successful!!!');
            res.render('loginPage');
        } 
        else {
            console.log('Register fail!!!')
            res.redirect('/auth/register')
        }
    } 
    catch(err) {
            console.log(err);
            res.status(403).json({
                message: "Error"
            })
    }
}
    
module.exports = regCtrl.register;