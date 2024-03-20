const knex = require('../config/knex')

class CommonService{
    async tranctionSQL(callback){
        const execute = await knex.transaction();
        try{
            await callback(execute);
            await execute.commit();
            console.log('Transaction successful');
        }
        catch(err)
        {
            await execute.rollback(); // Rollback the transaction if an error occurs
            console.error('Transaction error:', err);
            throw err; // Propagate the error to the caller
        }
        finally
        {
            await knex.destroy();
        }
    }
}

module.exports = CommonService;
