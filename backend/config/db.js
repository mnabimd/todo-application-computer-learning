const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_management', 'root', 'admin', {
   host: 'localhost',
   dialect: 'mysql',
   logging: false // disable SQL logging in console
});

module.exports = sequelize;

sequelize
   .authenticate()
   .then(() => {
      console.log('Connected to MySQL via Sequelize');
   })
   .catch((err) => {
      console.log('DB Error:', err);
   });
