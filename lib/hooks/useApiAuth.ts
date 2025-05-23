// lib/hooks/useApiAuth.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { checkApiConnection, testApiCredentials } from '@/services/api';

export function useApiAuth() {
  const [isApiConnected, setIsApiConnected] = useState<boolean>(false);
  const [isApiAuthenticated, setIsApiAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar conexión y autenticación con la API
  const checkApiStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Primero verificar conectividad básica
      const connectionResult = await checkApiConnection();
      setIsApiConnected(connectionResult);

      if (connectionResult) {
        // Si hay conexión, verificar autenticación
        const authResult = await testApiCredentials();
        setIsApiAuthenticated(authResult);
        
        if (!authResult) {
          setError('Error de autenticación con la API. Verifica las credenciales.');
        }
      } else {
        setError('No se pudo conectar con la API. Verifica la URL y la conectividad.');
        setIsApiAuthenticated(false);
      }
    } catch (err) {
      console.error('Error al verificar estado de la API:', err);
      setError('Error inesperado al verificar la API.');
      setIsApiConnected(false);
      setIsApiAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verificar estado al cargar el hook
  useEffect(() => {
    checkApiStatus();
  }, [checkApiStatus]);

  // Reintentar conexión
  const retryConnection = useCallback(() => {
    checkApiStatus();
  }, [checkApiStatus]);

  return {
    isApiConnected,
    isApiAuthenticated,
    isLoading,
    error,
    retryConnection,
    refreshStatus: checkApiStatus
  };
}