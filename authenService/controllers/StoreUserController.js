const User = require('../models/UserModel')
var UserModel = {}

UserModel.store = async (req, res) => {
    let data = req.body;
    console.log(data);
    await User.queryDB(User.findOnebyEmail(data.email))
    .then(async (checked) => {
        console.log(checked);
        if(!checked) {
            let isAdded =  await User.insertDatatoDB(data, 'user');
            if(isAdded) {
                res.status(200).json({
                    success: true,
                    message: 'User added successfully'
                    })
            }
            else res.status(404).json({
                success: false,
                message: 'User added failed'
            })
        }
        else res.status(404).json({
            success: false,
            message: 'User has already been added'
        })
    })
   
   
}

module.exports = UserModel;