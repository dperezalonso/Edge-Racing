// src/services/raceService.ts
import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';

// Interfaz para carreras
export interface Race {
  id: number;
  name: string;
  date: string;
  track_id: number;
  track_name?: string;
  competition_id: number;
  competition_name?: string;
  status: 'scheduled' | 'in_progress' | 'finished' | 'cancelled';
  season: string;
}

// Obtener listado de carreras
export const getRaces = async (): Promise<Race[]> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.races.list);
    return response.data;
  } catch (error) {
    console.error('Error al obtener carreras:', error);
    throw error;
  }
};

// Obtener carrera por ID
export const getRaceById = async (id: string): Promise<Race> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.races.show(id));
    return response.data;
  } catch (error) {
    console.error(`Error al obtener carrera con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva carrera
export const createRace = async (race: Omit<Race, 'id'>): Promise<Race> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.races.create, race);
    return response.data;
  } catch (error) {
    console.error('Error al crear carrera:', error);
    throw error;
  }
};

// Actualizar una carrera
export const updateRace = async (id: string, data: Partial<Race>): Promise<Race> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.races.update(id), data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar carrera:', error);
    throw error;
  }
};

// Eliminar una carrera
export const deleteRace = async (id: string): Promise<void> => {
  try {
    await apiClient.get(API_ENDPOINTS.races.delete(id));
  } catch (error) {
    console.error('Error al eliminar carrera:', error);
    throw error;
  }
};

// Filtrar carreras por competición
export const getRacesByCompetition = (races: Race[], competitionId: number): Race[] => {
  return races.filter(race => race.competition_id === competitionId);
};

// Filtrar carreras por temporada
export const getRacesBySeason = (races: Race[], season: string): Race[] => {
  return races.filter(race => race.season === season);
};