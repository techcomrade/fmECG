const UserModel = require("../models/UserModel");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')

class UserController {
    async register(req, res) {
        const account = req.body;
        console.log(account);
        if(account.email && account.password)
        {
            const checkDuplicate = await UserModel.checkDuplicate(account.email);
            if(checkDuplicate)
            {
                return res.status(400).json("Email exist")
            }
            else
            {
                try 
                {
                    account.id = uuidv4();
                    const time = new Date();
                    account.create_time = time.toString();
                    account.password = await bcrypt.hash(account.password, 10);
                    UserModel.register(account)
                        .then(() => {
                            return res.status(200).json("Register successfully")
                        })
                        .catch( err => {
                            console.log(err)
                            return res.status(500).json("Register error")
                        })
                }
                catch(err)
                {
                    console.log(err)
                    return res.status(500).json("Register error")
                }
            }
        }
        else
        {
            return res.status(400).json("Register error")
        }
    }
}

module.exports = new UserController();