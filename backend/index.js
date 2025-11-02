const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory "database"
let todos = [];
let id = 0;

// ✅ CREATE
app.post('/api/todos', (req, res) => {
   const { title } = req.body;
   if (!title) return res.status(400).json({ error: 'Title is required' });

   const newTodo = { id: id++, title, completed: false };
   todos.push(newTodo);

   res.status(201).json(newTodo);
});

// 📖 READ (all todos)
app.get('/api/todos', (req, res) => {
   res.json(todos);
});

// 📖 READ (single todo)
app.get('/api/todos/:id', (req, res) => {
   const todo = todos.find((t) => t.id === parseInt(req.params.id));
   if (!todo) return res.status(404).json({ error: 'Todo not found' });
   res.json(todo);
});

// ✏️ UPDATE
app.put('/api/todos/:id', (req, res) => {
   const id = req.params.id;

   // find if todo exists
   const todo = todos.find((t) => t.id === parseInt(id));
   if (!todo) return res.status(404).json({ error: 'Todo not found' });

   //    Get data from body
   const { title, completed } = req.body;
   if (title !== undefined) todo.title = title;
   if (completed !== undefined) todo.completed = completed;

   res.json(todo);
});

// 🗑 DELETE
app.delete('/api/todos/:id', (req, res) => {
   // find index of todo in Array
   const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));

   if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
   }

   todos.splice(todoIndex, 1);
   res.json({ message: 'Todo deleted' });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
