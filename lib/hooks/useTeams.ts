'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/api';
import { API_ENDPOINTS } from '@/config/api';

// Define la interfaz para Team (ajustada para coincidir con la API)
export interface Team {
  id: string;
  name: string;
  country: string;
  principal: string;
  logo: string | null;
  points: number;
  description: string;
  competition_id: string;
  // Campos adicionales para UI
  position?: number;
  wins?: number;
  podiums?: number;
  color?: string;
  team?: string; // Alias para name, para compatibilidad con componentes existentes
}

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cargar datos de la API
  const fetchTeams = useCallback(async () => {
    setLoading(true);
    try {
      // Obtener datos de la API - ajusta según la estructura de tus endpoints
      const response = await apiClient.get('/team/list'); // Usar directamente la ruta de la API
      console.log('Equipos cargados desde API:', response.data);
      
      // Transformar datos para compatibilidad con UI
      const formattedTeams = response.data.map((team: any) => ({
        ...team,
        // Asegurar que team existe como alias de name para compatibilidad
        team: team.name 
      }));
      
      setTeams(formattedTeams);
      setError(null);
    } catch (err) {
      console.error('Error al cargar equipos:', err);
      setError('Error al cargar los equipos');
      
      // En desarrollo, puedes usar datos mock si la API falla
      if (process.env.NODE_ENV === 'development') {
        const mockTeams = [
          {
            id: "redbull",
            name: "Red Bull Racing",
            country: "Austria",
            principal: "Christian Horner",
            logo: "/images/teams/redbull.png",
            points: 423,
            description: "Equipo oficial de Red Bull en Formula 1",
            competition_id: "formula1",
            position: 1,
            wins: 8,
            podiums: 13,
            color: "#0600EF",
            team: "Red Bull Racing" // Alias para name
          },
          // Más equipos mock...
        ];
        setTeams(mockTeams);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos al iniciar
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // Obtener un equipo por ID
  const getTeamById = useCallback((id: string) => {
    // Buscar en el estado local en lugar de hacer otra solicitud
    return teams.find(team => team.id === id) || null;
  }, [teams]);

  // Filtrar equipos por competición
  const getTeamsByCompetition = useCallback((competitionId: string) => {
    // Usar competition_id (no competitionId)
    return teams.filter(team => team.competition_id === competitionId);
  }, [teams]);

  // Añadir un nuevo equipo
  const addTeam = useCallback(async (team: Omit<Team, 'id'>) => {
    try {
      const response = await apiClient.post('/team/new', team);
      console.log("Equipo añadido:", response.data);
      await fetchTeams(); // Actualizar la lista
      router.refresh();
      return response.data;
    } catch (error) {
      console.error("Error al añadir equipo:", error);
      setError('Error al añadir el equipo');
      throw error;
    }
  }, [fetchTeams, router]);

  // Actualizar un equipo existente
  const updateTeam = useCallback(async (id: string, updatedData: Partial<Team>) => {
    try {
      const response = await apiClient.post(`/team/edit/${id}`, updatedData);
      console.log("Equipo actualizado:", response.data);
      await fetchTeams(); // Actualizar la lista
      router.refresh();
      return response.data;
    } catch (error) {
      console.error("Error al actualizar equipo:", error);
      setError('Error al actualizar el equipo');
      throw error;
    }
  }, [fetchTeams, router]);

  // Eliminar un equipo
  const deleteTeam = useCallback(async (id: string) => {
    try {
      await apiClient.get(`/team/delete/${id}`);
      console.log("Equipo eliminado con ID:", id);
      await fetchTeams(); // Actualizar la lista
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
      setError('Error al eliminar el equipo');
      throw error;
    }
  }, [fetchTeams, router]);

  return {
    teams,
    loading,
    error,
    getTeamById,
    getTeamsByCompetition,
    addTeam,
    updateTeam,
    deleteTeam,
    refreshTeams: fetchTeams
  };
}