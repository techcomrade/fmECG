const accountModel = require('../models/accountModel')
const { v4: uuidv4 } = require('uuid');
const brcypt = require('bcrypt')

class accountController {
    renderRegister(req, res) {
        res.render('register')
    }
    async newAccount(req, res) {
        const account = req.body;
        console.log(account);
        if(account.email && account.password) {
            const checkEmailExist = await accountModel.checkDuplicate(account.email)
            if(checkEmailExist)
                return res.status(400).json("Exist email")
            else
            {
                try {
                    account.create_time = new Date()
                    const create_time = account.create_time.toString();
                    account.id = uuidv4();
                    account.password = await brcypt.hash(account.password, 10);
                    accountModel.register(account, create_time)
                    .then(() => {
                        return res.status(200).json("Register successfully")
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json("Register error")
                    })
                }
                catch(err) {
                    console.log(err);
                    return res.status(500).json("Register error")
                } 
            }
        }
    }
}

module.exports = new accountController();