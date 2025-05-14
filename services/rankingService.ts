// services/rankingService.ts
import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';
import { StandingsFilter, StandingsResponse } from '../types/models';

export const getGlobalDriverRankings = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.globalDriverRankings);
    return response.data;
  } catch (error) {
    console.error('Error al obtener clasificación global de pilotos:', error);
    throw error;
  }
};

// Obtener clasificación global de equipos
export const getGlobalTeamRankings = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.globalTeamRankings);
    return response.data;
  } catch (error) {
    console.error('Error al obtener clasificación global de equipos:', error);
    throw error;
  }
};


// Obtener clasificación con filtros (función versátil)
export const getStandings = async (filters: StandingsFilter): Promise<StandingsResponse> => {
  try {
    // Construir URL base según el tipo de clasificación
    const endpoint = filters.type === 'teams' 
      ? API_ENDPOINTS.globalTeamRankings 
      : API_ENDPOINTS.globalDriverRankings;
    
    // Añadir parámetros de consulta
    const response = await apiClient.get(endpoint, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error al obtener clasificación:', error);
    throw error;
  }
};

// Obtener la clasificación de una carrera específica
export const getRaceRanking = async (raceId: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.rankingShow(raceId));
    return response.data;
  } catch (error) {
    console.error(`Error al obtener clasificación de la carrera ${raceId}:`, error);
    throw error;
  }
};

// Crear un nuevo resultado de carrera
export const createRanking = async (rankingData: any) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.rankingNew, rankingData);
    return response.data;
  } catch (error) {
    console.error('Error al crear resultado de carrera:', error);
    throw error;
  }
};

// Actualizar un resultado de carrera
export const updateRanking = async (id: string, rankingData: any) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.rankingEdit(id), rankingData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar resultado de carrera ${id}:`, error);
    throw error;
  }
};

// Eliminar un resultado de carrera
export const deleteRanking = async (id: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.rankingDelete(id));
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar resultado de carrera ${id}:`, error);
    throw error;
  }
};

export { 
  getGlobalDriverRankings as getGlobalDriversRanking,
  getGlobalTeamRankings as getGlobalTeamsRanking 
};