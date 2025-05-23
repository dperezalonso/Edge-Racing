// services/authService.ts
import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';
import { User } from '../types/models';

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
  access_token: string;
  token_type: string;
  user: User;
}

// Función para iniciar sesión
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.auth.login, data);
    const authData = response.data;
    
    // Guardar token en localStorage
    if (authData.access_token && typeof window !== 'undefined') {
      localStorage.setItem('token', authData.access_token);
      localStorage.setItem('user', JSON.stringify(authData.user));
    }
    
    return authData;
  } catch (error) {
    console.error('Error durante login:', error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const register = async (data: RegisterData): Promise<any> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.auth.register, data);
    return response.data;
  } catch (error) {
    console.error('Error durante registro:', error);
    throw error;
  }
};

// Función para cerrar sesión
export const logout = async (): Promise<void> => {
  try {
    // Solo hacer la petición si hay un token
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      await apiClient.post(API_ENDPOINTS.auth.logout);
    }
    
    // Limpiar localStorage incluso si la petición falla
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.error('Error durante logout:', error);
    // Limpiar localStorage incluso si la petición falla
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    throw error;
  }
};

// Verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;
  console.log(localStorage.getItem('token'));
  console.log("AAAAAAAAAAAAAAA");
    return localStorage.getItem('token') !== null;
};

// Obtener el usuario actual desde localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userString = localStorage.getItem('user');
  if (!userString) return null;
  
  try {
    return JSON.parse(userString);
  } catch (e) {
    return null;
  }
};

// Configurar el token de autenticación en el servicio API
export const setupAuthFromLocalStorage = (): void => {
  if (typeof window === 'undefined') return;
  
  const token = localStorage.getItem('token');
  if (token) {
    // Configurar headers para todas las peticiones
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Limpiar headers si no hay token
    delete apiClient.defaults.headers.common['Authorization'];
  }
};