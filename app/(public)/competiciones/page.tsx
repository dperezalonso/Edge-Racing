'use client';

import Link from "next/link";
import { useCompetitions } from "@/lib/hooks/useCompetitions";
import { useDrivers } from "@/lib/hooks/useDrivers";
import { useTeams } from "@/lib/hooks/useTeams";
import { useEffect, useState } from "react";

export default function Competiciones() {
  const { competitions, loading: competitionsLoading } = useCompetitions();
  const { drivers, getDriversByCompetition, loading: driversLoading } = useDrivers();
  const { teams, getTeamsByCompetition, loading: teamsLoading } = useTeams();

  // Estado para controlar la visualización de detalles
  const [expandedCompetition, setExpandedCompetition] = useState<string | null>(null);
  
  // Función para alternar la visualización de detalles
  const toggleDetails = (competitionId: string) => {
    if (expandedCompetition === competitionId) {
      setExpandedCompetition(null);
    } else {
      setExpandedCompetition(competitionId);
    }
  };
  
  // Estado de carga
  if (competitionsLoading || driversLoading || teamsLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--f1-red)] to-[color:var(--motogp-blue)]">
          Competiciones
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Explora las principales competiciones de motor disponibles en Edge Racing
        </p>
      </div>

      {competitions.length > 0 ? (
        <div className="space-y-8">
          {competitions.map((competition) => {
            const competitionDrivers = getDriversByCompetition(competition.id);
            const competitionTeams = getTeamsByCompetition(competition.id);
            const isExpanded = expandedCompetition === competition.id;
            
            return (
              <div 
                key={competition.id}
                className="bg-[color:var(--racing-gray)]/30 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 transition-all"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {competition.logo ? (
                        <div className="size-14 bg-white rounded-full p-1 flex-shrink-0">
                          <img 
                            src={competition.logo} 
                            alt={competition.name} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div 
                          className="size-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                          style={{ backgroundColor: competition.color }}
                        >
                          {competition.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h2 className="text-xl font-bold">{competition.name}</h2>
                        <div className="mt-1">
                          <span 
                            className="inline-block px-2 py-0.5 text-xs font-medium rounded-full"
                            style={{ backgroundColor: competition.color }}
                          >
                            Temporada {competition.season}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/clasificacion/${competition.id}`}
                        className="py-2 px-4 rounded-md bg-[color:var(--f1-red)]/20 text-[color:var(--f1-red)] border border-[color:var(--f1-red)]/30 hover:bg-[color:var(--f1-red)]/30 transition-colors text-sm"
                      >
                        Ver clasificación
                      </Link>
                      <button
                        onClick={() => toggleDetails(competition.id)}
                        className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 my-4 text-sm">{competition.description}</p>
                  
                  {isExpanded && (
                    <div className="mt-6 space-y-6">
                      {/* Sección de pilotos */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Pilotos
                        </h3>
                        
                        {competitionDrivers.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {competitionDrivers.map((driver) => (
                              <div key={driver.id} className="bg-gray-800/50 border border-gray-700 rounded-md p-3 flex items-center gap-3">
                                <div 
                                  className="w-2 h-10 rounded-sm"
                                  style={{ backgroundColor: driver.teamColor }}
                                ></div>
                                <div>
                                  <div className="font-medium">{driver.driver}</div>
                                  <div className="text-sm text-gray-400">{driver.team} • {driver.nationality}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-400 text-center py-4 bg-gray-800/30 rounded-md">
                            No hay pilotos registrados en esta competición.
                          </div>
                        )}
                      </div>
                      
                      {/* Sección de equipos */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Equipos
                        </h3>
                        
                        {competitionTeams.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {competitionTeams.map((team) => (
                              <div key={team.id} className="bg-gray-800/50 border border-gray-700 rounded-md p-3 flex items-center gap-3">
                                <div 
                                  className="w-10 h-10 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: team.color }}
                                >
                                  {team.team.charAt(0)}
                                </div>
                                <div className="font-medium">{team.team}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-400 text-center py-4 bg-gray-800/30 rounded-md">
                            No hay equipos registrados en esta competición.
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-4 flex justify-center">
                        <Link 
                          href={`/clasificacion/${competition.id}`}
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <span>Ver clasificación completa</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[color:var(--racing-gray)]/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
          <div className="py-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-20 mx-auto text-gray-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h2 className="text-xl font-bold mb-2">No hay competiciones disponibles</h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-6">
              Actualmente no hay competiciones disponibles en el sistema. Las competiciones se añaden desde el panel de administración.
            </p>
            <Link 
              href="/dashboard/competitions/add" 
              className="inline-flex items-center px-5 py-2 rounded-md bg-[color:var(--f1-red)] text-white hover:bg-[color:var(--f1-red)]/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Añadir competición
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}