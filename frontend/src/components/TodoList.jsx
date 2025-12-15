import { useState, useEffect } from 'react';
import { todosAPI, authAPI } from '../api';
import TodoItem from './TodoItem';
import './TodoList.css';

export default function TodoList({ onLogout }) {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user info
    const user = authAPI.getCurrentUser();
    setCurrentUser(user);
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await todosAPI.getAll();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load todos');
      console.error('Load todos error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      await todosAPI.create(newTodoTitle);
      setNewTodoTitle('');
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Failed to create todo');
    }
  };

  const handleToggleTodo = async (id, currentCompleted) => {
    try {
      await todosAPI.update(id, { completed: !currentCompleted });
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todosAPI.delete(id);
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Failed to delete todo');
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    onLogout();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="todo-container">
      {/* Header */}
      <header className="todo-header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <h1 className="header-title">
                <span className="text-gradient">Todo</span>App
              </h1>
              <p className="header-subtitle">
                {currentUser ? `Welcome back, ${currentUser.name}! ` : ''}
                Organize your life, one task at a time
              </p>
            </div>
            <div className="header-right">
              {currentUser && (
                <span className="user-name">👤 {currentUser.name}</span>
              )}
              <button onClick={handleLogout} className="btn btn-ghost btn-sm logout-btn">
                <span>🚪</span> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="todo-main">
        <div className="container">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card glass-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Total Tasks</div>
              </div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <div className="stat-value">{stats.active}</div>
                <div className="stat-label">Active</div>
              </div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-value">{stats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
          </div>

          {/* Create Todo Form */}
          <div className="create-todo-section">
            <form onSubmit={handleCreateTodo} className="create-todo-form glass-card">
              <input
                type="text"
                className="form-input create-todo-input"
                placeholder="What needs to be done?"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
              />
              <button type="submit" className="btn btn-primary create-todo-btn">
                <span>➕</span> Add Task
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message fade-in">
              <span>⚠️</span>
              {error}
              <button onClick={() => setError('')} className="error-close">
                ✕
              </button>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          {/* Todos List */}
          <div className="todos-section">
            {loading ? (
              <div className="loading-state">
                <div className="spinner-large"></div>
                <p>Loading your tasks...</p>
              </div>
            ) : filteredTodos.length === 0 ? (
              <div className="empty-state glass-card">
                <div className="empty-icon">📝</div>
                <h3>No tasks {filter !== 'all' && filter}</h3>
                <p>
                  {filter === 'all'
                    ? 'Start by adding your first task above!'
                    : `You have no ${filter} tasks`}
                </p>
              </div>
            ) : (
              <div className="todos-list">
                {filteredTodos.map((todo, index) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
