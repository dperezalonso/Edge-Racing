// src/services/authService.ts
import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.auth.login, data);
    const { token } = response.data;
    
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.auth.register, data);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post(API_ENDPOINTS.auth.logout);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  } catch (error) {
    console.error('Error during logout:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token'); // Eliminar token incluso si falla la petición
    }
    throw error;
  }
};