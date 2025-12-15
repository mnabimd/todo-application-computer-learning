import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from './db.js';

export async function register(req, res) {
   const { email, password } = req.body;

   const hash = await bcrypt.hash(password, 12);

   await sequelize.query('INSERT INTO users (email, password_hash) VALUES (?, ?)', {
      replacements: [email, hash]
   });

   res.sendStatus(201);
}

export async function login(req, res) {
   const { email, password } = req.body;

   const [rows] = await sequelize.query('SELECT * FROM users WHERE email = ?', {
      replacements: [email]
   });

   if (!rows.length) return res.sendStatus(401);

   const user = rows[0];
   const valid = await bcrypt.compare(password, user.password_hash);
   if (!valid) return res.sendStatus(403);

   const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '15m'
   });

   res.json({ token });
}
