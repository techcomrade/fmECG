const connection = require('./mysql')
const migration = require('./migration');

class createDatabase{
    async create(name) {
        try {
            const dropDatabase = `DROP DATABASE IF EXISTS ${name}`;
            connection.query(dropDatabase, () => {
                const createDatabaseQuery = 
                `CREATE DATABASE ${name};`;
                connection.query(createDatabaseQuery, () => {
                    console.log(`Database ${name} created successfully`);
                    connection.query(`USE ${name}`, () => {
                        console.log("Database selected");
                        migration
                        .executeMigrations()
                        .then((result) => {
                            console.log(result);
                        })
                        .catch((err) => {
                            console.log(err);
                            return false;
                        });
                    });
                });
            });
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = new createDatabase();