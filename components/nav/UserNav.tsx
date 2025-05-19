'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser, isAuthenticated, logout } from '@/services/authService';

export default function UserNav() {
  const [isAuth, setIsAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const pathname = usePathname();

  // Verificar estado de autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsAuth(authStatus);
      
      if (authStatus) {
        const user = getCurrentUser();
        setUserName(user?.name || 'Usuario');
      }
    };
    
    checkAuth();
    
    // Re-verificar cuando cambie la ruta
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [pathname]);

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await logout();
      setIsAuth(false);
      setIsMenuOpen(false);
      // Refrescar la página para aplicar cambios
      window.location.href = '/login?logout=true';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Si no está autenticado, mostrar enlaces de login/registro
  if (!isAuth) {
    return (
      <div className="flex items-center gap-2">
        <Link 
          href="/login" 
          className="py-2 px-3 hover:text-[color:var(--motogp-blue)] transition-colors"
        >
          Iniciar sesión
        </Link>
        <Link 
          href="/registro" 
          className="bg-[color:var(--f1-red)] hover:bg-[color:var(--f1-red)]/90 px-4 py-2 rounded text-sm font-medium transition-all hover:shadow-lg hover:shadow-[color:var(--f1-red)]/20"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  // Si está autenticado, mostrar menú de usuario
  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2 py-2 px-3 hover:bg-gray-800 rounded-md transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="size-8 rounded-full bg-[color:var(--f1-red)] flex items-center justify-center text-white font-medium">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:inline">{userName}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
          <div className="py-1">
            <Link 
              href="/dashboard" 
              className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/profile" 
              className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Mi perfil
            </Link>
            <hr className="border-gray-700 my-1" />
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}