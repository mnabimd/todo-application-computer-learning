# 🚀 TodoApp Frontend

A modern, beautiful React-based Todo application with glassmorphism design and smooth animations.

## ✨ Features

- 🔐 **Authentication** - Secure user login and registration
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete todos
- 🎨 **Stunning UI** - Glassmorphism effects, gradients, and animations
- 📊 **Statistics Dashboard** - Track total, active, and completed tasks
- 🔍 **Filter System** - View all, active, or completed todos
- 📱 **Fully Responsive** - Works beautifully on all devices
- ⚡ **Fast & Modern** - Built with React and Vite

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Custom styling with CSS variables
- **Fetch API** - HTTP requests

## 📋 API Routes

The frontend connects to the following backend endpoints:

### Authentication
- `POST /api/users` - Register new user
- `POST /api/users/login` - User login

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend server running on `http://localhost:5000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Auth.jsx          # Authentication component
│   │   ├── Auth.css          # Auth styles
│   │   ├── TodoList.jsx      # Main todo list component
│   │   ├── TodoList.css      # Todo list styles
│   │   ├── TodoItem.jsx      # Individual todo item
│   │   └── TodoItem.css      # Todo item styles
│   ├── api.js                # API service layer
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles & design system
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Design System

The app uses a comprehensive design system with:

- **Custom CSS Variables** - For consistent theming
- **Glassmorphism Effects** - Modern frosted glass look
- **Gradient Backgrounds** - Vibrant color schemes
- **Smooth Animations** - Fade-in, slide-in, and hover effects
- **Responsive Design** - Mobile-first approach

## 🔧 Configuration

The Vite config includes a proxy to forward `/api` requests to the backend:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

## 📝 License

MIT
