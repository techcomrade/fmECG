const CommonModel = require('./commonModel');
const bcrypt = require('bcrypt')

class AccountModel extends CommonModel {
    async insertUserToDB(dataInsert) {
        const AccountExist = await this.checkDuplicate('account', 'email', dataInsert.email)
        if(AccountExist) {
            throw new Error("Email đã tồn tại, vui lòng sử dụng email khác!!!")
        }
        else {
            try {
                if(dataInsert) {
                    console.log(dataInsert)
                    bcrypt.hash(dataInsert.password, 10, async (err, hash) => {
                        if(err) throw err;
                        dataInsert.password = hash;
                        return await this.queryDB(
                            `INSERT INTO account (email, password) VALUES ('${dataInsert.email}', '${dataInsert.password}')`
                        );
                    })
                }
            }
            catch(err) { 
                console.error(err); 
            }    
        }
    }
}    

module.exports = new AccountModel();