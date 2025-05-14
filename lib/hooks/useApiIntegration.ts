// lib/hooks/useApiIntegration.ts
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/api';

// Adaptar datos de la API a nuestro formato interno
const adaptCompetitionData = (apiData: any) => {
  return {
    id: apiData.id,
    name: apiData.name,
    description: apiData.description || `Campeonato de ${apiData.name}`,
    season: apiData.season || new Date().getFullYear().toString(),
    logo: apiData.logo || "",
    color: apiData.color || "#e10600"
  };
};

const adaptDriverData = (apiData: any) => {
  return {
    id: apiData.id,
    driver: `${apiData.first_name} ${apiData.last_name}`,
    nationality: apiData.birth_country,
    team: apiData.team_name || "",
    points: apiData.points || 0,
    wins: apiData.wins || 0,
    podiums: apiData.podiums || 0,
    teamColor: apiData.team_color || "#cccccc",
    position: apiData.position || 0,
    competitionId: apiData.competition_id
  };
};

const adaptTeamData = (apiData: any) => {
  return {
    id: apiData.id,
    team: apiData.name,
    points: apiData.points || 0,
    wins: apiData.wins || 0,
    podiums: apiData.podiums || 0,
    color: apiData.color || "#cccccc",
    position: apiData.position || 0,
    competitionId: apiData.competition_id
  };
};

// Hook para datos de la API
export function useApiData() {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cargar todos los datos necesarios
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener competiciones
      const competitionsResponse = await apiClient.get('/competition/list');
      const competitionsData = competitionsResponse.data.map(adaptCompetitionData);
      
      // Obtener pilotos
      const driversResponse = await apiClient.get('/driver/list');
      const driversData = driversResponse.data.map(adaptDriverData);
      
      // Obtener equipos
      const teamsResponse = await apiClient.get('/team/list');
      const teamsData = teamsResponse.data.map(adaptTeamData);
      
      // Actualizar estados
      setCompetitions(competitionsData);
      setDrivers(driversData);
      setTeams(teamsData);
      
      console.log('Datos cargados correctamente:', {
        competitions: competitionsData,
        drivers: driversData,
        teams: teamsData
      });
      
    } catch (err) {
      console.error('Error al cargar datos de la API:', err);
      setError('Ha ocurrido un error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Filtrar pilotos por competición
  const getDriversByCompetition = useCallback((competitionId: number | string) => {
    return drivers.filter(driver => driver.competitionId === competitionId);
  }, [drivers]);

 
  // Filtrar equipos por competición
  const getTeamsByCompetition = useCallback((competitionId: number | string) => {
    return teams.filter(team => team.competitionId === competitionId);
  }, [teams]);

  // Obtener competición por ID
  const getCompetitionById = useCallback((id: string | number) => {
    return competitions.find(comp => comp.id === id) || null;
  }, [competitions]);

  return {
    competitions,
    drivers,
    teams,
    loading,
    error,
    getDriversByCompetition,
    getTeamsByCompetition,
    getCompetitionById,
    refreshData: fetchAllData
  };
}