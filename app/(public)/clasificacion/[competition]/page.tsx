// app/(public)/clasificacion/[competition]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CompetitionSelector from "../components/competition-selector";
import PilotClassification from "../components/pilot-classification";
import TeamClassification from "../components/team-classification";
import ViewTabs from "../components/view-tabs";
import { useApiData } from "@/lib/hooks/useApiIntegration";

export default function CompetitionPage() {
  const params = useParams();
  const competitionId = params.competition ? Number(params.competition) : 0;
  const [activeView, setActiveView] = useState<"drivers" | "teams">("drivers");
  
  const { 
    competitions, 
    getDriversByCompetition, 
    getTeamsByCompetition, 
    getCompetitionById,
    loading
  } = useApiData();
  
  const [filteredDrivers, setFilteredDrivers] = useState<any[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
  const [competition, setCompetition] = useState<any>(null);
  
  // Obtener la competición seleccionada y filtrar pilotos/equipos
  useEffect(() => {
    if (!loading && competitionId) {
      // Obtener la competición seleccionada
      const selectedCompetition = getCompetitionById(competitionId);
      setCompetition(selectedCompetition);
      
      // Filtrar pilotos y equipos para esta competición
      if (selectedCompetition) {
        const driversForCompetition = getDriversByCompetition(competitionId);
        const teamsForCompetition = getTeamsByCompetition(competitionId);
        
        console.log('Datos filtrados:', {
          competition: selectedCompetition,
          drivers: driversForCompetition,
          teams: teamsForCompetition
        });
        
        setFilteredDrivers(driversForCompetition);
        setFilteredTeams(teamsForCompetition);
      }
    }
  }, [competitionId, loading, getCompetitionById, getDriversByCompetition, getTeamsByCompetition]);
  
  // Mostrar indicador de carga
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
        </div>
      </div>
    );
  }
  
  // Si no se encuentra la competición
  if (!competition) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-[color:var(--racing-gray)]/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
          <h2 className="text-xl font-bold mb-2">Competición no encontrada</h2>
          <p className="text-gray-400 mb-4">
            La competición que estás buscando no existe o no está disponible.
          </p>
          <Link 
            href="/clasificacion" 
            className="inline-flex items-center text-[color:var(--f1-red)] hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Volver a clasificaciones
          </Link>
        </div>
      </div>
    );
  }
  
  // Chequear que los datos están cargados correctamente
  console.log('Renderizando competición:', {
    competition,
    filteredDrivers,
    filteredTeams
  });
  
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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            {competition.logo ? (
              <div className="mr-4 size-12 bg-white rounded-full p-1">
                <Image 
                  src={competition.logo} 
                  alt={competition.name} 
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            ) : (
              <div 
                className="mr-4 size-12 rounded-full flex items-center justify-center text-xl font-bold"
                style={{ backgroundColor: competition.color }}
              >
                {competition.name.charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{competition.name}</h2>
              <p className="text-sm text-gray-400">{competition.description}</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <span 
              className="inline-block px-3 py-1 text-sm font-medium rounded-full"
              style={{ backgroundColor: competition.color }}
            >
              Temporada {competition.season}
            </span>
          </div>
        </div>

        <ViewTabs 
          onTabChange={setActiveView}
          competitionId={String(competitionId)}
        />
        
        {activeView === "drivers" ? (
          <PilotClassification 
            drivers={filteredDrivers} 
            competitionId={String(competitionId)} 
          />
        ) : (
          <TeamClassification 
            teams={filteredTeams} 
            competitionId={String(competitionId)} 
          />
        )}
      </div>
    </div>
  );
}