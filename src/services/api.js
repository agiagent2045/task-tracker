import axios from 'axios';

// Base URL for API - placeholder for future backend integration
const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Placeholder API functions for future backend integration

// Auth API
export const authAPI = {
  login: async (email, password) => {
    // Placeholder - will be implemented when backend is ready
    return { success: true, token: 'dummy-token', user: { email } };
  },
  logout: async () => {
    // Placeholder - will be implemented when backend is ready
    return { success: true };
  },
};

// Tasks API
export const tasksAPI = {
  getAllTasks: async () => {
    // Placeholder - will be implemented when backend is ready
    return [];
  },
  getTaskById: async (id) => {
    // Placeholder - will be implemented when backend is ready
    return null;
  },
  createTask: async (taskData) => {
    // Placeholder - will be implemented when backend is ready
    return { success: true, task: taskData };
  },
  updateTask: async (id, taskData) => {
    // Placeholder - will be implemented when backend is ready
    return { success: true, task: { id, ...taskData } };
  },
  deleteTask: async (id) => {
    // Placeholder - will be implemented when backend is ready
    return { success: true };
  },
};

// Analytics API
export const analyticsAPI = {
  getTaskStats: async () => {
    // Placeholder - will be implemented when backend is ready
    return {
      total: 0,
      completed: 0,
      inProgress: 0,
      toDo: 0,
    };
  },
};

export default api;
