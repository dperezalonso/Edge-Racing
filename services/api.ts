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

// Función para configurar autenticación básica
const setupBasicAuth = () => {
  const username = process.env.API_USERNAME;
  const password = process.env.API_PASSWORD;
  
  if (username && password) {
    // Codificar credenciales en Base64 para autenticación básica
    const credentials = btoa(`${username}:${password}`);
    apiClient.defaults.headers.common['Authorization'] = `Basic ${credentials}`;
    console.log('Autenticación básica configurada');
  } else {
    console.warn('Credenciales de API no encontradas en variables de entorno');
  }
};

// Función para configurar autenticación con token
const setupTokenAuth = (token?: string) => {
  const apiToken = token || process.env.API_TOKEN;
  
  if (apiToken) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
    console.log('Autenticación con token configurada');
  }
};

// Interceptor para añadir el token de autenticación a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    // Configurar autenticación básica si no hay token de usuario
    if (!config.headers.Authorization || 
        (typeof config.headers.Authorization === 'string' && !config.headers.Authorization.startsWith('Bearer'))) {
      setupBasicAuth();
    }
    
    // Si estamos en el navegador y hay un token de usuario en localStorage
    if (typeof window !== 'undefined') {
      const userToken = localStorage.getItem('token');
      if (userToken) {
        // Priorizar el token de usuario sobre las credenciales de la API
        config.headers.Authorization = `Bearer ${userToken}`;
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
    // Si recibimos un 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.error('Error de autenticación:', error.response.data);
      
      // Si hay un token de usuario, probablemente expiró
      if (typeof window !== 'undefined' && localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Token de usuario eliminado por expiración');
      }
    }
    
    // Si recibimos un 403 (Forbidden), las credenciales de la API pueden ser incorrectas
    if (error.response && error.response.status === 403) {
      console.error('Error de permisos de API:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// Función para comprobar la conexión con la API
export const checkApiConnection = async (): Promise<boolean> => {
  try {
    // Configurar autenticación antes de la prueba
    setupBasicAuth();
    
    // Intenta hacer una petición simple
    await apiClient.get('/saludo');
    return true;
  } catch (error) {
    console.error('Error al comprobar conexión con API:', error);
    return false;
  }
};

// Función para probar las credenciales de la API
export const testApiCredentials = async (): Promise<boolean> => {
  try {
    setupBasicAuth();
    const response = await apiClient.get('/saludo');
    console.log('Credenciales de API válidas:', response.data);
    return true;
  } catch (error) {
    console.error('Error al probar credenciales de API:', error);
    return false;
  }
};

// Configurar autenticación básica al importar el módulo
setupBasicAuth();

export default apiClient;