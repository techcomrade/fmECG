require('dotenv').config();

const connection = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'test',
    charset: 'utf8',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10,
};

module.exports = {
    client: process.env.DB_CLIENT,
    connection,
    migrations: {
        tableName: 'migrations',
        directory: process.cwd() + '/server/migrations',
      },
    debug: false,
};
