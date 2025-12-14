const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');

async function checkAuth(req, res, next) {
   const header = req.headers.authorization;
   if (!header) return res.sendStatus(401);

   const token = header.split(' ')[1];

   try {
      const data = jwt.verify(token, process.env.JWT_SECRET);

      // check if the is of the user exists in DB
      const [result] = await sequelize.query('SELECT * FROM users WHERE id = ?', {
         replacements: [data.id]
      });

      if (result.length === 0) return res.sendStatus(403);

      req.user = data;

      next();
   } catch {
      res.sendStatus(403);
   }
}

module.exports = checkAuth;
