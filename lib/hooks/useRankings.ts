'use client';

import { useState, useEffect, useCallback } from 'react';
// import { getGlobalDriverRankings, getGlobalTeamRankings } from '@/services/rankingService';

export interface DriverRanking {
  id: string;
  driver_name: string;
  position: number;
  team_name: string;
  points: number;
  wins: number;
  podiums: number;
  nationality?: string;
  team_color?: string;
  competition_id: string;
  competition_name?: string;
}

export interface TeamRanking {
  id: string;
  team_name: string;
  position: number;
  points: number;
  wins: number;
  podiums: number;
  color?: string;
  competition_id: string;
  competition_name?: string;
}

export function useRankings() {
  const [driversRanking] = useState<DriverRanking[]>([]);
  const [teamsRanking] = useState<TeamRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Cargar datos desde la API
  const fetchRankings = useCallback(async () => {
    setLoading(true);
    try {
      // Obtener clasificaciones globales
      // const [driversData, teamsData] = await Promise.all([
      //   // getGlobalDriverRankings(),
      //   // getGlobalTeamRankings()
      // ]);
      
      // // Transformar datos para adaptarlos a las interfaces
      // const formattedDrivers = driversData.map((driver: any) => ({
      //   id: String(driver.id || driver.driver_id),
      //   driver_name: driver.driver_name,
      //   position: driver.position,
      //   team_name: driver.team_name,
      //   points: driver.points,
      //   wins: driver.wins,
      //   podiums: driver.podiums,
      //   nationality: driver.nationality,
      //   team_color: driver.team_color,
      //   competition_id: String(driver.competition_id),
      //   competition_name: driver.competition_name
      // }));
      
      // const formattedTeams = teamsData.map((team: any) => ({
      //   id: String(team.id || team.team_id),
      //   team_name: team.team_name,
      //   position: team.position,
      //   points: team.points,
      //   wins: team.wins,
      //   podiums: team.podiums,
      //   color: team.color,
      //   competition_id: String(team.competition_id),
      //   competition_name: team.competition_name
      // }));
      
      // setDriversRanking(formattedDrivers);
      // setTeamsRanking(formattedTeams);
      setError(null);
    } catch (err) {
      console.error('Error al cargar rankings:', err);
      setError('Error al cargar las clasificaciones');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Cargar datos al iniciar
  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);
  
  // Filtrar rankings por competición
  const getDriversRankingByCompetition = useCallback((competitionId: string) => {
    return driversRanking.filter(driver => driver.competition_id === competitionId);
  }, [driversRanking]);
  
  const getTeamsRankingByCompetition = useCallback((competitionId: string) => {
    return teamsRanking.filter(team => team.competition_id === competitionId);
  }, [teamsRanking]);
  
  return {
    driversRanking,
    teamsRanking,
    loading,
    error,
    getDriversRankingByCompetition,
    getTeamsRankingByCompetition,
    refreshRankings: fetchRankings
  };
}