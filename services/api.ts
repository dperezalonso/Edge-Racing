// services/api.ts
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Crear instancia de axios con la URL base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 segundos máximo de espera
});

// Interceptor para añadir el token de autenticación a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    // Si estamos en el navegador y hay un token en localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si recibimos un 401 (Unauthorized), limpiar el token
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Eliminamos la redirección automática
      }
    }
    return Promise.reject(error);
  }
);

// Función para comprobar la conexión con la API
export const checkApiConnection = async (): Promise<boolean> => {
  try {
    // Intenta hacer una petición simple
    await apiClient.get('/saludo');
    return true;
  } catch (error) {
    console.error('Error al comprobar conexión con API:', error);
    return false;
  }
};

export default apiClient;