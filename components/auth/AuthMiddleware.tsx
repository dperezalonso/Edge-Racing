'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/services/authService';

export default function AuthMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const checkAuth = () => {
      const isAuth = isAuthenticated();
      const isDashboardRoute = pathname.startsWith('/dashboard');
      
      // Si está en una ruta del dashboard y no está autenticado, redirigir al login
      if (isDashboardRoute && !isAuth) {
        router.push('/login');
      } 
      // Si está en la página de login/registro y ya está autenticado, redirigir al dashboard
      else if ((pathname === '/login' || pathname === '/registro') && isAuth) {
        router.push('/dashboard');
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
      </div>
    );
  }

  return <>{children}</>;
}