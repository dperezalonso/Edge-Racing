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
  (response) => {
    return response;
  },
  (error) => {
    // Si recibimos un 401 (Unauthorized), limpiar el token
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirigir a la página de login si no estamos ya en ella
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/registro') {
          window.location.href = '/login?session_expired=true';
        }
      }
    }
    
    // Crear un mensaje de error más descriptivo
    let errorMessage = 'Error en la solicitud';
    
    if (error.response) {
      // El servidor respondió con un código de error
      const serverError = error.response.data?.message || error.response.statusText;
      errorMessage = `Error ${error.response.status}: ${serverError}`;
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
    }
    
    // Añadir información adicional al error
    error.friendlyMessage = errorMessage;
    
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