// src/services/standingsService.ts
import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';
import { StandingsFilter, StandingsResponse } from '../types/standings';

export const getStandings = async (filters: StandingsFilter): Promise<StandingsResponse> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.standings, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching standings:', error);
    throw error;
  }
};