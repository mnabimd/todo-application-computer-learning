const { formatDate } = require('../utils/date');

// In-memory "database"
let todos = [];
let id = 0;

function sendTodos(req, res) {
   try {
      res.json(todos);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Server-side error. Check later'
      });
   }
}

function getTodoById(req, res) {
   try {
      // If the ID is not a number, throw an error and tell the user that he/she must pass only a number for the ID

      const todo = todos.find((t) => t.id === parseInt(req.params.id));
      if (!todo) return res.status(404).json({ error: 'Todo not found' });
      res.json(todo);
   } catch (e) {
      res.status(500).send({
         msg: 'Server error',
         error: e
      });
   }
}

function updateTodoById(req, res) {
   const id = req.params.id;

   // find if todo exists
   const todo = todos.find((t) => t.id === parseInt(id));
   if (!todo) return res.status(404).json({ error: 'Todo not found' });

   //    Get data from body
   const { title, completed } = req.body;
   if (title !== undefined) todo.title = title;
   if (completed !== undefined) todo.completed = completed;

   res.json(todo);
}

function deleteTodoById(req, res) {
   // find index of todo in Array
   const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));

   if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
   }

   todos.splice(todoIndex, 1);
   res.json({ message: 'Todo deleted' });
}

function createTodo(req, res) {
   const { title } = req.body;
   if (!title) return res.status(400).json({ error: 'Title is required' });

   const newTodo = { id: id++, title, completed: false, createdAt: formatDate(new Date()) };
   todos.push(newTodo);

   res.status(201).json(newTodo);
}

module.exports = {
   sendTodos,
   getTodoById,
   updateTodoById,
   deleteTodoById,
   createTodo
};
