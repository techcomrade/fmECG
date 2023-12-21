const User = require('../Models/UserModel');
const registerControllerService = require('../services/registerGoogleService');

class UserController {
    view(req, res) {
        res.render('register');
    }

    async store(req, res) {
        let data = req.body;
        await User.queryDB(User.findOnebyEmail(data.email))
        .then(async (checked) => {
            if(!checked) {
                let isAdded = await User.insertDatatoDB(data, 'user');
                if(isAdded) {
                    res.status(200).json({
                        success: true,
                        message: 'User added successfully'
                    })
                }
                else res.status(403).json({
                    success: false,
                    message: 'User added falied '
                })
            }
            else res.status(403).json({
                success: false,
                message: 'User has already been added'
            })
        })
    }
    registerGoogle(){
        registerControllerService.registerGoogle;
    }
    callbackGoogleRegister(){
        registerControllerService.callbackRegisterGoogle;
    }
}


module.exports = new UserController();