const sequelize = require('../config/db');
const { formatDate } = require('../utils/date');

// In-memory "database"
let todos = [];
let id = 0;

async function sendTodos(req, res) {
   try {
      const [result] = await sequelize.query('SELECT * FROM todos');

      res.json(result);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Server-side error. Check later'
      });
   }
}

async function getTodoById(req, res) {
   try {
      // If the ID is not a number, throw an error and tell the user that he/she must pass only a number for the ID

      const [result] = await sequelize.query(`SELECT * FROM todos WHERE id = :id`, {
         replacements: { id: req.params.id }
      });

      if (result.length === 0) {
         return res.status(404).json({ error: 'Todo not found' });
      }

      res.json(result[0]);
   } catch (e) {
      res.status(500).send({
         msg: 'Server error',
         error: e
      });
   }
}

async function updateTodoById(req, res) {
   try {
      const id = req.params.id;

      // Check if todo exists first
      const [existingTodo] = await sequelize.query(`SELECT * FROM todos WHERE id = :id`, {
         replacements: { id: id }
      });

      if (existingTodo.length === 0) {
         return res.status(404).json({ error: 'Todo not found' });
      }

      // Get data from body
      const { title, completed } = req.body;
      
      // Build update query dynamically based on what fields are provided
      const updates = [];
      const replacements = { id: id };

      if (title !== undefined) {
         updates.push('title = :title');
         replacements.title = title;
      }
      if (completed !== undefined) {
         updates.push('completed = :completed');
         replacements.completed = completed;
      }

      // If no fields to update, return the existing todo
      if (updates.length === 0) {
         return res.json(existingTodo[0]);
      }

      // Perform the update
      await sequelize.query(
         `UPDATE todos SET ${updates.join(', ')} WHERE id = :id`,
         { replacements }
      );

      // Fetch and return the updated todo
      const [updatedTodo] = await sequelize.query(`SELECT * FROM todos WHERE id = :id`, {
         replacements: { id: id }
      });

      res.json(updatedTodo[0]);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Server-side error. Check later',
         error: error
      });
   }
}

async function deleteTodoById(req, res) {
   // find index of todo in Array
   const id = req.params.id;

   // delete todo by id

   // find by id
   const [result] = await sequelize.query(`SELECT * FROM todos WHERE id = :id`, {
      replacements: { id: id }
   });

   if (result.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
   }

   await sequelize.query(`DELETE FROM todos WHERE id = :id`, {
      replacements: { id: id }
   });
   res.json({ message: 'Todo deleted' });
}

async function createTodo(req, res) {
   try {
      const { title } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });

      const newTodo = { title, completed: false, createdAt: new Date() };

      // insert to database
      const [result] = await sequelize.query(
         `INSERT INTO todos (title, completed, createdAt) VALUES (:title, :completed, :date)`,
         {
            replacements: {
               title: newTodo.title,
               completed: newTodo.completed,
               date: newTodo.createdAt
            }
         }
      );

      res.status(201).json(result);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Server-side error. Check later',
         error: error
      });
   }
}

module.exports = {
   sendTodos,
   getTodoById,
   updateTodoById,
   deleteTodoById,
   createTodo
};
