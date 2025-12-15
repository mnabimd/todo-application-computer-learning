require('mysql2');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USERNAME,
   process.env.DB_PASSWORD,
   {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false // disable SQL logging in console
   }
);

module.exports = sequelize;

sequelize
   .authenticate()
   .then(() => {
      console.log('Connected to MySQL via Sequelize');
   })
   .catch((err) => {
      console.log('DB Error:', err);
   });
