const accountModel = require('../models/accountModel')

class accountController {
    register(req, res) {
        res.render('register')
    }
    async newAccount(req, res) {
        if(req.body) {
            await accountModel.insertUserToDB(req.body)
            .then(() => {
                console.log('Register successfully!!!')
                res.render('loginPage')
            })
            .catch((err) => {
                console.log(err)
                res.redirect('/user/register')
            })
        }
    }
}

module.exports = new accountController();