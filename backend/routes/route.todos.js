const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const {
   sendTodos,
   getTodoById,
   updateTodoById,
   deleteTodoById,
   createTodo
} = require('../controllers/controller.todos');

const router = express.Router();

// ✅ CREATE
router.post('/', createTodo);

router.get('/', checkAuth, sendTodos);

// 📖 READ (single todo)
router.get('/:id', getTodoById);

// ✏️ UPDATE
router.put('/:id', updateTodoById);

// 🗑 DELETE
router.delete('/:id', deleteTodoById);

module.exports = router;
