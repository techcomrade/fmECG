const knex = require("../config/knex.js");
const sequelize = require("../config/sequelize");

class CommonModel {
  async executeQuery(sql) {
    try {
      let data = await knex.raw(sql);
      if (data[0]) return data[0];
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async transaction (callback){
    const t = await sequelize.transaction();
  try {
    await callback(t); // Execute the provided callback within the transaction
    await t.commit(); // Commit the transaction
    console.log('Transaction successful.');
  } catch (error) {
    await t.rollback(); // Roll back the transaction on error
    console.error('Error during transaction:', error.message);
  }
  }
}
module.exports = CommonModel;

