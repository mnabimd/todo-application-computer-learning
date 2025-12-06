// INstalling deps
// npm install sequelize mysql2

// config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_name', 'db_user', 'db_password', {
   host: 'localhost',
   dialect: 'mysql',
   logging: false // disable SQL logging in console
});

module.exports = sequelize;

// To test things out (main file)
sequelize
   .authenticate()
   .then(() => console.log('Connected to MySQL via Sequelize'))
   .catch((err) => console.log('DB Error:', err));

// Usage of pure/raw query
// const [row] = await sequelize.query(
//    "SELECT * FROM todos WHERE id = :id",
//    {
//      replacements: { id: req.params.id }
//    }
//  );
