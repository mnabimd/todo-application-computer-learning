const express = require('express');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User Registration
router.post('/', async (req, res) => {
   //   Collect data from user
   // register user
   const { email, password, name } = req.body;

   if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
   }

   if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: 'Name is required' });
   }

   const hash = await bcrypt.hash(password, 12);

   await sequelize.query('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)', {
      replacements: [email, hash, name]
   });

   res.status(201).send({ message: 'User registered successfully' });
});

// User authentication (user login)

router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
   }

   const [rows] = await sequelize.query('SELECT * FROM users WHERE email = ?', {
      replacements: [email]
   });

   if (!rows.length) return res.status(404).send({ message: 'Email or password is incorrect' });

   const user = rows[0];

   const valid = await bcrypt.compare(password, user.password_hash);
   if (!valid) return res.status(403).send({ message: 'Email or password is incorrect' });

   const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '15m'
   });

   // Return user info along with token
   res.json({
      token,
      user: {
         id: user.id,
         email: user.email,
         name: user.name
      }
   });
});

module.exports = router;
