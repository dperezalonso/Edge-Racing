"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CompetitionSelector from "./components/competition-selector";
import ViewTabs from "./components/view-tabs";
import PilotClassification from "./components/pilot-classification";
import TeamClassification from "./components/team-classification";
import { useCompetitions } from "@/lib/hooks/useCompetitions";
import { 
  getGlobalDriversRanking, 
  getGlobalTeamsRanking,
  getDriversRankingByCompetition,
  getTeamsRankingByCompetition 
} from "@/services/rankingService";

export default function CompetitionPage() {
  const params = useParams();
  const competitionId = params.competition as string;
  const router = useRouter(); // Añadimos el router para la redirección
  const [activeView, setActiveView] = useState<"drivers" | "teams">("drivers");
  
  const { competitions, loading: competitionsLoading } = useCompetitions();
  const [driversRanking, setDriversRanking] = useState<any[]>([]);
  const [teamsRanking, setTeamsRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredDrivers, setFilteredDrivers] = useState<any[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
  const [competition, setCompetition] = useState<any>(null);
  
  // Efecto para buscar y establecer la competición actual
  useEffect(() => {
    if (!competitionsLoading && competitions.length > 0) {
      const selectedCompetition = competitions.find(comp => comp.id === competitionId);
      
      // Si no se encuentra la competición pero hay competiciones disponibles,
      // redirigir a la primera competición
      if (!selectedCompetition) {
        // Verificar que hay competiciones disponibles antes de redirigir
        if (competitions.length > 0) {
          const firstCompetitionId = competitions[0].id;
          console.log(`Competición ${competitionId} no encontrada, redirigiendo a /clasificacion/${firstCompetitionId}`);
          router.push(`/clasificacion/${firstCompetitionId}`);
          return;
        }
      }
      
      setCompetition(selectedCompetition || null);
    }
  }, [competitionId, competitions, competitionsLoading, router]);
  
  // Cargar datos de clasificaciones
  useEffect(() => {
    const fetchRankings = async () => {
      if (!competitionId) return; // No cargar datos si no hay competición seleccionada
      
      setLoading(true);
      try {
        // Obtener clasificaciones globales
        const [driversData, teamsData] = await Promise.all([
          getGlobalDriversRanking(),
          getGlobalTeamsRanking()
        ]);
        
        // Guardar clasificaciones globales
        setDriversRanking(driversData);
        setTeamsRanking(teamsData);
        
        // Filtrar por competición seleccionada
        if (competitionId) {
          setFilteredDrivers(getDriversRankingByCompetition(driversData, competitionId));
          setFilteredTeams(getTeamsRankingByCompetition(teamsData, competitionId));
        }
      } catch (err) {
        console.error('Error al cargar clasificaciones:', err);
        setError('Error al cargar las clasificaciones. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRankings();
  }, [competitionId]);
  
  // Mostrar indicador de carga
  if (loading || competitionsLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
        </div>
      </div>
    );
  }
  
  // Si no se encuentra la competición, ya no mostramos un mensaje de error
  // porque redirigimos automáticamente en el useEffect
  
  // Mostrar error si ocurre
  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-900/50 border border-red-800 rounded-md p-4 text-red-300 mb-4">
          {error}
        </div>
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
    );
  }
  
  // Si no hay competición en este punto, probablemente estamos a mitad de la redirección
  // o hay algún otro problema, así que mostrar un mensaje de carga
  if (!competition) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
          <span className="ml-3">Redirigiendo...</span>
        </div>
      </div>
    );
  }
  
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
        <CompetitionSelector 
          competitions={competitions} 
          baseRoute="/clasificacion"
        />
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
          competitionId={competitionId}
        />
        
        {activeView === "drivers" ? (
          <PilotClassification 
            drivers={filteredDrivers} 
            teams={teamsRanking}
            competitionId={competitionId} 
          />
        ) : (
          <TeamClassification 
            teams={filteredTeams} 
            competitionId={competitionId} 
          />
        )}
        
        {/* Añadir sección de fuente de datos */}
        <div className="mt-8 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            Datos actualizados en tiempo real desde la base de datos oficial de Edge Racing.
          </p>
        </div>
      </div>
    </div>
  );
}