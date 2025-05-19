// app/dashboard/layout.tsx - Versión simple sin autenticación
'use client';

import Link from "next/link";
import SideNav from "../ui/sidenav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No hay lógica de autenticación en absoluto

  return (
    <div className="flex h-screen bg-[color:var(--racing-black)] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block w-64 border-r border-gray-800 bg-[color:var(--f1-dark-blue)]/80 backdrop-blur-sm">
        <div className="h-full px-3 py-6 flex flex-col">
          <Link href="/" className="flex items-center px-3 mb-8 relative">
            <div className="absolute -left-3 top-0 w-1 h-full bg-[color:var(--f1-red)]"></div>
            <span className="font-bold text-xl text-[color:var(--f1-red)]">Edge</span>
            <span className="font-bold text-xl">Racing</span>
          </Link>
          <div className="circuit-line mb-6"></div>
          <SideNav />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full">
        <header className="md:hidden bg-[color:var(--racing-black)]/90 border-b border-gray-800 py-4 px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-xl text-[color:var(--f1-red)]">Edge</span>
              <span className="font-bold text-xl">Racing</span>
            </Link>
            <button className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-6 relative">
          {/* Mensaje de desarrollo */}
          <div className="mb-4 bg-yellow-700/30 border border-yellow-600 text-yellow-200 p-3 rounded-md text-sm">
            ⚠️ Modo desarrollo: Verificación de autenticación desactivada temporalmente
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
}