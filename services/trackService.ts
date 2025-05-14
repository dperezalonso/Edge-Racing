// src/services/trackService.ts
import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';

// Interfaz para circuitos
export interface Track {
  id: number;
  name: string;
  location: string;
  country: string;
  length: number; // en metros
  turns: number;
  image_url?: string;
  description?: string;
}

// Obtener listado de circuitos
export const getTracks = async (): Promise<Track[]> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.tracks.list);
    return response.data;
  } catch (error) {
    console.error('Error al obtener circuitos:', error);
    throw error;
  }
};

// Obtener circuito por ID
export const getTrackById = async (id: string): Promise<Track> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.tracks.show(id));
    return response.data;
  } catch (error) {
    console.error(`Error al obtener circuito con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo circuito
export const createTrack = async (track: Omit<Track, 'id'>): Promise<Track> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.tracks.create, track);
    return response.data;
  } catch (error) {
    console.error('Error al crear circuito:', error);
    throw error;
  }
};

// Actualizar un circuito
export const updateTrack = async (id: string, data: Partial<Track>): Promise<Track> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.tracks.update(id), data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar circuito:', error);
    throw error;
  }
};

// Eliminar un circuito
export const deleteTrack = async (id: string): Promise<void> => {
  try {
    await apiClient.get(API_ENDPOINTS.tracks.delete(id));
  } catch (error) {
    console.error('Error al eliminar circuito:', error);
    throw error;
  }
};

// Filtrar circuitos por país
export const getTracksByCountry = (tracks: Track[], country: string): Track[] => {
  return tracks.filter(track => track.country.toLowerCase() === country.toLowerCase());
};