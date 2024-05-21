const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: 'utf8'
})

connection.connect( async () => {
    try {
        console.log("Connected to MYSQL Server");
        await executeMigrations();
    }
    catch (err) {
        console.log(err);
    }
})


const executeMigrations = async () => {
        try {
            const migrationDir = "./sql";
            fs.readdir(migrationDir, (err, files) => {
                const migrationScript = fs.readFileSync(
                    path.join(migrationDir, files[0]),
                    "utf8"
                ).toString().split(';');
                migrationScript.forEach(async (query) => {
                    if (query.trim() !== '') {
                    await connection.query(query, (err,s) =>{
                        if(s){ 
                            console.log(`Migration script ${files} executed successfully`);
                            return true;
                        }
                        console.log(err);
                    })
                }
                })
                connection.end();
            })
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }


