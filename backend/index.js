const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoute = require('./routes/route.todos');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// use todo route
app.use('/api/todos', todoRoute);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
