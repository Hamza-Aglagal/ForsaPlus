import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Create axios instance with base URL
// Different URL options based on where the app is running
let API_URL;
if (Platform.OS === 'android') {
  // For Android emulator
  API_URL = 'http://10.0.2.2:5000/api';
  // For physical Android device, use your computer's IP address
  // API_URL = 'http://192.168.1.XX:5000/api'; // Replace with your actual IP address
} else {
  // For iOS simulator
  API_URL = 'http://localhost:5000/api';
  // For physical iOS device, use your computer's IP address
  // API_URL = 'http://192.168.1.XX:5000/api'; // Replace with your actual IP address
}

// For direct API access (regardless of device)
// API_URL = 'https://your-deployed-api-url.com/api';

console.log('Using API URL:', API_URL); // To help with debugging

const api = axios.create({
  baseURL: aa06c1d18e08571f4662a8246ad7021d43611b0d685e0fe94bba442720934dfb,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout for requests
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error);
    if (!error.response) {
      // Network error
      return Promise.reject({ 
        error: 'Network Error - Cannot connect to server. Please check your internet connection and try again.'
      });
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: error.message };
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: error.message };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: error.message };
    }
  },

  // Logout user
  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  },

  // Get stored user data
  getStoredUser: async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default api; 