import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* Hero Section */}
      <div className="relative w-full max-w-7xl mx-auto mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 rounded-lg"></div>
        <div className="relative z-10 py-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Edge Racing
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            La plataforma definitiva para competiciones de carreras. Sigue a tus pilotos favoritos, consulta clasificaciones en tiempo real y descubre las próximas competiciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Acceder al Dashboard
            </Link>
            <Link 
              href="/clasificacion" 
              className="bg-transparent hover:bg-gray-700 border border-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Ver clasificaciones
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto my-16">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Rendimiento en tiempo real</h3>
          <p className="text-gray-300">Accede a estadísticas y datos de rendimiento actualizados al momento para cada piloto y equipo.</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Calendario de competiciones</h3>
          <p className="text-gray-300">Mantente al día con las próximas carreras y eventos en el mundo del motor.</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Perfiles detallados</h3>
          <p className="text-gray-300">Explora información completa sobre pilotos, equipos y sus trayectorias profesionales.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full max-w-7xl mx-auto bg-gradient-to-r from-blue-700 to-purple-700 p-8 md:p-12 rounded-lg shadow-xl my-16">
        <h2 className="text-3xl font-bold mb-4 text-white">¿Listo para sumergirte en el mundo de las carreras?</h2>
        <p className="text-white/90 mb-6 max-w-3xl mx-auto">
          Únete a nuestra comunidad de aficionados y profesionales. Accede al dashboard para explorar todas las funcionalidades.
        </p>
        <Link 
          href="/competiciones" 
          className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-colors"
        >
          Ver competiciones
        </Link>
      </div>

      {/* Optional: Latest News or Updates */}
      <div className="w-full max-w-7xl mx-auto my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Últimas noticias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 bg-gray-700 relative">
                {/* Placeholder for news image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <span>Imagen de noticia {item}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Noticia destacada {item}</h3>
                <p className="text-gray-300 mb-4">Resumen breve de la última noticia relacionada con el mundo de las carreras.</p>
                <Link href="#" className="text-blue-400 hover:underline font-medium">
                  Leer más →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}