const path = require('path');
const fs = require('fs');
const connection = require('./mysql');

class Migration{
    async executeMigrations() {
        try {
            const migrationDir = "./migrations";
            fs.readdir(migrationDir, (err, files) => {
                files.sort();
                files.forEach(file => {
                    const migrationScript = fs.readFileSync(
                        path.join(migrationDir, file),
                        "utf8"
                    );
                    connection.query(migrationScript, async () => {
                        console.log(`Migration script ${file} executed successfully`);
                    })
                })
            })
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = new Migration();