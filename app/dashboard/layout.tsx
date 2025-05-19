'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideNav from "../ui/sidenav";
import { logout, getCurrentUser } from "@/services/authService";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  // Cargar información del usuario
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUserName(user.name || 'Usuario');
      setUserEmail(user.email || '');
      setUserRole(user.role || 'guest');
    } else {
      // Si no hay usuario, redirigir al login
      router.push('/login');
    }
  }, [router]);

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login?logout=true');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Alternar menú móvil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen bg-[color:var(--racing-black)] text-white overflow-hidden">
      {/* Sidebar - Versión escritorio */}
      <div className="hidden md:block w-64 border-r border-gray-800 bg-[color:var(--f1-dark-blue)]/80 backdrop-blur-sm">
        <div className="h-full px-3 py-6 flex flex-col">
          <Link href="/" className="flex items-center px-3 mb-8 relative">
            <div className="absolute -left-3 top-0 w-1 h-full bg-[color:var(--f1-red)]"></div>
            <span className="font-bold text-xl text-[color:var(--f1-red)]">Edge</span>
            <span className="font-bold text-xl">Racing</span>
          </Link>
          
          {/* Información del usuario */}
          <div className="px-3 mb-6 pb-6 border-b border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 rounded-full bg-[color:var(--f1-red)] flex items-center justify-center text-white font-medium">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium">{userName}</div>
                <div className="text-xs text-gray-400">{userEmail}</div>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                {userRole === 'admin' ? 'Administrador' : 
                 userRole === 'teamManager' ? 'Gestor de equipo' : 'Usuario'}
              </span>
            </div>
          </div>
          
          <div className="circuit-line mb-6"></div>
          <SideNav />
        </div>
      </div>

      {/* Contenido principal y header móvil */}
      <div className="flex flex-col w-full">
        <header className="bg-[color:var(--racing-black)]/90 border-b border-gray-800 py-4 px-6">
          <div className="flex justify-between items-center">
            {/* Logo - Versión móvil */}
            <Link href="/" className="md:hidden flex items-center">
              <span className="font-bold text-xl text-[color:var(--f1-red)]">Edge</span>
              <span className="font-bold text-xl">Racing</span>
            </Link>
            
            {/* Usuario y menú móvil */}
            <div className="flex items-center gap-4">
              {/* Información del usuario - Versión escritorio */}
              <div className="hidden md:flex items-center gap-2">
                <div className="size-8 rounded-full bg-[color:var(--f1-red)] flex items-center justify-center text-white font-medium">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{userName}</span>
              </div>
              
              {/* Botón de menú de usuario */}
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-full hover:bg-gray-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
                    {/* Menú móvil */}
                    <div className="md:hidden py-1">
                      <Link 
                        href="/dashboard" 
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        href="/dashboard/drivers" 
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Pilotos
                      </Link>
                      <Link 
                        href="/dashboard/teams" 
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Equipos
                      </Link>
                      <Link 
                        href="/dashboard/competitions" 
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Competiciones
                      </Link>
                      <hr className="border-gray-700 my-1" />
                    </div>
                    
                    {/* Opciones para todos los dispositivos */}
                    <div className="py-1">
                      <Link 
                        href="/" 
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Volver al sitio
                      </Link>
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
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-6 md:p-6 relative">
          {/* Decorative racing stripe */}
          <div className="absolute top-0 right-0 h-1 w-1/3 racing-gradient"></div>
          {children}
        </main>
      </div>
    </div>
  );
}