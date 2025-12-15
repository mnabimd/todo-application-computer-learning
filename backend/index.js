// ENV Variables can be added from the Vercel Dashboard
if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoute = require('./routes/route.todos');
const usersRoute = require('./routes/route.users');

require('./config/db'); // DB Config

const app = express();
app.use(cors());
app.use(bodyParser.json());

// use todo route
app.use('/api/todos', todoRoute);
app.use('/api/users', usersRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
