const knex = require('../config/knex')
const sequelize = require('../config/sequelize')
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
}

module.exports = CommonService;
