import Link from "next/link";
import Image from "next/image";
import CompetitionSelector from "./components/competition-selector";
import { competitions } from "./data";

export default function Clasificacion() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--f1-red)] to-[color:var(--motogp-blue)]">
          Clasificación
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Consulta las clasificaciones actualizadas de las principales competiciones de motor
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Selecciona una competición</h2>
        <CompetitionSelector competitions={competitions} />
      </div>
      
      <div className="bg-[color:var(--racing-gray)]/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-24 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17l-5-5m0 0l5-5m-5 5h12M19 17l5-5m0 0l-5-5m5 5H7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3">Selecciona una competición para ver su clasificación</h3>
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            Elige entre Formula 1 o MotoGP para ver las clasificaciones actualizadas de pilotos y equipos de la temporada actual.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {competitions.map(comp => (
              <Link 
                key={comp.id} 
                href={`/clasificacion/${comp.id}`} 
                className="inline-flex items-center px-5 py-3 rounded-lg font-medium text-white transition-all hover:scale-105"
                style={{ backgroundColor: comp.color }}
              >
                Ver clasificación de {comp.name}
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Sección informativa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-gray-800">
          <div className="flex flex-col items-center text-center p-4">
            <div className="size-12 flex items-center justify-center bg-[color:var(--f1-red)]/20 text-[color:var(--f1-red)] rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold mb-2">Resultados en tiempo real</h4>
            <p className="text-gray-400 text-sm">
              Datos actualizados después de cada carrera con los últimos resultados oficiales.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="size-12 flex items-center justify-center bg-[color:var(--motogp-blue)]/20 text-[color:var(--motogp-blue)] rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h4 className="text-lg font-bold mb-2">Estadísticas completas</h4>
            <p className="text-gray-400 text-sm">
              Consulta puntos, victorias, podios y otros datos relevantes para cada piloto y equipo.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="size-12 flex items-center justify-center bg-[color:var(--accent-yellow)]/20 text-[color:var(--accent-yellow)] rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold mb-2">Temporada 2024</h4>
            <p className="text-gray-400 text-sm">
              Clasificaciones correspondientes a la temporada actual en curso.
            </p>
          </div>
        </div>
        
        {/* Nota histórica */}
        <div className="mt-12 bg-[color:var(--racing-black)]/50 rounded-lg p-5 border border-gray-800">
          <div className="flex items-start">
            <div className="mr-4">
              <div className="size-8 flex items-center justify-center bg-gray-800 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-1">Nota sobre el sistema de puntuación:</h4>
              <p className="text-xs text-gray-500">
                El sistema de puntuación actual otorga puntos a los 10 primeros clasificados en F1 (25, 18, 15, 12, 10, 8, 6, 4, 2, 1) y MotoGP (25, 20, 16, 13, 11, 10, 9, 8, 7, 6), con puntos adicionales para sprint races y vuelta rápida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}