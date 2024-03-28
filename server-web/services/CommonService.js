const sequelize = require('../config/sequelize')
const Joi = require("joi");

class CommonService{
    async transaction (callback){
        const t = await sequelize.transaction();
      try {
        await callback(t); // Execute the provided callback within the transaction
        await t.commit(); // Commit the transaction
        console.log('Transaction successful.');
        return true;
      } catch (error) {
        await t.rollback(); // Roll back the transaction on error
        // console.error('Error during transaction:', error.message);
        throw error;
      }
      }
    validateId (id) {
      const schema = Joi.object({
        id: Joi.string().guid({ version: 'uuidv4' }).required()
    })
    return schema.validate(id);
    }
}

module.exports = CommonService;
