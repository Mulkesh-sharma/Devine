// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    CREATE_ADMIN: `${API_BASE_URL}/auth/create-admin`,
    GET_ME: `${API_BASE_URL}/auth/me`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/password`,
  },
  
  // Services endpoints
  SERVICES: {
    GET_ALL: `${API_BASE_URL}/services`,
    GET_BY_ID: (id) => `${API_BASE_URL}/services/${id}`,
    CREATE: `${API_BASE_URL}/services`,
    UPDATE: (id) => `${API_BASE_URL}/services/${id}`,
    DELETE: (id) => `${API_BASE_URL}/services/${id}`,
    UPDATE_RATING: (id) => `${API_BASE_URL}/services/${id}/rating`,
  },
  
  // Bookings endpoints
  BOOKINGS: {
    CREATE: `${API_BASE_URL}/bookings`,
    GET_ALL: `${API_BASE_URL}/bookings`,
    GET_BY_ID: (id) => `${API_BASE_URL}/bookings/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/bookings/${id}`,
    CANCEL: (id) => `${API_BASE_URL}/bookings/${id}/cancel`,
    ADD_REVIEW: (id) => `${API_BASE_URL}/bookings/${id}/review`,
    GET_USER_BOOKINGS: `${API_BASE_URL}/users/me/bookings`,
  },
  
  // Users endpoints
  USERS: {
    GET_ALL: `${API_BASE_URL}/users`,
    GET_BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id) => `${API_BASE_URL}/users/${id}`,
    GET_USER_BOOKINGS: (id) => `${API_BASE_URL}/users/${id}/bookings`,
  },
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`,
};

// Helper function to make API requests
export const apiRequest = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add authorization header if token is available
  const token = localStorage?.getItem('token');
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};
