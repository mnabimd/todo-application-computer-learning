const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const {
   sendTodos,
   getTodoById,
   updateTodoById,
   deleteTodoById,
   createTodo
} = require('../controllers/controller.todos');
const { checkIfRoleIsAdmin } = require('../middlewares/checkIfRoleIsAdmin');

const router = express.Router();

// ✅ CREATE
router.post('/', checkAuth, createTodo);

// 📖 READ (all todos for authenticated user)
router.get('/', checkAuth, sendTodos);

// 📖 READ (single todo)
router.get('/:id', checkAuth, getTodoById);

// ✏️ UPDATE
router.put('/:id', checkAuth, updateTodoById);

// 🗑 DELETE
router.delete('/:id', checkAuth, deleteTodoById);

module.exports = router;
