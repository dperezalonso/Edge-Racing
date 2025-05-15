// services/rankingService.ts
import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';

/**
 * Obtiene la clasificación de pilotos usando la ruta driver/list
 * Esta función reemplaza getGlobalDriversRanking 
 */
export const getGlobalDriversRanking = async () => {
  try {
    // Usar la ruta de lista de pilotos en lugar de la ruta global obsoleta
    const response = await apiClient.get(API_ENDPOINTS.drivers);
    
    // Devolvemos los datos directamente, procesamiento adicional se hará en el componente
    return response.data;
  } catch (error) {
    console.error('Error al obtener clasificación de pilotos:', error);
    // En caso de error devolvemos un array vacío
    return [];
  }
};

/**
 * Obtiene la clasificación de equipos usando la ruta team/list
 * Esta función reemplaza getGlobalTeamsRanking
 */
export const getGlobalTeamsRanking = async () => {
  try {
    // Usar la ruta de lista de equipos en lugar de la ruta global obsoleta
    const response = await apiClient.get(API_ENDPOINTS.teams);
    
    // Devolvemos los datos directamente, procesamiento adicional se hará en el componente
    return response.data;
  } catch (error) {
    console.error('Error al obtener clasificación de equipos:', error);
    // En caso de error devolvemos un array vacío
    return [];
  }
};

/**
 * Filtra la clasificación de pilotos por competición
 */
export const getDriversRankingByCompetition = (drivers: any[], competitionId: any) => {
  if (!drivers || !Array.isArray(drivers)) return [];
  
  // Intentamos filtrar usando competition_id, que es el campo esperado
  return drivers.filter(driver => {
    // Buscamos el campo que contenga el ID de competición
    const driverCompId = driver.competition_id || driver.competitionId || '';
    return String(driverCompId) === String(competitionId);
  });
};

/**
 * Filtra la clasificación de equipos por competición
 */
export const getTeamsRankingByCompetition = (teams: any[], competitionId: any) => {
  if (!teams || !Array.isArray(teams)) return [];
  
  // Intentamos filtrar usando competition_id, que es el campo esperado
  return teams.filter(team => {
    // Buscamos el campo que contenga el ID de competición
    const teamCompId = team.competition_id || team.competitionId || '';
    return String(teamCompId) === String(competitionId);
  });
};

// Exportación para mantener compatibilidad
export { 
  getGlobalDriversRanking as getDriverStandings,
  getGlobalTeamsRanking as getTeamStandings,
  getGlobalDriversRanking as getGlobalDriversStandings,
  getGlobalTeamsRanking as getGlobalTeamsStandings
};