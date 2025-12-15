# 🎉 TodoApp Full Stack Application

This is a complete full-stack Todo application with a beautiful React frontend and Express.js backend.

## 🌟 Project Overview

### Backend (Express.js + MySQL)
- **Location**: `/backend`
- **Port**: 5000
- **Database**: MySQL with Sequelize
- **Authentication**: JWT-based auth

### Frontend (React + Vite)
- **Location**: `/frontend`
- **Port**: 3000
- **Framework**: React 18 with Vite
- **Styling**: Vanilla CSS with modern design system

## 📊 API Routes Available

### 🔐 Authentication Routes
- `POST /api/users` - Register new user
  - Body: `{ email, password }`
  - Returns: Success message

- `POST /api/users/login` - User login
  - Body: `{ email, password }`
  - Returns: `{ token }`

### ✅ Todo Routes
- `GET /api/todos` - Get all todos
  - Requires: Auth token + Admin role
  - Returns: Array of todos

- `GET /api/todos/:id` - Get single todo
  - Returns: Single todo object

- `POST /api/todos` - Create new todo
  - Body: `{ title }`
  - Returns: Created todo

- `PUT /api/todos/:id` - Update todo
  - Body: `{ title?, completed? }`
  - Returns: Updated todo

- `DELETE /api/todos/:id` - Delete todo
  - Returns: Success message

## 🚀 Quick Start

### Start Backend
```bash
cd backend
node index.js
```
Server runs on: http://localhost:5000

### Start Frontend
```bash
cd frontend
npm run dev
```
App runs on: http://localhost:3000

## ✨ Frontend Features

✅ **Stunning UI Design**
- Glassmorphism effects with backdrop blur
- Vibrant gradient backgrounds
- Smooth animations and transitions
- Responsive mobile-first design

✅ **Authentication System**
- Login/Register with email & password
- JWT token management
- Automatic session persistence
- Animated auth page with floating orbs

✅ **Todo Management**
- Create new todos
- Mark todos as complete/incomplete
- Delete todos
- Real-time statistics (Total, Active, Completed)
- Filter todos (All, Active, Completed)

✅ **User Experience**
- Loading states
- Error handling with user-friendly messages
- Empty states
- Smooth animations on interactions
- Beautiful custom checkboxes

## 🎨 Design Highlights

- **Color Palette**: Purple/Blue gradients with dark mode theme
- **Typography**: Inter font family
- **Effects**: Glassmorphism, shadows, glows
- **Animations**: Fade-in, slide-in, hover effects
- **Components**: Reusable design system with CSS variables

## 📱 Responsive Design

The app is fully responsive and works beautifully on:
- 📱 Mobile phones (320px+)
- 📲 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

## 🔧 Tech Stack

**Frontend:**
- React 18
- Vite
- Vanilla CSS
- Fetch API

**Backend:**
- Node.js
- Express.js
- MySQL
- Sequelize
- JWT
- Bcrypt
- CORS

## 📝 Notes

- The frontend uses a proxy in Vite config to forward `/api` requests to the backend
- Authentication tokens are stored in localStorage
- All API calls include proper error handling
- The design system uses CSS custom properties for easy theming

## 🎯 Current Status

✅ Backend API running on port 5000
✅ Frontend app running on port 3000
✅ All CRUD operations implemented
✅ Authentication system working
✅ Beautiful, modern UI complete
✅ Fully responsive design
✅ Production-ready code

Enjoy your beautiful TodoApp! 🚀
