import Link from "next/link";
import Image from "next/image";
import CompetitionSelector from "../clasificacion/components/competition-selector";
import { competitions } from "../clasificacion/data";

export default function Competiciones() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--f1-red)] to-[color:var(--motogp-blue)]">
          Competiciones
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Explora los equipos y pilotos de las principales competiciones de motor
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Selecciona una competición</h2>
        <CompetitionSelector
          competitions={competitions}
          baseRoute="/competiciones"
        />
      </div>

      <div className="bg-[color:var(--racing-gray)]/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-24 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3">Selecciona una competición para ver sus detalles</h3>
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            Conoce a los equipos y pilotos que participan en cada competición, sus colores, patrocinadores y toda su información.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {competitions.map(comp => (
              <Link
                key={comp.id}
                href={`/competiciones/${comp.id}`}
                className="inline-flex items-center px-5 py-3 rounded-lg font-medium text-white transition-all hover:scale-105"
                style={{ backgroundColor: comp.color }}
              >
                Ver detalles de {comp.name}
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Sección informativa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-10 border-t border-gray-800">
          <div className="flex flex-col items-center text-center p-4">
            <div className="size-12 flex items-center justify-center bg-[color:var(--f1-red)]/20 text-[color:var(--f1-red)] rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold mb-2">Equipos</h4>
            <p className="text-gray-400 text-sm">
              Descubre todos los equipos que participan en cada competición, sus colores oficiales y patrocinadores.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="size-12 flex items-center justify-center bg-[color:var(--motogp-blue)]/20 text-[color:var(--motogp-blue)] rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold mb-2">Pilotos</h4>
            <p className="text-gray-400 text-sm">
              Conoce a los pilotos que compiten en cada campeonato, su trayectoria y datos destacados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}