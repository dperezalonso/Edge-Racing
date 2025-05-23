'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Team } from '../../types/models';
import apiClient from '@/services/api';
import { API_ENDPOINTS } from '@/config/api';

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cargar datos desde la API
  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener datos de la API
      const response = await apiClient.get(API_ENDPOINTS.teams);
      console.log('Equipos cargados desde API:', response.data);
      
      // Transformar datos para compatibilidad con UI
      const formattedTeams = response.data.map((team: any) => ({
        ...team,
        // Campos adicionales para compatibilidad con UI
        team: team.name, // Asegurar que team existe como alias de name
        color: team.color || getRandomColor(team.name), // Generar color si no tiene
        wins: team.wins || 0,
        podiums: team.podiums || 0,
        // Asegurar que todos los campos tengan valores predeterminados
        logo: team.logo || null,
        principal: team.principal || "Sin director",
        country: team.country || "Desconocido"
      }));
      
      setTeams(formattedTeams);
      setError(null);
    } catch (error) {
      console.error('Error al cargar equipos:', error);
      setError('Error al cargar los equipos. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos al iniciar
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // Obtener un equipo por ID
  const getTeamById = useCallback(async (id: string) => {
    // Primero, buscar en el array de teams local
    let team = teams.find(team => team.id === id);
    
    // Si no lo encuentra en local, hacer una llamada a la API
    if (!team) {
      try {
        const response = await apiClient.get(`/team/show/${id}`);
        team = response.data;
      } catch (error) {
        console.error('Error al obtener detalles del equipo:', error);
        return null;
      }
    }
    
    return team || null;
  }, [teams]);
  
  // Filtrar equipos por competición
  const getTeamsByCompetition = useCallback((competitionId: string) => {
    return teams.filter(team => team.competition_id === competitionId);
  }, [teams]);

  // Añadir un nuevo equipo
  const addTeam = useCallback(async (team: Omit<Team, 'id'>) => {
    try {
      // Preparar datos para la API
      const apiData = {
        ...team,
        points: team.points || 0,
        wins: team.wins || 0,
        podiums: team.podiums || 0
      };
      
      // Enviar a la API
      const response = await apiClient.post(API_ENDPOINTS.teamNew, apiData);
      console.log("Equipo añadido:", response.data);
      
      // Actualizar state
      await fetchTeams(); // Mejor recargar todos los datos
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
      // Enviar a la API
      const response = await apiClient.post(API_ENDPOINTS.teamEdit(id), updatedData);
      console.log("Equipo actualizado:", response.data);
      
      // Actualizar state
      await fetchTeams(); // Mejor recargar todos los datos
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
      // Enviar a la API
      await apiClient.get(API_ENDPOINTS.teamDelete(id), { params: { id } });
      console.log("Equipo eliminado con ID:", id);
      
      // Actualizar state
      await fetchTeams(); // Mejor recargar todos los datos
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
      setError('Error al eliminar el equipo');
      throw error;
    }
  }, [fetchTeams, router]);

  // Función para generar un color aleatorio basado en el nombre del equipo
  const getRandomColor = (name: string) => {
    // Generar un color basado en el nombre para mantener consistencia
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase()
      .padStart(6, '0');
    
    return "#" + c;
  };

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

export type { Team };