const Sequelize = require("sequelize");

const connection = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8",
  port: process.env.DB_PORT || 3306,
};


const sequelize = new Sequelize(
  connection.database,
  connection.user,
  connection.password,
  {
    host: connection.host,
    port: connection.port,
    dialect: "mysql",
    pool: {
      max: 20,
      min: 0,
      idle: 10000,
    },
    define:{
      timestamps: false,
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to MySQL database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
