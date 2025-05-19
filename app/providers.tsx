'use client';

import { useEffect } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthMiddleware from '@/components/auth/AuthMiddleware';
import { setupAuthFromLocalStorage } from '@/services/authService';

// Creamos una instancia de QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  // Configurar token de autenticación desde localStorage al iniciar
  useEffect(() => {
    setupAuthFromLocalStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthMiddleware>{children}</AuthMiddleware>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}