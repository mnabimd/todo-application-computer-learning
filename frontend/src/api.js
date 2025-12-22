// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api';

// Helper function to get auth token
const getAuthToken = () => {
   return localStorage.getItem('token');
};

// Helper function to handle fetch requests
const fetchAPI = async (endpoint, options = {}) => {
   const token = getAuthToken();

   const config = {
      headers: {
         'Content-Type': 'application/json',
         ...(token && { Authorization: `Bearer ${token}` }),
         ...options.headers
      },
      ...options
   };

   try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         return { success: true };
      }

      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.message || data.error || 'Something went wrong');
      }

      return data;
   } catch (error) {
      console.error('API Error:', error);
      throw error;
   }
};

// ============================================
// 🔐 AUTH API
// ============================================

export const authAPI = {
   // Register new user
   register: async (email, password, name) => {
      const data = await fetchAPI('/users', {
         method: 'POST',
         body: JSON.stringify({ email, password, name })
      });
      return data;
   },

   // Login user
   login: async (email, password) => {
      const data = await fetchAPI('/users/login', {
         method: 'POST',
         body: JSON.stringify({ email, password })
      });

      if (data.token) {
         localStorage.setItem('token', data.token);
      }

      // Store user info
      if (data.user) {
         localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
   },

   // Logout user
   logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
   },

   // Check if user is authenticated
   isAuthenticated: () => {
      return !!getAuthToken();
   },

   // Get current user info
   getCurrentUser: () => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
   }
};

// ============================================
// ✅ TODOS API
// ============================================

export const todosAPI = {
   // Get all todos
   getAll: async () => {
      return await fetchAPI('/todos');
   },

   // Get single todo by ID
   getById: async (id) => {
      return await fetchAPI(`/todos/${id}`);
   },

   // Create new todo
   create: async (title) => {
      return await fetchAPI('/todos', {
         method: 'POST',
         body: JSON.stringify({ title })
      });
   },

   // Update todo by ID
   update: async (id, updates) => {
      return await fetchAPI(`/todos/${id}`, {
         method: 'PUT',
         body: JSON.stringify(updates)
      });
   },

   // Delete todo by ID
   delete: async (id) => {
      return await fetchAPI(`/todos/${id}`, {
         method: 'DELETE'
      });
   }
};
